const db = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM menu_types WHERE is_active=1 ORDER BY id');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required' });
    const [r] = await db.query('INSERT INTO menu_types (name) VALUES (?)', [name]);
    res.status(201).json({ success: true, data: { id: r.insertId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    await db.query('UPDATE menu_types SET name=? WHERE id=?', [name, req.params.id]);
    res.json({ success: true, message: 'Updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await db.query('UPDATE menu_types SET is_active=0 WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, update, remove };
