const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "joshua",
  database: process.env.DB_NAME || "university_system",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db.promise();