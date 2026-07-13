const db = require('../config/db');

// GET /api/dashboard
const getStats = async (req, res) => {
  try {
    const [[orders]] = await db.query("SELECT COUNT(*) AS total, SUM(total_amount) AS revenue FROM orders WHERE status != 'cancelled'");
    const [[invoices]] = await db.query("SELECT COUNT(*) AS total, SUM(total_amount) AS amount FROM invoices WHERE status != 'cancelled'");
    const [[unpaid]] = await db.query("SELECT COUNT(*) AS total, SUM(balance_due) AS amount FROM invoices WHERE payment_status IN ('unpaid','partial')");
    const [[clients]] = await db.query('SELECT COUNT(*) AS total FROM clients WHERE is_active = 1');
    const [[quotations]] = await db.query("SELECT COUNT(*) AS total FROM quotations WHERE status NOT IN ('rejected','expired')");

    // Monthly revenue (last 6 months)
    const [monthly] = await db.query(`
      SELECT DATE_FORMAT(invoice_date, '%b %Y') AS month,
             SUM(total_amount) AS revenue,
             COUNT(*) AS count
      FROM invoices
      WHERE invoice_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND status != 'cancelled'
      GROUP BY DATE_FORMAT(invoice_date, '%b %Y'), YEAR(invoice_date), MONTH(invoice_date)
      ORDER BY YEAR(invoice_date), MONTH(invoice_date)
    `);

    // Recent orders
    const [recentOrders] = await db.query(`
      SELECT o.order_number, o.event_date, o.status, o.total_amount, c.name AS client_name
      FROM orders o LEFT JOIN clients c ON o.client_id = c.id
      ORDER BY o.created_at DESC LIMIT 5
    `);

    res.json({
      success: true,
      data: {
        stats: {
          total_orders: orders.total || 0,
          total_revenue: orders.revenue || 0,
          total_invoices: invoices.total || 0,
          invoice_amount: invoices.amount || 0,
          unpaid_invoices: unpaid.total || 0,
          unpaid_amount: unpaid.amount || 0,
          total_clients: clients.total || 0,
          total_quotations: quotations.total || 0,
        },
        monthly_revenue: monthly,
        recent_orders: recentOrders,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getStats };
