// controllers/mediaController.js
const path = require('path');
const fs = require('fs');
const db = require('../config/db');
const multer = require('multer');

const UPLOAD_DIR = path.join(__dirname, '../../uploads/site');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const key = (req.body.key || 'image').replace(/[^a-z0-9_-]/gi, '_');
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, key + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const uploadImage = [
  upload.single('image'),
  async (req, res) => {
    try {
      const key = (req.body.key || 'image').replace(/[^a-z0-9_-]/gi, '_');
      const filename = req.file.filename;
      const url = BASE_URL + '/uploads/site/' + filename;
      const [rows] = await db.query('SELECT site_images FROM company_settings WHERE id = 1');
      let siteImages = {};
      try { siteImages = JSON.parse(rows[0]?.site_images || '{}'); } catch(e) {}
      siteImages[key] = url;
      await db.query('UPDATE company_settings SET site_images = ? WHERE id = 1', [JSON.stringify(siteImages)]);
      res.json({ success: true, data: { key, url } });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
];

const listImages = async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT site_images FROM company_settings WHERE id = 1');
    let siteImages = {};
    try { siteImages = JSON.parse(rows[0]?.site_images || '{}'); } catch(e) {}
    res.json({ success: true, data: siteImages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const key = decodeURIComponent(req.params.key);
    const [rows] = await db.query('SELECT site_images FROM company_settings WHERE id = 1');
    let siteImages = {};
    try { siteImages = JSON.parse(rows[0]?.site_images || '{}'); } catch(e) {}
    if (siteImages[key]) {
      const filename = path.basename(siteImages[key]);
      const filePath = path.join(UPLOAD_DIR, filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    delete siteImages[key];
    await db.query('UPDATE company_settings SET site_images = ? WHERE id = 1', [JSON.stringify(siteImages)]);
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { uploadImage, listImages, deleteImage };
