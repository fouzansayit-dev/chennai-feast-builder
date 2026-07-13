const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// ── Admin logo (Company Settings) ──────────────────────────
const adminLogoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads/logos');
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `company-logo-${uuidv4()}${ext}`);
  },
});

// ── Client logo override (Share link) ──────────────────────
const clientLogoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads/client-logos');
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `client-logo-${uuidv4()}${ext}`);
  },
});

const imageFilter = (req, file, cb) => {
  const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, jpeg, png, gif, webp, svg)'));
  }
};

const maxSize = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB

const uploadAdminLogo = multer({
  storage: adminLogoStorage,
  fileFilter: imageFilter,
  limits: { fileSize: maxSize },
}).single('logo');

const uploadClientLogo = multer({
  storage: clientLogoStorage,
  fileFilter: imageFilter,
  limits: { fileSize: maxSize },
}).single('logo');

// Wrapper to handle multer errors gracefully
const handleUpload = (uploadFn) => (req, res, next) => {
  uploadFn(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = {
  uploadAdminLogo: handleUpload(uploadAdminLogo),
  uploadClientLogo: handleUpload(uploadClientLogo),
};
