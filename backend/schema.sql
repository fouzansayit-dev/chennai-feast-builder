

CREATE DATABASE IF NOT EXISTS my_catering_db;
USE my_catering_db;


CREATE TABLE IF NOT EXISTS company_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(255) NOT NULL DEFAULT 'My Catering',
  tagline VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  additional_phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(20),
  gstin VARCHAR(50),
  fssai_no VARCHAR(50),
  bank_name VARCHAR(255),
  bank_account VARCHAR(100),
  bank_ifsc VARCHAR(50),
  bank_branch VARCHAR(255),
  logo_url VARCHAR(500),
  logo_filename VARCHAR(255),
  terms_and_conditions TEXT,
  invoice_prefix VARCHAR(20) DEFAULT 'INV',
  quotation_prefix VARCHAR(20) DEFAULT 'QUO',
  tax_percentage DECIMAL(5,2) DEFAULT 18.00,
  currency VARCHAR(10) DEFAULT 'INR',
  -- Extended settings (previously localStorage-only)
  website VARCHAR(500),
  social_facebook VARCHAR(500),
  social_instagram VARCHAR(500),
  social_youtube VARCHAR(500),
  invoice_footer TEXT,
  quotation_footer TEXT,
  payment_methods JSON,
  theme VARCHAR(50) DEFAULT 'theme1',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default row
INSERT IGNORE INTO company_settings (id, company_name) VALUES (1, 'My Catering');

-- Migration: add columns for existing databases (safe to re-run; IF NOT EXISTS prevents errors)
ALTER TABLE company_settings
  ADD COLUMN IF NOT EXISTS website VARCHAR(500),
  ADD COLUMN IF NOT EXISTS additional_phone VARCHAR(50),
  ADD COLUMN IF NOT EXISTS social_facebook VARCHAR(500),
  ADD COLUMN IF NOT EXISTS social_instagram VARCHAR(500),
  ADD COLUMN IF NOT EXISTS social_youtube VARCHAR(500),
  ADD COLUMN IF NOT EXISTS invoice_footer TEXT,
  ADD COLUMN IF NOT EXISTS quotation_footer TEXT,
  ADD COLUMN IF NOT EXISTS payment_methods JSON,
  ADD COLUMN IF NOT EXISTS theme VARCHAR(50) DEFAULT 'theme1';

CREATE TABLE IF NOT EXISTS clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  client_code VARCHAR(50) UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  alt_phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(20),
  gstin VARCHAR(50),
  notes TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- MENU ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS menu_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  unit VARCHAR(50) DEFAULT 'per plate',
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  is_veg TINYINT(1) DEFAULT 1,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- EVENT STALLS
-- ============================================================
CREATE TABLE IF NOT EXISTS event_stalls (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stall_name VARCHAR(255) NOT NULL,
  stall_type VARCHAR(100),
  capacity INT,
  price_per_day DECIMAL(10,2) DEFAULT 0.00,
  description TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(100) UNIQUE NOT NULL,
  client_id INT,
  event_date DATE,
  event_time TIME,
  event_type VARCHAR(100),
  venue TEXT,
  no_of_guests INT,
  status ENUM('pending','confirmed','in_progress','completed','cancelled') DEFAULT 'pending',
  total_amount DECIMAL(12,2) DEFAULT 0.00,
  advance_paid DECIMAL(12,2) DEFAULT 0.00,
  balance_amount DECIMAL(12,2) DEFAULT 0.00,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  menu_item_id INT,
  item_name VARCHAR(255) NOT NULL,
  quantity INT DEFAULT 1,
  unit_price DECIMAL(10,2) DEFAULT 0.00,
  total_price DECIMAL(10,2) DEFAULT 0.00,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ============================================================
-- QUOTATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS quotations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quotation_number VARCHAR(100) UNIQUE NOT NULL,
  client_id INT,
  share_token VARCHAR(100) UNIQUE,        -- for public share link
  event_date DATE,
  event_type VARCHAR(100),
  venue TEXT,
  no_of_guests INT,
  subtotal DECIMAL(12,2) DEFAULT 0.00,
  tax_amount DECIMAL(12,2) DEFAULT 0.00,
  discount_amount DECIMAL(12,2) DEFAULT 0.00,
  total_amount DECIMAL(12,2) DEFAULT 0.00,
  status ENUM('draft','sent','accepted','rejected','expired') DEFAULT 'draft',
  valid_until DATE,
  notes TEXT,
  terms TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS quotation_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  quotation_id INT NOT NULL,
  menu_item_id INT,
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 1,
  unit VARCHAR(50),
  unit_price DECIMAL(10,2) DEFAULT 0.00,
  total_price DECIMAL(10,2) DEFAULT 0.00,
  FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE
);

-- ============================================================
-- INVOICES
-- ============================================================
CREATE TABLE IF NOT EXISTS invoices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  invoice_number VARCHAR(100) UNIQUE NOT NULL,
  client_id INT,
  order_id INT,
  quotation_id INT,
  share_token VARCHAR(100) UNIQUE,        -- for public share link
  invoice_date DATE NOT NULL,
  due_date DATE,
  event_date DATE,
  event_type VARCHAR(100),
  venue TEXT,
  no_of_guests INT,
  subtotal DECIMAL(12,2) DEFAULT 0.00,
  tax_percentage DECIMAL(5,2) DEFAULT 18.00,
  tax_amount DECIMAL(12,2) DEFAULT 0.00,
  discount_amount DECIMAL(12,2) DEFAULT 0.00,
  total_amount DECIMAL(12,2) DEFAULT 0.00,
  advance_paid DECIMAL(12,2) DEFAULT 0.00,
  balance_due DECIMAL(12,2) DEFAULT 0.00,
  payment_status ENUM('unpaid','partial','paid') DEFAULT 'unpaid',
  payment_method VARCHAR(100),
  status ENUM('draft','sent','paid','overdue','cancelled') DEFAULT 'draft',
  notes TEXT,
  terms TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,
  FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  invoice_id INT NOT NULL,
  menu_item_id INT,
  item_name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INT DEFAULT 1,
  unit VARCHAR(50),
  unit_price DECIMAL(10,2) DEFAULT 0.00,
  total_price DECIMAL(10,2) DEFAULT 0.00,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

-- ============================================================
-- CLIENT LOGO OVERRIDES
-- Key feature: when client opens a share link and uploads their
-- own logo, it is stored here linked to the share_token.
-- Admin logo remains untouched.
-- ============================================================
CREATE TABLE IF NOT EXISTS client_logo_overrides (
  id INT PRIMARY KEY AUTO_INCREMENT,
  share_token VARCHAR(100) NOT NULL,      -- which shared document
  document_type ENUM('invoice','quotation') NOT NULL,
  document_id INT NOT NULL,
  client_logo_url VARCHAR(500) NOT NULL,  -- client's uploaded logo path
  client_logo_filename VARCHAR(255),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_token (share_token)   -- one override per document link
);

-- ============================================================
-- PAYMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  invoice_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method VARCHAR(100),
  transaction_ref VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

-- ============================================================
-- USERS (Admin auth)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','staff') DEFAULT 'admin',
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin user (password: Admin@123 — CHANGE THIS)
INSERT IGNORE INTO users (id, name, email, password_hash, role)
VALUES (1, 'Admin', 'admin@mycateringchennai.com',
  '$2a$10$XFE/gBiIs0pLAEAnMjHNxOeqZhE6fWZ2UXuaGq8vBZJV6NmXzqkFe', 'admin');
