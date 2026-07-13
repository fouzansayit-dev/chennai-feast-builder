USE my_catering_db;
SET NAMES utf8mb4;

-- ============================================================
-- TABLE CREATION
-- ============================================================

CREATE TABLE IF NOT EXISTS menu_packages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  items TEXT,
  description TEXT,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menu_types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menu_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  type_id INT DEFAULT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (type_id) REFERENCES menu_types(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS event_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) DEFAULT 'Events',
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_stall_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category_id INT DEFAULT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES event_categories(id) ON DELETE SET NULL
);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT IGNORE INTO menu_types (id, name) VALUES
  (1,'Morning Breakfast'),(2,'Lunch - Veg'),(3,'Lunch - Non Veg'),
  (4,'Evening Snacks'),(5,'Night - Veg'),(6,'Night - Non Veg');

INSERT IGNORE INTO menu_categories (id, name) VALUES
  (1,'Sambar, Kuzhambu & Rasam'),(2,'Rice Items'),(3,'Noodles Items'),
  (4,'Side Dish - Gravy'),(5,'Starters'),(6,'Soup'),(7,'Snacks'),
  (8,'Tiffin'),(9,'Tiffin Side Dish - Sambar, Chutney & Others'),
  (10,'Indian Breads'),(11,'Side Dish - Poriyal, Kootu & Aviyal'),
  (12,'Raita, Pickle & Other'),(13,'Payasam'),(14,'Sweet'),
  (15,'Drink'),(16,'Common Items'),(17,'Stalls'),(18,'Events');

-- Insert 3 event categories with correct IDs
INSERT IGNORE INTO event_categories (id, name, type, sort_order, is_active) VALUES
  (1, 'Events', 'Events', 0, 1),
  (2, 'Stalls', 'Stalls', 0, 1),
  (3, 'Others', 'Others', 0, 1);

-- ============================================================
-- EVENT STALL ITEMS
-- ============================================================

-- EVENTS items (category_id = 1)
INSERT IGNORE INTO event_stall_items (name, category_id) VALUES
('Welcome Girls',1),('Welcome Set',1),('Dining Set',1),('Hand Pyro',1),
('Cold Pyro',1),('Fog pot',1),('Thambulam Bag',1),('Return Gifts',1),
('Sapling Gift',1),('Nadhaswaram Melam',1),('Chenda Melam',1),('DJ',1),
('Dance Floor',1),('Live Music',1),('Emcee',1),('Bouncers',1),
('Dancers',1),('Stick Balloon',1),('Balloon Blasting',1),
('Balloon Shooting',1),('Jumping Castle',1),('Mehendi',1),('Bangles',1),
('Temporary tattoo',1),('Elephant Tusk',1),('360 Videobooth',1),
('360 Videobooth + App',1),('Instant Photobooth',1),
('Cartoon Characters',1),('Inflattable Cartoon Characters',1),
('Aarthi Plates',1),('Vegetable Carving',1),('Table Cloth',1),
('Table Cloth with Flowers',1),('Rental Cars',1),('Chair Cover',1),
('LED Table',1),('LED Table with Canopy',1),('Chafing Dishes',1),
('Plates',1),('Plates with Leaf',1),('Transport Charges',1),
('Other Charges',1),('Other Events Items',1);

-- STALLS items (category_id = 2)
INSERT IGNORE INTO event_stall_items (name, category_id) VALUES
('Spring Potato',2),('Sweet Corn',2),('Veg Salad',2),('Green Salad',2),
('Mocktail',2),('Tender Coconut',2),('Sugarcane Juice',2),
('Badam Milk Hot',2),('Lassi',2),('Ice Cream - Real fruit',2),
('Ice Cream - Casatta',2),('Ice Cream - Abukatta',2),
('Ice Cream - Scoop',2),('Ice Cream - Cup',2),('Paan Beeda',2),
('Sweet Beeda',2),('Fruit Salad - Grand',2),('Fruit Salad',2),
('Dahi Puri',2),('Bhel Puri',2),('Pani Puri',2),
('Chocolate Fountain',2),('Sugar Candy',2),('Pop Corn',2),
('Other Stall Items',2);

-- OTHERS items (category_id = 3)
INSERT IGNORE INTO event_stall_items (name, category_id) VALUES
('Others',3);

SELECT 'Migration complete' AS status;
