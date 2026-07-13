const db = require('../config/db');
const path = require('path');
const fs = require('fs');

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:5000';

// GET /api/company-settings
const getSettings = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM company_settings WHERE id = 1');
    if (!rows.length) return res.status(404).json({ success: false, message: 'Settings not found' });

    const settings = rows[0];

    // ✅ FIX: Always rebuild logo_url dynamically from logo_filename
    // Never rely on the stored logo_url column — it has localhost:5000 hardcoded
    // which breaks if PUBLIC_URL changes or on a different machine.
    if (settings.logo_filename) {
      settings.logo_url = `${PUBLIC_URL}/uploads/logos/${settings.logo_filename}`;
    } else {
      settings.logo_url = null;
    }

    // Parse payment_methods JSON if stored as string
    if (settings.payment_methods && typeof settings.payment_methods === 'string') {
      try { settings.payment_methods = JSON.parse(settings.payment_methods) } catch { settings.payment_methods = [] }
    }

    res.json({ success: true, data: settings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/company-settings
const updateSettings = async (req, res) => {
  try {
    console.log('PUT company-settings received:', JSON.stringify(req.body, null, 2))
    const {
      company_name, tagline, email, phone, address, city, state, pincode,
      gstin, fssai_no, bank_name, bank_account, bank_ifsc, bank_branch,
      terms_and_conditions, invoice_prefix, quotation_prefix,
      tax_percentage, currency,
      website, additional_phone,
      social_facebook, social_instagram, social_youtube,
      invoice_footer, quotation_footer,
      payment_methods, theme,
      include_category_in_pdf, remove_numbering_in_pdf,
      about_description, hero_text, hero_sub_text,
    } = req.body;

    await db.query(
      `UPDATE company_settings SET
        company_name=?, tagline=?, email=?, phone=?, address=?, city=?, state=?,
        pincode=?, gstin=?, fssai_no=?, bank_name=?, bank_account=?, bank_ifsc=?,
        bank_branch=?, terms_and_conditions=?, invoice_prefix=?, quotation_prefix=?,
        tax_percentage=?, currency=?,
        website=?, additional_phone=?,
        social_facebook=?, social_instagram=?, social_youtube=?,
        invoice_footer=?, quotation_footer=?,
        payment_methods=?, theme=?,
        include_category_in_pdf=?, remove_numbering_in_pdf=?,
        about_description=?, hero_text=?, hero_sub_text=?
      WHERE id = 1`,
      [
        company_name || null, tagline || null, email || null, phone || null,
        address || null, city || null, state || null,
        pincode || null, gstin || null, fssai_no || null,
        bank_name || null, bank_account || null, bank_ifsc || null,
        bank_branch || null, terms_and_conditions || null,
        invoice_prefix || 'INV', quotation_prefix || 'QUO',
        tax_percentage || null, currency || null,
        website || null, additional_phone || null,
        social_facebook || null, social_instagram || null, social_youtube || null,
        invoice_footer || null, quotation_footer || null,
        payment_methods ? JSON.stringify(payment_methods) : null,
        theme || 'theme1',
        include_category_in_pdf ? 1 : 0,
        remove_numbering_in_pdf ? 1 : 0,
        about_description || null, hero_text || null, hero_sub_text || null,
      ]
    );

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/company-settings/logo
const uploadLogo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    // Delete old logo file from disk if it exists
    const [rows] = await db.query('SELECT logo_filename FROM company_settings WHERE id = 1');
    if (rows[0]?.logo_filename) {
      const oldPath = path.join(__dirname, '../../uploads/logos', rows[0].logo_filename);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const filename = req.file.filename;

    // ✅ FIX: Only store logo_filename — NOT the full URL.
    // logo_url is rebuilt dynamically in getSettings using PUBLIC_URL env var.
    // This way, changing PUBLIC_URL (e.g. for production) works without re-uploading.
    await db.query('UPDATE company_settings SET logo_filename=? WHERE id = 1', [filename]);

    // Still return the full URL to the frontend for immediate display
    const logoUrl = `${PUBLIC_URL}/uploads/logos/${filename}`;
    res.json({ success: true, message: 'Logo uploaded', data: { logo_url: logoUrl, logo_filename: filename } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/company-settings/logo
const deleteLogo = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT logo_filename FROM company_settings WHERE id = 1');
    if (rows[0]?.logo_filename) {
      const filePath = path.join(__dirname, '../../uploads/logos', rows[0].logo_filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await db.query('UPDATE company_settings SET logo_filename=NULL, logo_url=NULL WHERE id = 1');
    res.json({ success: true, message: 'Logo removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getSettings, updateSettings, uploadLogo, deleteLogo };
