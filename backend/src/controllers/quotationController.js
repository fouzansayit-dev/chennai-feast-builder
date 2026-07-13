const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT q.*, c.name AS client_name,
        CONCAT(COALESCE(c.countryCode,'+91'),' ',COALESCE(c.phone,'')) AS client_phone
       FROM quotations q
       LEFT JOIN clients c ON q.client_id = c.id
       ORDER BY q.created_at DESC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT q.*, c.name AS client_name, c.email AS client_email,
        CONCAT(COALESCE(c.countryCode,'+91'),' ',COALESCE(c.phone,'')) AS client_phone,
        c.address AS client_address, c.city AS client_city, c.gstin AS client_gstin
       FROM quotations q
       LEFT JOIN clients c ON q.client_id = c.id
       WHERE q.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Quotation not found' });
    const [items] = await db.query('SELECT * FROM quotation_items WHERE quotation_id = ?', [req.params.id]);
    const doc = rows[0];
    if (doc.share_token) doc.share_url = `${FRONTEND_URL}/share/quotation/${doc.share_token}`;
    res.json({ success: true, data: { ...doc, items } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const { client_id, event_date, event_type, venue, no_of_guests,
      subtotal, tax_amount, discount_amount, total_amount,
      status, valid_until, notes, terms, items = [] } = req.body;
    const [settings] = await conn.query('SELECT quotation_prefix FROM company_settings WHERE id = 1');
    const prefix = settings[0]?.quotation_prefix || 'QUO';
    const [countRow] = await conn.query('SELECT COUNT(*) AS cnt FROM quotations');
    const quotationNumber = `${prefix}-${String(countRow[0].cnt + 1).padStart(5, '0')}`;
    const shareToken = uuidv4().replace(/-/g, '');
    const [result] = await conn.query(
      `INSERT INTO quotations (quotation_number, share_token, client_id, event_date, event_type, venue,
        no_of_guests, subtotal, tax_amount, discount_amount, total_amount, status, valid_until, notes, terms)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [quotationNumber, shareToken, client_id || null, event_date || null, event_type || null,
       venue || null, no_of_guests || null, subtotal || 0, tax_amount || 0,
       discount_amount || 0, total_amount || 0, status || 'draft', valid_until || null, notes || null, terms || null]
    );
    const quotationId = result.insertId;
    for (const item of items) {
      await conn.query(
        'INSERT INTO quotation_items (quotation_id, menu_item_id, item_name, description, quantity, unit, unit_price, total_price) VALUES (?,?,?,?,?,?,?,?)',
        [quotationId, item.menu_item_id || null, item.item_name, item.description || null,
         item.quantity || 1, item.unit || null, item.unit_price || 0, item.total_price || 0]
      );
    }
    await conn.commit();
    res.status(201).json({
      success: true, message: 'Quotation created',
      data: { id: quotationId, quotation_number: quotationNumber, share_token: shareToken,
        share_url: `${FRONTEND_URL}/share/quotation/${shareToken}` }
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
    const { client_id, event_date, event_type, venue, no_of_guests,
      subtotal, tax_amount, discount_amount, total_amount,
      status, valid_until, notes, terms, items = [] } = req.body;
    await conn.query(
      `UPDATE quotations SET client_id=?, event_date=?, event_type=?, venue=?, no_of_guests=?,
        subtotal=?, tax_amount=?, discount_amount=?, total_amount=?, status=?, valid_until=?, notes=?, terms=?
       WHERE id = ?`,
      [client_id || null, event_date || null, event_type || null, venue || null,
       no_of_guests || null, subtotal || 0, tax_amount || 0, discount_amount || 0,
       total_amount || 0, status || 'draft', valid_until || null, notes || null, terms || null, req.params.id]
    );
    await conn.query('DELETE FROM quotation_items WHERE quotation_id = ?', [req.params.id]);
    for (const item of items) {
      await conn.query(
        'INSERT INTO quotation_items (quotation_id, menu_item_id, item_name, description, quantity, unit, unit_price, total_price) VALUES (?,?,?,?,?,?,?,?)',
        [req.params.id, item.menu_item_id || null, item.item_name, item.description || null,
         item.quantity || 1, item.unit || null, item.unit_price || 0, item.total_price || 0]
      );
    }
    await conn.commit();
    res.json({ success: true, message: 'Quotation updated' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false, message: err.message });
  } finally { conn.release(); }
};

const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM quotations WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Quotation deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const generateLink = async (req, res) => {
  try {
    const newToken = uuidv4().replace(/-/g, '');
    await db.query('UPDATE quotations SET share_token = ? WHERE id = ?', [newToken, req.params.id]);
    res.json({ success: true, data: { share_token: newToken, share_url: `${FRONTEND_URL}/share/quotation/${newToken}` } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove, generateLink };
