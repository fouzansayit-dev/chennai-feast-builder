const db = require('../config/db');

// GET /api/event-stall-items
const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT e.*, ec.name AS category_name, ec.type AS category_type
       FROM event_stall_items e
       LEFT JOIN event_categories ec ON e.category_id = ec.id
       WHERE e.is_active=1 ORDER BY ec.type, e.id`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/event-stall-items
const create = async (req, res) => {
  try {
    const { name, category_id, price } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required' });
    const [r] = await db.query(
      'INSERT INTO event_stall_items (name, category_id, price) VALUES (?,?,?)',
      [name, category_id || null, price || 0]
    );
    res.status(201).json({ success: true, data: { id: r.insertId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/event-stall-items/:id
const update = async (req, res) => {
  try {
    const { name, category_id, price } = req.body;
    await db.query(
      'UPDATE event_stall_items SET name=?, category_id=?, price=? WHERE id=?',
      [name, category_id || null, price || 0, req.params.id]
    );
    res.json({ success: true, message: 'Updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/event-stall-items/:id
const remove = async (req, res) => {
  try {
    await db.query('UPDATE event_stall_items SET is_active=0 WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAll, create, update, remove };
