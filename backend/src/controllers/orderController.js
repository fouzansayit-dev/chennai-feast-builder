const db = require('../config/db');


async function generateOrderNumber(conn, prefix) {
  const pattern = `${prefix}-%`;
  const [rows] = await conn.query(
    `SELECT order_number FROM orders WHERE order_number LIKE ? ORDER BY id DESC LIMIT 1 FOR UPDATE`,
    [pattern]
  );
  if (rows.length === 0) return `${prefix}-00001`;
  const last = rows[0].order_number; // e.g. "ENQ-00004"
  const num = parseInt(last.split('-')[1], 10) || 0;
  return `${prefix}-${String(num + 1).padStart(5, '0')}`;
}

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT o.*, c.name AS client_name,
        CONCAT(COALESCE(c.countryCode,'+91'),' ',COALESCE(c.phone,'')) AS client_phone
       FROM orders o
       LEFT JOIN clients c ON o.client_id = c.id
       ORDER BY o.created_at DESC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT o.*, c.name AS client_name,
        CONCAT(COALESCE(c.countryCode,'+91'),' ',COALESCE(c.phone,'')) AS client_phone
       FROM orders o
       LEFT JOIN clients c ON o.client_id = c.id
       WHERE o.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Order not found' });
    const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);
    res.json({ success: true, data: { ...rows[0], items } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { client_id, event_date, event_time, event_type, venue, no_of_guests,
      status, total_amount, advance_paid, balance_amount, notes, items = [] } = req.body;

    // FIX: use safe number generator instead of COUNT(*) + 1
    const orderNumber = await generateOrderNumber(conn, 'ORD');

    const [result] = await conn.query(
      `INSERT INTO orders (order_number, client_id, event_date, event_time, event_type, venue,
        no_of_guests, status, total_amount, advance_paid, balance_amount, notes)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [orderNumber, client_id || null, event_date || null, event_time || null, event_type || null,
       venue || null, no_of_guests || null, status || 'pending',
       total_amount || 0, advance_paid || 0, balance_amount || 0, notes || null]
    );
    const orderId = result.insertId;
    for (const item of items) {
      await conn.query(
        'INSERT INTO order_items (order_id, menu_item_id, item_name, quantity, unit_price, total_price) VALUES (?,?,?,?,?,?)',
        [orderId, item.menu_item_id || null, item.item_name, item.quantity, item.unit_price, item.total_price]
      );
    }
    await conn.commit();
    res.status(201).json({ success: true, message: 'Order created', data: { id: orderId, order_number: orderNumber } });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally { conn.release(); }
};

const createPublic = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const {
      name, phone, email, city,
      event_type, event_date, venue, guests,
      package: pkg, special_requests,
      items = [], total_amount,        // ← now accepted from frontend
    } = req.body;

    if (!name || !phone || !event_date)
      return res.status(400).json({ success: false, message: 'Name, phone and event date are required' });

    // ── Upsert client ────────────────────────────────────────────────────────
    let clientId = null;
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const [existing] = await conn.query('SELECT id FROM clients WHERE phone = ?', [cleanPhone]);
    if (existing.length) {
      clientId = existing[0].id;
      // Update name/email if they came in
      await conn.query(
        'UPDATE clients SET name=?, email=COALESCE(?,email) WHERE id=?',
        [name, email || null, clientId]
      );
    } else {
      const [clientResult] = await conn.query(
        'INSERT INTO clients (name, phone, email, city) VALUES (?,?,?,?)',
        [name, cleanPhone, email || null, city || null]
      );
      clientId = clientResult.insertId;
    }

    // FIX: use safe number generator instead of COUNT(*) + 1
    const orderNumber = await generateOrderNumber(conn, 'ENQ');

    // Build notes
    const notes = [
      pkg              ? `Package: ${pkg}`                       : '',
      city             ? `City: ${city}`                         : '',
      special_requests ? `Special Requests: ${special_requests}` : '',
      'Source: Website Enquiry',
    ].filter(Boolean).join('\n');

    // Compute total from items if not passed explicitly
    const computedTotal = total_amount
      || items.reduce((sum, i) => sum + (Number(i.total_price) || 0), 0)
      || 0;

    const [orderResult] = await conn.query(
      `INSERT INTO orders (order_number, client_id, event_date, event_type, venue,
        no_of_guests, status, total_amount, notes)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [orderNumber, clientId, event_date, event_type || null, venue || null,
       guests || null, 'pending', computedTotal, notes]
    );
    const orderId = orderResult.insertId;

    // FIX: save menu items so they appear in order detail & dashboard
    for (const item of items) {
      await conn.query(
        `INSERT INTO order_items
           (order_id, menu_item_id, item_name, quantity, unit_price, total_price)
         VALUES (?,?,?,?,?,?)`,
        [
          orderId,
          item.menu_item_id || null,
          item.item_name,
          item.quantity,
          item.unit_price || 0,
          item.total_price || 0,
        ]
      );
    }

    await conn.commit();
    res.status(201).json({
      success: true,
      message: 'Enquiry submitted',
      data: { order_number: orderNumber },
    });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally { conn.release(); }
};

const update = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { client_id, event_date, event_time, event_type, venue, no_of_guests,
      status, total_amount, advance_paid, balance_amount, notes, items = [] } = req.body;
    await conn.query(
      `UPDATE orders SET client_id=?, event_date=?, event_time=?, event_type=?, venue=?, no_of_guests=?,
        status=?, total_amount=?, advance_paid=?, balance_amount=?, notes=? WHERE id=?`,
      [client_id || null, event_date || null, event_time || null, event_type || null,
       venue || null, no_of_guests || null, status,
       total_amount || 0, advance_paid || 0, balance_amount || 0, notes || null, req.params.id]
    );
    await conn.query('DELETE FROM order_items WHERE order_id = ?', [req.params.id]);
    for (const item of items) {
      await conn.query(
        'INSERT INTO order_items (order_id, menu_item_id, item_name, quantity, unit_price, total_price) VALUES (?,?,?,?,?,?)',
        [req.params.id, item.menu_item_id || null, item.item_name, item.quantity, item.unit_price, item.total_price]
      );
    }
    await conn.commit();
    res.json({ success: true, message: 'Order updated' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally { conn.release(); }
};

const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getById, create, createPublic, update, remove };
