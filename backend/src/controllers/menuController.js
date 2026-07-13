const db = require('../config/db');

const getAll = async (req, res) => {
  try {
    const { category } = req.query;
    let sql = 'SELECT * FROM menu_items WHERE is_active = 1';
    const params = [];
    if (category) { sql += ' AND category = ?'; params.push(category); }
    sql += ' ORDER BY category, name';
    const [rows] = await db.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM menu_items WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Menu item not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, category, description, unit, price, is_veg } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name is required' });
    const [result] = await db.query(
      'INSERT INTO menu_items (name, category, description, unit, price, is_veg) VALUES (?,?,?,?,?,?)',
      [name, category, description, unit || 'per plate', price || 0, is_veg ?? 1]
    );
    res.status(201).json({ success: true, data: { id: result.insertId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, category, description, unit, price, is_veg } = req.body;
    await db.query(
      'UPDATE menu_items SET name=?, category=?, description=?, unit=?, price=?, is_veg=? WHERE id=?',
      [name, category, description, unit, price, is_veg, req.params.id]
    );
    res.json({ success: true, message: 'Updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await db.query('UPDATE menu_items SET is_active=0 WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
