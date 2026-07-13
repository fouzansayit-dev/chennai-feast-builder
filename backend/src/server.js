require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// ── CORS ──────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
  ],
  credentials: true,
}));

// ── Body Parsers ──────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Static file serving ───────────────────────────────────
// Admin company logos → /uploads/logos/<filename>
app.use('/uploads/logos', express.static(path.join(__dirname, '../uploads/logos')));

// Client override logos → /uploads/client-logos/<filename>
app.use('/uploads/client-logos', express.static(path.join(__dirname, '../uploads/client-logos')));

// Site media images (hero, banners, gallery, cards) → /uploads/site/<filename>
app.use('/uploads/site', express.static(path.join(__dirname, '../uploads/site')));


// ── Health Check ──────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── API Routes ────────────────────────────────────────────
app.use('/api', require('./routes/index'));

// ── 404 handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 My Chennai Catering API running on http://localhost:${PORT}`);
  console.log(`📁 Uploads served at http://localhost:${PORT}/uploads/`);
});
