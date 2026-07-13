const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const dbFile = process.env.DB_FILE || 'my_catering_db.sqlite';
const dbPath = path.isAbsolute(dbFile) ? dbFile : path.join(__dirname, '../../', dbFile);

console.log(`Checking/Creating SQLite database at: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
    process.exit(1);
  }
  console.log('Connected to the SQLite database.');
  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON;');
    createTables();
  });
});

function createTables() {
  console.log('Creating tables...');

  const tables = [
    `CREATE TABLE IF NOT EXISTS company_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL DEFAULT 'My Catering',
      tagline TEXT,
      email TEXT,
      phone TEXT,
      additional_phone TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      pincode TEXT,
      gstin TEXT,
      fssai_no TEXT,
      bank_name TEXT,
      bank_account TEXT,
      bank_ifsc TEXT,
      bank_branch TEXT,
      logo_url TEXT,
      logo_filename TEXT,
      terms_and_conditions TEXT,
      invoice_prefix TEXT DEFAULT 'INV',
      quotation_prefix TEXT DEFAULT 'QUO',
      tax_percentage REAL DEFAULT 18.00,
      currency TEXT DEFAULT 'INR',
      website TEXT,
      social_facebook TEXT,
      social_instagram TEXT,
      social_youtube TEXT,
      invoice_footer TEXT,
      quotation_footer TEXT,
      payment_methods TEXT,
      theme TEXT DEFAULT 'theme1',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_code TEXT UNIQUE,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      alt_phone TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      pincode TEXT,
      gstin TEXT,
      notes TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      description TEXT,
      unit TEXT DEFAULT 'per plate',
      price REAL NOT NULL DEFAULT 0.00,
      is_veg INTEGER DEFAULT 1,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS event_stalls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stall_name TEXT NOT NULL,
      stall_type TEXT,
      capacity INTEGER,
      price_per_day REAL DEFAULT 0.00,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      client_id INTEGER,
      event_date TEXT,
      event_time TEXT,
      event_type TEXT,
      venue TEXT,
      no_of_guests INTEGER,
      status TEXT DEFAULT 'pending',
      total_amount REAL DEFAULT 0.00,
      advance_paid REAL DEFAULT 0.00,
      balance_amount REAL DEFAULT 0.00,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
    )`,

    `CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      menu_item_id INTEGER,
      item_name TEXT NOT NULL,
      quantity INTEGER DEFAULT 1,
      unit_price REAL DEFAULT 0.00,
      total_price REAL DEFAULT 0.00,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS quotations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quotation_number TEXT UNIQUE NOT NULL,
      client_id INTEGER,
      share_token TEXT UNIQUE,
      event_date TEXT,
      event_type TEXT,
      venue TEXT,
      no_of_guests INTEGER,
      subtotal REAL DEFAULT 0.00,
      tax_amount REAL DEFAULT 0.00,
      discount_amount REAL DEFAULT 0.00,
      total_amount REAL DEFAULT 0.00,
      status TEXT DEFAULT 'draft',
      valid_until TEXT,
      notes TEXT,
      terms TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
    )`,

    `CREATE TABLE IF NOT EXISTS quotation_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quotation_id INTEGER NOT NULL,
      menu_item_id INTEGER,
      item_name TEXT NOT NULL,
      description TEXT,
      quantity INTEGER DEFAULT 1,
      unit TEXT,
      unit_price REAL DEFAULT 0.00,
      total_price REAL DEFAULT 0.00,
      FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_number TEXT UNIQUE NOT NULL,
      client_id INTEGER,
      order_id INTEGER,
      quotation_id INTEGER,
      share_token TEXT UNIQUE,
      invoice_date TEXT NOT NULL,
      due_date TEXT,
      event_date TEXT,
      event_type TEXT,
      venue TEXT,
      no_of_guests INTEGER,
      subtotal REAL DEFAULT 0.00,
      tax_percentage REAL DEFAULT 18.00,
      tax_amount REAL DEFAULT 0.00,
      discount_amount REAL DEFAULT 0.00,
      total_amount REAL DEFAULT 0.00,
      advance_paid REAL DEFAULT 0.00,
      balance_due REAL DEFAULT 0.00,
      payment_status TEXT DEFAULT 'unpaid',
      payment_method TEXT,
      status TEXT DEFAULT 'draft',
      notes TEXT,
      terms TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
      FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE SET NULL
    )`,

    `CREATE TABLE IF NOT EXISTS invoice_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_id INTEGER NOT NULL,
      menu_item_id INTEGER,
      item_name TEXT NOT NULL,
      description TEXT,
      quantity INTEGER DEFAULT 1,
      unit TEXT,
      unit_price REAL DEFAULT 0.00,
      total_price REAL DEFAULT 0.00,
      FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS client_logo_overrides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      share_token TEXT NOT NULL UNIQUE,
      document_type TEXT NOT NULL,
      document_id INTEGER NOT NULL,
      client_logo_url TEXT NOT NULL,
      client_logo_filename TEXT,
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      payment_date TEXT NOT NULL,
      payment_method TEXT,
      transaction_ref TEXT,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS menu_packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL DEFAULT 0,
      items TEXT,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS menu_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS menu_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type_id INTEGER DEFAULT NULL,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (type_id) REFERENCES menu_types(id) ON DELETE SET NULL
    )`,

    `CREATE TABLE IF NOT EXISTS event_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT DEFAULT 'Events',
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS event_stall_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category_id INTEGER DEFAULT NULL,
      price REAL DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES event_categories(id) ON DELETE SET NULL
    )`,

    `CREATE TABLE IF NOT EXISTS chat_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      sender TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  let completed = 0;
  for (const sql of tables) {
    db.run(sql, (err) => {
      if (err) {
        console.error('Error creating table with SQL:', sql, err.message);
      }
      completed++;
      if (completed === tables.length) {
        console.log('Tables check/creation complete.');
        seedData();
      }
    });
  }
}

function seedData() {
  console.log('Seeding initial data...');

  // 1. Company Settings
  db.run("INSERT OR IGNORE INTO company_settings (id, company_name) VALUES (1, 'My Catering')");

  // 2. Default User
  db.run(`INSERT OR IGNORE INTO users (id, name, email, password_hash, role)
    VALUES (1, 'Admin', 'admin@mycateringchennai.com',
      '$2a$10$XFE/gBiIs0pLAEAnMjHNxOeqZhE6fWZ2UXuaGq8vBZJV6NmXzqkFe', 'admin')`);

  // 3. Menu Types
  const menuTypes = [
    [1, 'Morning Breakfast'],
    [2, 'Lunch - Veg'],
    [3, 'Lunch - Non Veg'],
    [4, 'Evening Snacks'],
    [5, 'Night - Veg'],
    [6, 'Night - Non Veg']
  ];
  const stmtType = db.prepare("INSERT OR IGNORE INTO menu_types (id, name) VALUES (?, ?)");
  menuTypes.forEach(t => stmtType.run(t));
  stmtType.finalize();

  // 4. Menu Categories
  const menuCategories = [
    [1, 'Sambar, Kuzhambu & Rasam'],
    [2, 'Rice Items'],
    [3, 'Noodles Items'],
    [4, 'Side Dish - Gravy'],
    [5, 'Starters'],
    [6, 'Soup'],
    [7, 'Snacks'],
    [8, 'Tiffin'],
    [9, 'Tiffin Side Dish - Sambar, Chutney & Others'],
    [10, 'Indian Breads'],
    [11, 'Side Dish - Poriyal, Kootu & Aviyal'],
    [12, 'Raita, Pickle & Other'],
    [13, 'Payasam'],
    [14, 'Sweet'],
    [15, 'Drink'],
    [16, 'Common Items'],
    [17, 'Stalls'],
    [18, 'Events']
  ];
  const stmtCat = db.prepare("INSERT OR IGNORE INTO menu_categories (id, name) VALUES (?, ?)");
  menuCategories.forEach(c => stmtCat.run(c));
  stmtCat.finalize();

  // 5. Event Categories
  const eventCategories = [
    [1, 'Events', 'Events', 0, 1],
    [2, 'Stalls', 'Stalls', 0, 1],
    [3, 'Others', 'Others', 0, 1]
  ];
  const stmtEventCat = db.prepare("INSERT OR IGNORE INTO event_categories (id, name, type, sort_order, is_active) VALUES (?, ?, ?, ?, ?)");
  eventCategories.forEach(ec => stmtEventCat.run(ec));
  stmtEventCat.finalize();

  // 6. Event Stall Items
  const eventStallItems = [
    ['Welcome Girls',1],['Welcome Set',1],['Dining Set',1],['Hand Pyro',1],
    ['Cold Pyro',1],['Fog pot',1],['Thambulam Bag',1],['Return Gifts',1],
    ['Sapling Gift',1],['Nadhaswaram Melam',1],['Chenda Melam',1],['DJ',1],
    ['Dance Floor',1],['Live Music',1],['Emcee',1],['Bouncers',1],
    ['Dancers',1],['Stick Balloon',1],['Balloon Blasting',1],
    ['Balloon Shooting',1],['Jumping Castle',1],['Mehendi',1],['Bangles',1],
    ['Temporary tattoo',1],['Elephant Tusk',1],['360 Videobooth',1],
    ['360 Videobooth + App',1],['Instant Photobooth',1],
    ['Cartoon Characters',1],['Inflattable Cartoon Characters',1],
    ['Aarthi Plates',1],['Vegetable Carving',1],['Table Cloth',1],
    ['Table Cloth with Flowers',1],['Rental Cars',1],['Chair Cover',1],
    ['LED Table',1],['LED Table with Canopy',1],['Chafing Dishes',1],
    ['Plates',1],['Plates with Leaf',1],['Transport Charges',1],
    ['Other Charges',1],['Other Events Items',1],
    ['Spring Potato',2],['Sweet Corn',2],['Veg Salad',2],['Green Salad',2],
    ['Mocktail',2],['Tender Coconut',2],['Sugarcane Juice',2],
    ['Badam Milk Hot',2],['Lassi',2],['Ice Cream - Real fruit',2],
    ['Ice Cream - Casatta',2],['Ice Cream - Abukatta',2],
    ['Ice Cream - Scoop',2],['Ice Cream - Cup',2],['Paan Beeda',2],
    ['Sweet Beeda',2],['Fruit Salad - Grand',2],['Fruit Salad',2],
    ['Dahi Puri',2],['Bhel Puri',2],['Pani Puri',2],
    ['Chocolate Fountain',2],['Sugar Candy',2],['Pop Corn',2],
    ['Other Stall Items',2],
    ['Others',3]
  ];
  
  const stmtStall = db.prepare("INSERT OR IGNORE INTO event_stall_items (name, category_id) VALUES (?, ?)");
  eventStallItems.forEach(item => stmtStall.run(item));
  stmtStall.finalize();

  // 7. Load insert_menu_items.sql from package backend
  const insertMenuItemsPath = path.join(__dirname, '../../insert_menu_items.sql');
  if (fs.existsSync(insertMenuItemsPath)) {
    console.log('Loading menu items from insert_menu_items.sql...');
    let sqlContent = fs.readFileSync(insertMenuItemsPath, 'utf8');
    sqlContent = sqlContent
      .replace(/USE\s+.*;/i, '')
      .replace(/SET NAMES\s+.*;/i, '')
      .replace(/INSERT\s+IGNORE\s+INTO/gi, 'INSERT OR IGNORE INTO');

    const statements = sqlContent.split(';').map(s => s.trim()).filter(s => s.length > 0);
    let runCount = 0;
    statements.forEach(stmt => {
      db.run(stmt, (err) => {
        if (err) {
          console.error('Error running menu item query:', err.message);
        }
        runCount++;
        if (runCount === statements.length) {
          console.log('Menu items import complete.');
          db.close(() => {
            console.log('Database setup and seed complete.');
          });
        }
      });
    });
  } else {
    console.log('insert_menu_items.sql not found at ' + insertMenuItemsPath + ', skipping menu seeding.');
    db.close(() => {
      console.log('Database setup complete.');
    });
  }
}
