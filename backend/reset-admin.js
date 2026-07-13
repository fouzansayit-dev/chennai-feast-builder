require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const EMAIL = "admin@mycateringchennai.com";
const PASSWORD = "Admin@123";
const NAME = "Admin";

(async () => {
  const fs = require("fs");
  const path = require("path");

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root123",
  });

  console.log("Connected to MySQL. Initializing database schema...");

  // Load and execute schema.sql queries
  const schemaPath = path.join(__dirname, "schema.sql");
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    const queries = schemaSql
      .split(";")
      .map(q => {
        // Remove single-line comments (starting with -- or #) from the query block
        return q.split("\n")
          .filter(line => {
            const trimmed = line.trim();
            return !trimmed.startsWith("--") && !trimmed.startsWith("#");
          })
          .join("\n")
          .trim();
      })
      .filter(q => q.length > 0);

    for (const query of queries) {
      try {
        await conn.query(query);
      } catch (err) {
        console.warn("Schema query warning:", err.message, "on query:", query.substring(0, 100));
      }
    }
    console.log("Database schema setup complete.");
  } else {
    await conn.query("CREATE DATABASE IF NOT EXISTS my_catering_db;");
  }

  await conn.query("USE my_catering_db;");

  const hash = await bcrypt.hash(PASSWORD, 10);
  const [rows] = await conn.query("SELECT id FROM users WHERE email = ?", [EMAIL]);

  if (rows.length) {
    await conn.query("UPDATE users SET password_hash = ?, is_active = 1, role = ? WHERE email = ?", [hash, "admin", EMAIL]);
    console.log("Password reset for existing user:", EMAIL);
  } else {
    await conn.query("INSERT INTO users (name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, 1)", [NAME, EMAIL, hash, "admin"]);
    console.log("Admin user created:", EMAIL);
  }

  const [check] = await conn.query("SELECT password_hash FROM users WHERE email = ?", [EMAIL]);
  console.log("Verify:", await bcrypt.compare(PASSWORD, check[0].password_hash));
  console.log("Login -> Email: " + EMAIL + " | Password: " + PASSWORD);
  await conn.end();
})().catch(e => { console.error("ERROR:", e); process.exit(1); });
