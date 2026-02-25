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

  try {
    await db.execute(
      "INSERT INTO users (id, full_name, email, password, role_id) VALUES (?, ?, ?, ?, ?)",
      [id, userData.full_name, userData.email, userData.password, userData.role_id]
    );

    return { id, ...userData };

  } catch (error) {

    // 🔐 Handle duplicate email at DB level
    if (error.code === "ER_DUP_ENTRY") {
      const duplicateError = new Error("Email already exists");
      duplicateError.statusCode = 400;
      throw duplicateError;
    }

    throw error;
  }
};

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

// 🔹 Step 6 additions — Admin-only endpoints

// GET all users
exports.getAllUsers = async () => {
  const [rows] = await db.execute(
    `SELECT users.id, users.full_name, users.email, roles.name AS role_name
     FROM users
     JOIN roles ON users.role_id = roles.id`
  );
  return rows;
};

// DELETE user by id
exports.deleteUser = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
  return result.affectedRows > 0; // true if deleted
};