const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "joshua",
  database: "university_system"
});

module.exports = db.promise();