const db = require('../config/db');

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM menu_categories WHERE is_active=1 ORDER BY sort_order, id'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, type_id } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required' });
    const [r] = await db.query(
      'INSERT INTO menu_categories (name, type_id) VALUES (?,?)',
      [name, type_id || null]
    );
    res.status(201).json({ success: true, data: { id: r.insertId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { name, type_id, sort_order } = req.body;
    await db.query(
      'UPDATE menu_categories SET name=?, type_id=?, sort_order=? WHERE id=?',
      [name, type_id || null, sort_order || 0, req.params.id]
    );
    res.json({ success: true, message: 'Updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await db.query('UPDATE menu_categories SET is_active=0 WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const reorder = async (req, res) => {
  try {
    const { order } = req.body; // array of { id, sort_order }
    for (const item of order) {
      await db.query('UPDATE menu_categories SET sort_order=? WHERE id=?', [item.sort_order, item.id]);
    }
    res.json({ success: true, message: 'Reordered' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, update, remove, reorder };
