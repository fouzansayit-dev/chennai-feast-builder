const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const dbFile = process.env.DB_FILE || 'my_catering_db.sqlite';
const dbPath = path.isAbsolute(dbFile) ? dbFile : path.join(__dirname, '../../', dbFile);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ SQLite connection failed:', err.message);
  } else {
    console.log('✅ SQLite connected successfully');
    db.run('PRAGMA foreign_keys = ON;');
  }
});

// Helper to rewrite MySQL-specific queries to SQLite format
function rewriteQuery(sql) {
  let newSql = sql;
  
  // Replace CONCAT(COALESCE(c.countryCode,'+91'),' ',COALESCE(c.phone,''))
  newSql = newSql.replace(
    /CONCAT\s*\(\s*COALESCE\s*\(\s*c\.countryCode\s*,\s*'\+91'\s*\)\s*,\s*' '\s*,\s*COALESCE\s*\(\s*c\.phone\s*,\s*''\s*\)\s*\)/gi,
    "(COALESCE(c.countryCode, '+91') || ' ' || COALESCE(c.phone, ''))"
  );

  // General CURDATE and DATE_SUB replacements
  newSql = newSql.replace(/DATE_SUB\s*\(\s*CURDATE\(\s*\)\s*,\s*INTERVAL\s*6\s*MONTH\s*\)/gi, "date('now', '-6 month')");
  newSql = newSql.replace(/\bCURDATE\(\)/gi, "date('now')");
  
  // Replace DATE_FORMAT(invoice_date, '%b %Y')
  newSql = newSql.replace(
    /DATE_FORMAT\s*\(\s*invoice_date\s*,\s*'%b %Y'\s*\)/gi,
    "(CASE strftime('%m', invoice_date) WHEN '01' THEN 'Jan' WHEN '02' THEN 'Feb' WHEN '03' THEN 'Mar' WHEN '04' THEN 'Apr' WHEN '05' THEN 'May' WHEN '06' THEN 'Jun' WHEN '07' THEN 'Jul' WHEN '08' THEN 'Aug' WHEN '09' THEN 'Sep' WHEN '10' THEN 'Oct' WHEN '11' THEN 'Nov' WHEN '12' THEN 'Dec' END || ' ' || strftime('%Y', invoice_date))"
  );

  // Grouping / Ordering replacements in dashboard controller:
  // GROUP BY DATE_FORMAT(invoice_date, '%b %Y'), YEAR(invoice_date), MONTH(invoice_date)
  newSql = newSql.replace(
    /GROUP BY DATE_FORMAT\s*\(\s*invoice_date\s*,\s*'%b %Y'\s*\)\s*,\s*YEAR\s*\(\s*invoice_date\s*\)\s*,\s*MONTH\s*\(\s*invoice_date\s*\)/gi,
    "GROUP BY month"
  );
  // ORDER BY YEAR(invoice_date), MONTH(invoice_date)
  newSql = newSql.replace(
    /ORDER BY YEAR\s*\(\s*invoice_date\s*\)\s*,\s*MONTH\s*\(\s*invoice_date\s*\)/gi,
    "ORDER BY strftime('%Y', invoice_date), strftime('%m', invoice_date)"
  );

  // NOW() -> CURRENT_TIMESTAMP
  newSql = newSql.replace(/\bNOW\(\)/gi, "CURRENT_TIMESTAMP");

  return newSql;
}

// Promise-based query helper
function query(sql, params = []) {
  const finalSql = rewriteQuery(sql);
  
  // If it's a SELECT or PRAGMA query
  const isSelect = /^\s*(SELECT|PRAGMA|SHOW|EXPLAIN)\b/i.test(finalSql);

  return new Promise((resolve, reject) => {
    if (isSelect) {
      db.all(finalSql, params, (err, rows) => {
        if (err) {
          console.error('SQLite SELECT error on SQL:', finalSql, err.message);
          reject(err);
        } else {
          resolve([rows, []]);
        }
      });
    } else {
      db.run(finalSql, params, function(err) {
        if (err) {
          console.error('SQLite write error on SQL:', finalSql, err.message);
          reject(err);
        } else {
          resolve([{ insertId: this.lastID, affectedRows: this.changes }, []]);
        }
      });
    }
  });
}

// Connection object that mimics mysql2 pool connection for transactions
const connectionMock = {
  query: query,
  beginTransaction: () => query('BEGIN TRANSACTION'),
  commit: () => query('COMMIT'),
  rollback: () => query('ROLLBACK'),
  release: () => {} // No-op in SQLite
};

module.exports = {
  query: query,
  getConnection: async () => connectionMock,
  on: () => {},
  end: () => new Promise(resolve => db.close(resolve))
};
