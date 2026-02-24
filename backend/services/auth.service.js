const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

exports.findRoleByName = async (roleName) => {
  const [rows] = await db.execute(
    "SELECT * FROM roles WHERE name = ?",
    [roleName]
  );
  return rows[0];
};

exports.createUser = async (userData) => {
  const id = uuidv4();

  await db.execute(
    "INSERT INTO users (id, full_name, email, password, role_id) VALUES (?, ?, ?, ?, ?)",
    [id, userData.full_name, userData.email, userData.password, userData.role_id]
  );

  return { id, ...userData };
};

// 🔐 LOGIN FUNCTION (ADDED FOR PHASE 2)
exports.loginUser = async (email) => {
  const [rows] = await db.execute(
    `SELECT users.*, roles.name AS role_name
     FROM users
     JOIN roles ON users.role_id = roles.id
     WHERE users.email = ?`,
    [email]
  );

  return rows[0];
};