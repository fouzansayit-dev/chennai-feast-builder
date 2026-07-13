const db = require('../config/db');

const VALID_TYPES = ['Events', 'Stalls', 'Others'];

// GET /api/event-categories
const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM event_categories WHERE is_active=1 ORDER BY type, sort_order, id'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/event-categories
const create = async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required' });
    const catType = VALID_TYPES.includes(type) ? type : 'Events';
    const [r] = await db.query(
      'INSERT INTO event_categories (name, type) VALUES (?, ?)',
      [name, catType]
    );
    res.status(201).json({ success: true, data: { id: r.insertId, name, type: catType } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/event-categories/:id
const update = async (req, res) => {
  try {
    const { name, type } = req.body;
    const catType = VALID_TYPES.includes(type) ? type : 'Events';
    await db.query(
      'UPDATE event_categories SET name=?, type=? WHERE id=?',
      [name, catType, req.params.id]
    );
    res.json({ success: true, message: 'Updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/event-categories/:id
const remove = async (req, res) => {
  try {
    await db.query('UPDATE event_categories SET is_active=0 WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, update, remove };
