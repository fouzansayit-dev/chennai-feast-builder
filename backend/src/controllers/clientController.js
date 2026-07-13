const db = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients WHERE is_active = 1 ORDER BY name ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Client not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, email, phone, countryCode, alt_phone, address, city, state, pincode, gstin, notes } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
    if (phone && phone.replace(/\D/g, '').length !== 10)
      return res.status(400).json({ success: false, message: 'Phone must be 10 digits' });
    const [countRow] = await db.query('SELECT COUNT(*) AS cnt FROM clients');
    const code = `CLI${String(countRow[0].cnt + 1).padStart(4, '0')}`;
    const [result] = await db.query(
      'INSERT INTO clients (client_code, name, email, phone, countryCode, alt_phone, address, city, state, pincode, gstin, notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      [code, name, email || null, phone || null, countryCode || '+91', alt_phone || null, address || null, city || null, state || null, pincode || null, gstin || null, notes || null]
    );
    res.status(201).json({ success: true, message: 'Client created', data: { id: result.insertId, client_code: code } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, phone, countryCode, alt_phone, address, city, state, pincode, gstin, notes } = req.body;
    if (phone && phone.replace(/\D/g, '').length !== 10)
      return res.status(400).json({ success: false, message: 'Phone must be 10 digits' });
    await db.query(
      'UPDATE clients SET name=?,email=?,phone=?,countryCode=?,alt_phone=?,address=?,city=?,state=?,pincode=?,gstin=?,notes=? WHERE id=?',
      [name, email || null, phone || null, countryCode || '+91', alt_phone || null, address || null, city || null, state || null, pincode || null, gstin || null, notes || null, req.params.id]
    );
    res.json({ success: true, message: 'Client updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await db.query('UPDATE clients SET is_active=0 WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
