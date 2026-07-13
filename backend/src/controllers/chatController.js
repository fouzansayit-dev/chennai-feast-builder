const db = require('../config/db');

// POST /api/chat/log
const logMessage = async (req, res) => {
  try {
    const { session_id, sender, message } = req.body;
    if (!session_id || !sender || !message) {
      return res.status(400).json({ success: false, message: 'Missing required parameters: session_id, sender, message' });
    }

    await db.query(
      'INSERT INTO chat_logs (session_id, sender, message) VALUES (?, ?, ?)',
      [session_id, sender, message]
    );

    res.status(201).json({ success: true, message: 'Message logged successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/chat/sessions
const getSessions = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT session_id, 
             COUNT(*) AS message_count, 
             MIN(timestamp) AS started_at, 
             MAX(timestamp) AS last_active_at,
             COALESCE((
               SELECT message 
               FROM chat_logs 
               WHERE session_id = cl.session_id AND sender = 'user' 
               ORDER BY timestamp ASC LIMIT 1
             ), 'Catering Enquiry Chat') AS title
      FROM chat_logs cl
      GROUP BY session_id
      ORDER BY last_active_at DESC
    `);
    
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/chat/sessions/:session_id
const getSessionMessages = async (req, res) => {
  try {
    const { session_id } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM chat_logs WHERE session_id = ? ORDER BY timestamp ASC',
      [session_id]
    );
    
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  logMessage,
  getSessions,
  getSessionMessages
};
