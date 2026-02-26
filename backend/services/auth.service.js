const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.findUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

exports.findRoleByName = async (roleName) => {
  const [rows] = await db.execute("SELECT * FROM roles WHERE name = ?", [roleName]);
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

exports.loginUser = async (email) => {
  const [rows] = await db.execute(
    "SELECT users.*, roles.name AS role_name FROM users JOIN roles ON users.role_id = roles.id WHERE users.email = ?",
    [email]
  );
  return rows[0];
};

exports.getAllStudents = async () => {
  const [rows] = await db.execute("SELECT * FROM students");
  return rows;
};

exports.getAllCourses = async () => {
  const [rows] = await db.execute("SELECT * FROM courses");
  return rows;
};

exports.getAllEnrollments = async () => {
  const [rows] = await db.execute("SELECT * FROM enrollments");
  return rows;
};

exports.getAllGrades = async () => {
  const [rows] = await db.execute("SELECT * FROM grades");
  return rows;
};

// Get Instructor Dashboard Data
exports.getInstructorDashboardData = async (userId) => {
  const [courses] = await db.execute(
    "SELECT courses.id, courses.code, courses.name FROM courses JOIN instructor_courses ON courses.id = instructor_courses.course_id WHERE instructor_courses.instructor_id = ?",
    [userId]
  );

  const [grades] = await db.execute(
    "SELECT courses.code, grades.grade FROM grades JOIN courses ON grades.course_id = courses.id WHERE courses.id IN (SELECT course_id FROM instructor_courses WHERE instructor_id = ?)",
    [userId]
  );

  return { courses, grades };
};

// Get Registrar Dashboard Data
exports.getRegistrarDashboardData = async () => {
  const [students] = await db.execute("SELECT * FROM students");
  const [enrollments] = await db.execute("SELECT * FROM enrollments");
  const [grades] = await db.execute("SELECT * FROM grades");

  return { students, enrollments, grades };
};