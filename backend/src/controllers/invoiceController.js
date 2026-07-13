const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT i.*, c.name AS client_name,
        CONCAT(COALESCE(c.countryCode,'+91'),' ',COALESCE(c.phone,'')) AS client_phone
       FROM invoices i
       LEFT JOIN clients c ON i.client_id = c.id
       ORDER BY i.created_at DESC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT i.*, c.name AS client_name, c.email AS client_email,
        CONCAT(COALESCE(c.countryCode,'+91'),' ',COALESCE(c.phone,'')) AS client_phone,
        c.address AS client_address, c.city AS client_city, c.gstin AS client_gstin
       FROM invoices i
       LEFT JOIN clients c ON i.client_id = c.id
       WHERE i.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Invoice not found' });
    const [items] = await db.query('SELECT * FROM invoice_items WHERE invoice_id = ?', [req.params.id]);
    const [payments] = await db.query('SELECT * FROM payments WHERE invoice_id = ? ORDER BY payment_date DESC', [req.params.id]);
    const doc = rows[0];
    if (doc.share_token) doc.share_url = `${FRONTEND_URL}/share/invoice/${doc.share_token}`;
    res.json({ success: true, data: { ...doc, items, payments } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { client_id, order_id, quotation_id, invoice_date, due_date,
      event_date, event_type, venue, no_of_guests,
      subtotal, tax_percentage, tax_amount, discount_amount, total_amount,
      advance_paid, balance_due, payment_status, payment_method,
      status, notes, terms, items = [] } = req.body;
    const [settings] = await conn.query('SELECT invoice_prefix FROM company_settings WHERE id = 1');
    const prefix = settings[0]?.invoice_prefix || 'INV';
    const [countRow] = await conn.query('SELECT COUNT(*) AS cnt FROM invoices');
    const invoiceNumber = `${prefix}-${String(countRow[0].cnt + 1).padStart(5, '0')}`;
    const shareToken = uuidv4().replace(/-/g, '');
    const [result] = await conn.query(
      `INSERT INTO invoices (invoice_number, share_token, client_id, order_id, quotation_id,
        invoice_date, due_date, event_date, event_type, venue, no_of_guests,
        subtotal, tax_percentage, tax_amount, discount_amount, total_amount,
        advance_paid, balance_due, payment_status, payment_method, status, notes, terms)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [invoiceNumber, shareToken, client_id || null, order_id || null, quotation_id || null,
       invoice_date || new Date().toISOString().split('T')[0], due_date || null,
       event_date || null, event_type || null, venue || null, no_of_guests || null,
       subtotal || 0, tax_percentage || 0, tax_amount || 0, discount_amount || 0,
       total_amount || 0, advance_paid || 0, balance_due || 0,
       payment_status || 'unpaid', payment_method || null, status || 'draft', notes || null, terms || null]
    );
    const invoiceId = result.insertId;
    for (const item of items) {
      await conn.query(
        'INSERT INTO invoice_items (invoice_id, menu_item_id, item_name, description, quantity, unit, unit_price, total_price) VALUES (?,?,?,?,?,?,?,?)',
        [invoiceId, item.menu_item_id || null, item.item_name || '', item.description || null,
         item.quantity || 1, item.unit || null, item.unit_price || 0, item.total_price || 0]
      );
    }
    await conn.commit();
    res.status(201).json({
      success: true, message: 'Invoice created',
      data: { id: invoiceId, invoice_number: invoiceNumber, share_token: shareToken,
        share_url: `${FRONTEND_URL}/share/invoice/${shareToken}` }
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
    const { client_id, invoice_date, due_date, event_date, event_type, venue, no_of_guests,
      subtotal, tax_percentage, tax_amount, discount_amount, total_amount,
      advance_paid, balance_due, payment_status, payment_method,
      status, notes, terms, items = [] } = req.body;
    await conn.query(
      `UPDATE invoices SET client_id=?, invoice_date=?, due_date=?, event_date=?,
        event_type=?, venue=?, no_of_guests=?, subtotal=?, tax_percentage=?,
        tax_amount=?, discount_amount=?, total_amount=?, advance_paid=?,
        balance_due=?, payment_status=?, payment_method=?, status=?, notes=?, terms=?
       WHERE id = ?`,
      [client_id || null, invoice_date, due_date || null, event_date || null,
       event_type || null, venue || null, no_of_guests || null,
       subtotal || 0, tax_percentage || 0, tax_amount || 0, discount_amount || 0,
       total_amount || 0, advance_paid || 0, balance_due || 0,
       payment_status || 'unpaid', payment_method || null, status || 'draft', notes || null, terms || null,
       req.params.id]
    );
    await conn.query('DELETE FROM invoice_items WHERE invoice_id = ?', [req.params.id]);
    for (const item of items) {
      await conn.query(
        'INSERT INTO invoice_items (invoice_id, menu_item_id, item_name, description, quantity, unit, unit_price, total_price) VALUES (?,?,?,?,?,?,?,?)',
        [req.params.id, item.menu_item_id || null, item.item_name || '', item.description || null,
         item.quantity || 1, item.unit || null, item.unit_price || 0, item.total_price || 0]
      );
    }
    await conn.commit();
    res.json({ success: true, message: 'Invoice updated' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally { conn.release(); }
};

// POST /api/invoices/:id/payment - Record a payment
const addPayment = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { amount, payment_method, payment_date, notes } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ success: false, message: 'Valid amount required' });
    await conn.query(
      'INSERT INTO payments (invoice_id, amount, payment_date, payment_method, notes) VALUES (?,?,?,?,?)',
      [req.params.id, amount, payment_date || new Date().toISOString().split('T')[0], payment_method || null, notes || null]
    );
    // Recalculate advance_paid and balance_due
    const [payments] = await conn.query('SELECT SUM(amount) AS total_paid FROM payments WHERE invoice_id = ?', [req.params.id]);
    const [invoice] = await conn.query('SELECT total_amount FROM invoices WHERE id = ?', [req.params.id]);
    const totalPaid = Number(payments[0].total_paid || 0);
    const totalAmount = Number(invoice[0]?.total_amount || 0);
    const balanceDue = Math.max(0, totalAmount - totalPaid);
    const paymentStatus = totalPaid >= totalAmount ? 'paid' : totalPaid > 0 ? 'partial' : 'unpaid';
    await conn.query(
      'UPDATE invoices SET advance_paid=?, balance_due=?, payment_status=? WHERE id=?',
      [totalPaid, balanceDue, paymentStatus, req.params.id]
    );
    await conn.commit();
    res.json({ success: true, message: 'Payment recorded', data: { total_paid: totalPaid, balance_due: balanceDue, payment_status: paymentStatus } });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally { conn.release(); }
};

const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM invoices WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const generateLink = async (req, res) => {
  try {
    const newToken = uuidv4().replace(/-/g, '');
    await db.query('UPDATE invoices SET share_token = ? WHERE id = ?', [newToken, req.params.id]);
    res.json({ success: true, data: { share_token: newToken, share_url: `${FRONTEND_URL}/share/invoice/${newToken}` } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove, generateLink, addPayment };
