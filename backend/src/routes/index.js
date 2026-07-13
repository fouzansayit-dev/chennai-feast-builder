const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadAdminLogo, uploadClientLogo } = require('../middleware/upload');

const authCtrl           = require('../controllers/authController');
const companyCtrl        = require('../controllers/companyController');
const clientCtrl         = require('../controllers/clientController');
const menuCtrl           = require('../controllers/menuController');
const menuPackageCtrl    = require('../controllers/menuPackageController');
const menuTypeCtrl       = require('../controllers/menuTypeController');
const menuCategoryCtrl   = require('../controllers/menuCategoryController');
const eventCategoryCtrl  = require('../controllers/eventCategoryController');
const eventStallItemCtrl = require('../controllers/eventStallItemController');
const orderCtrl          = require('../controllers/orderController');
const invoiceCtrl        = require('../controllers/invoiceController');
const quotationCtrl      = require('../controllers/quotationController');
const dashboardCtrl      = require('../controllers/dashboardController');
const shareCtrl          = require('../controllers/shareController');
const mediaCtrl          = require('../controllers/mediaController');
const chatCtrl           = require('../controllers/chatController');

// ── Auth ──────────────────────────────────────────────────────────────────────
router.post('/auth/login', authCtrl.login);
router.post('/auth/change-password', auth, authCtrl.changePassword);

// ── Dashboard ─────────────────────────────────────────────────────────────────
router.get('/dashboard', auth, dashboardCtrl.getStats);

// ── Company Settings ──────────────────────────────────────────────────────────
// ✅ FIX: GET is now PUBLIC — needed by MenuBrowse & Landing to show logo
router.get('/company-settings', companyCtrl.getSettings);
router.put('/company-settings', auth, companyCtrl.updateSettings);
router.post('/company-settings/logo', auth, uploadAdminLogo, companyCtrl.uploadLogo);
router.delete('/company-settings/logo', auth, companyCtrl.deleteLogo);

// ── Clients ───────────────────────────────────────────────────────────────────
router.get('/clients', auth, clientCtrl.getAll);
router.get('/clients/:id', auth, clientCtrl.getById);
router.post('/clients', auth, clientCtrl.create);
router.put('/clients/:id', auth, clientCtrl.update);
router.delete('/clients/:id', auth, clientCtrl.remove);

// ── Menu Items ────────────────────────────────────────────────────────────────
// ✅ FIX: GET routes are PUBLIC — needed by MenuBrowse page (no login required)
router.get('/menu-items', menuCtrl.getAll);
router.get('/menu-items/:id', menuCtrl.getById);
router.post('/menu-items', auth, menuCtrl.create);
router.put('/menu-items/:id', auth, menuCtrl.update);
router.delete('/menu-items/:id', auth, menuCtrl.remove);

// ── Menu Packages ─────────────────────────────────────────────────────────────
// ✅ FIX: GET is PUBLIC — shown on Landing page
router.get('/menu-packages', menuPackageCtrl.getAll);
router.post('/menu-packages', auth, menuPackageCtrl.create);
router.put('/menu-packages/:id', auth, menuPackageCtrl.update);
router.delete('/menu-packages/:id', auth, menuPackageCtrl.remove);

// ── Menu Types ────────────────────────────────────────────────────────────────
// ✅ FIX: GET is PUBLIC
router.get('/menu-types', menuTypeCtrl.getAll);
router.post('/menu-types', auth, menuTypeCtrl.create);
router.put('/menu-types/:id', auth, menuTypeCtrl.update);
router.delete('/menu-types/:id', auth, menuTypeCtrl.remove);

// ── Menu Categories ───────────────────────────────────────────────────────────
// ✅ FIX: GET is PUBLIC — needed by MenuBrowse page
router.get('/menu-categories', menuCategoryCtrl.getAll);
router.post('/menu-categories/reorder', auth, menuCategoryCtrl.reorder);
router.post('/menu-categories', auth, menuCategoryCtrl.create);
router.put('/menu-categories/:id', auth, menuCategoryCtrl.update);
router.delete('/menu-categories/:id', auth, menuCategoryCtrl.remove);

// ── Event Categories ──────────────────────────────────────────────────────────
// ✅ FIX: GET is PUBLIC — shown on Landing page
router.get('/event-categories', eventCategoryCtrl.getAll);
router.post('/event-categories', auth, eventCategoryCtrl.create);
router.put('/event-categories/:id', auth, eventCategoryCtrl.update);
router.delete('/event-categories/:id', auth, eventCategoryCtrl.remove);

// ── Event Stall Items ─────────────────────────────────────────────────────────
// ✅ FIX: GET is PUBLIC — shown on Landing page
router.get('/event-stall-items', eventStallItemCtrl.getAll);
router.post('/event-stall-items', auth, eventStallItemCtrl.create);
router.put('/event-stall-items/:id', auth, eventStallItemCtrl.update);
router.delete('/event-stall-items/:id', auth, eventStallItemCtrl.remove);

// ── Orders ────────────────────────────────────────────────────────────────────
router.get('/orders', auth, orderCtrl.getAll);
router.get('/orders/:id', auth, orderCtrl.getById);
router.post('/orders', auth, orderCtrl.create);
router.put('/orders/:id', auth, orderCtrl.update);
router.delete('/orders/:id', auth, orderCtrl.remove);
router.post('/enquiries', orderCtrl.createPublic);   // ✅ already public (no auth)

// ── Invoices ──────────────────────────────────────────────────────────────────
router.get('/invoices', auth, invoiceCtrl.getAll);
router.get('/invoices/:id', auth, invoiceCtrl.getById);
router.post('/invoices', auth, invoiceCtrl.create);
router.put('/invoices/:id', auth, invoiceCtrl.update);
router.delete('/invoices/:id', auth, invoiceCtrl.remove);
router.post('/invoices/:id/generate-link', auth, invoiceCtrl.generateLink);
router.post('/invoices/:id/payment', auth, invoiceCtrl.addPayment);

// ── Quotations ────────────────────────────────────────────────────────────────
router.get('/quotations', auth, quotationCtrl.getAll);
router.get('/quotations/:id', auth, quotationCtrl.getById);
router.post('/quotations', auth, quotationCtrl.create);
router.put('/quotations/:id', auth, quotationCtrl.update);
router.delete('/quotations/:id', auth, quotationCtrl.remove);
router.post('/quotations/:id/generate-link', auth, quotationCtrl.generateLink);

// ── Share (public) ────────────────────────────────────────────────────────────
router.get('/share/:type/:token', shareCtrl.getSharedDocument);
router.post('/share/:type/:token/logo', uploadClientLogo, shareCtrl.uploadClientLogo);
router.delete('/share/:type/:token/logo', shareCtrl.removeClientLogo);

// ── Site Media (admin only) ────────────────────────────────────────────────────
router.post('/media/upload', auth, mediaCtrl.uploadImage);
router.get('/media/list', auth, mediaCtrl.listImages);
router.delete('/media/:key', auth, mediaCtrl.deleteImage);

// ── Chat logs (admin & public) ──────────────────────────────────────────────────
router.post('/chat/log', chatCtrl.logMessage);
router.get('/chat/sessions', auth, chatCtrl.getSessions);
router.get('/chat/sessions/:session_id', auth, chatCtrl.getSessionMessages);

module.exports = router;
