const db = require('../config/db');
const path = require('path');
const fs = require('fs');

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:5000';

/**
 * GET /api/share/:type/:token
 * Public endpoint — no auth required
 * Returns full document data + the correct logo to show
 *
 * Logo priority:
 *   1. If client has uploaded a logo for this specific share token → use client logo
 *   2. Otherwise → use admin company logo
 */
const getSharedDocument = async (req, res) => {
  try {
    const { type, token } = req.params;

    if (!['invoice', 'quotation'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid document type' });
    }

    const table = type === 'invoice' ? 'invoices' : 'quotations';

    // Fetch the document
    const [docs] = await db.query(
      `SELECT d.*, c.name AS client_name, c.email AS client_email,
              c.phone AS client_phone, c.address AS client_address,
              c.city AS client_city, c.gstin AS client_gstin
       FROM ${table} d
       LEFT JOIN clients c ON d.client_id = c.id
       WHERE d.share_token = ?`,
      [token]
    );

    if (!docs.length) {
      return res.status(404).json({ success: false, message: 'Document not found or link expired' });
    }

    const doc = docs[0];

    // Fetch line items
    const itemsTable = type === 'invoice' ? 'invoice_items' : 'quotation_items';
    const [items] = await db.query(
      `SELECT * FROM ${itemsTable} WHERE ${type}_id = ?`,
      [doc.id]
    );

    // Fetch company settings (admin logo)
    const [settings] = await db.query(
      'SELECT company_name, tagline, email, phone, address, city, state, pincode, gstin, fssai_no, bank_name, bank_account, bank_ifsc, bank_branch, logo_filename, terms_and_conditions, currency FROM company_settings WHERE id = 1'
    );
    const company = settings[0] || {};
    if (company.logo_filename) {
      company.logo_url = `${PUBLIC_URL}/uploads/logos/${company.logo_filename}`;
    }

    // ── LOGO RESOLUTION ──────────────────────────────────────
    // Check if client has overridden logo for this share token
    const [overrides] = await db.query(
      'SELECT * FROM client_logo_overrides WHERE share_token = ?',
      [token]
    );

    let activeLogoUrl = company.logo_url || null;
    let logoSource = 'company'; // 'company' | 'client'

    if (overrides.length && overrides[0].client_logo_url) {
      activeLogoUrl = overrides[0].client_logo_url;
      logoSource = 'client';
    }

    res.json({
      success: true,
      data: {
        document: { ...doc, items },
        company,
        logo: {
          url: activeLogoUrl,
          source: logoSource,       // lets frontend know which logo is active
          canOverride: true,        // client is allowed to swap logo
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * POST /api/share/:type/:token/logo
 * Public endpoint — no auth required
 * Client uploads their own logo for this share link.
 * This does NOT touch the admin company logo.
 * If the client uploads again, the old client logo is replaced.
 */
const uploadClientLogo = async (req, res) => {
  try {
    const { type, token } = req.params;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Verify the token is valid
    const table = type === 'invoice' ? 'invoices' : 'quotations';
    const [docs] = await db.query(
      `SELECT id FROM ${table} WHERE share_token = ?`,
      [token]
    );

    if (!docs.length) {
      // Remove the uploaded file since token is invalid
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ success: false, message: 'Invalid share token' });
    }

    const docId = docs[0].id;

    // Delete old client logo file if exists
    const [existing] = await db.query(
      'SELECT client_logo_filename FROM client_logo_overrides WHERE share_token = ?',
      [token]
    );

    if (existing.length && existing[0].client_logo_filename) {
      const oldPath = path.join(
        __dirname, '../../uploads/client-logos',
        existing[0].client_logo_filename
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const filename = req.file.filename;
    const clientLogoUrl = `${PUBLIC_URL}/uploads/client-logos/${filename}`;

    // Upsert — if override exists update it, else insert
    if (existing.length) {
      await db.query(
        'UPDATE client_logo_overrides SET client_logo_url=?, client_logo_filename=?, uploaded_at=NOW() WHERE share_token=?',
        [clientLogoUrl, filename, token]
      );
    } else {
      await db.query(
        'INSERT INTO client_logo_overrides (share_token, document_type, document_id, client_logo_url, client_logo_filename) VALUES (?, ?, ?, ?, ?)',
        [token, type, docId, clientLogoUrl, filename]
      );
    }

    res.json({
      success: true,
      message: 'Your logo has been saved',
      data: { logo_url: clientLogoUrl, source: 'client' },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * DELETE /api/share/:type/:token/logo
 * Client removes their override → falls back to company logo
 */
const removeClientLogo = async (req, res) => {
  try {
    const { token } = req.params;

    const [existing] = await db.query(
      'SELECT client_logo_filename FROM client_logo_overrides WHERE share_token = ?',
      [token]
    );

    if (existing.length && existing[0].client_logo_filename) {
      const filePath = path.join(
        __dirname, '../../uploads/client-logos',
        existing[0].client_logo_filename
      );
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await db.query('DELETE FROM client_logo_overrides WHERE share_token = ?', [token]);

    res.json({ success: true, message: 'Custom logo removed. Company logo restored.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getSharedDocument, uploadClientLogo, removeClientLogo };
