const authService = require("../services/auth.service");
const hashPassword = require("../utils/hash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ===============================
// 🔐 REGISTER
// ===============================
exports.register = async (req, res, next) => {
  try {
    let { fullName, email, password, role } = req.body;

    // Basic validation
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔐 Normalize email
    email = email.toLowerCase().trim();

    // 🔐 Password strength validation
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long"
      });
    }

    // Check duplicate email
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate role
    const roleRecord = await authService.findRoleByName(role);
    if (!roleRecord) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const user = await authService.createUser({
      full_name: fullName,
      email,
      password: hashedPassword,
      role_id: roleRecord.id
    });

    // 🔐 STEP 4 — HIDE SENSITIVE DATA (Whitelist Safe Fields Only)
    const rawUser = user.toJSON ? user.toJSON() : user;

    const safeUser = {
      id: rawUser.id,
      full_name: rawUser.full_name,
      email: rawUser.email,
      role_id: rawUser.role_id
    };

    res.status(201).json({
      message: "User registered successfully",
      user: safeUser
    });

  } catch (error) {
    next(error);
  }
};

// ===============================
// 🔐 LOGIN
// ===============================
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await authService.loginUser(normalizedEmail);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔐 Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role_name
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
      }
    );

      

    // 🔐 STEP 4 — HIDE SENSITIVE DATA (Whitelist Safe Fields Only)
    const rawUser = user.toJSON ? user.toJSON() : user;

    const safeUser = {
      id: rawUser.id,
      full_name: rawUser.full_name,
      email: rawUser.email,
      role: rawUser.role_name
    };

    res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser
    });

  } catch (error) {
    next(error);
  }
};

// ===============================
// 🔐 STUDENT DASHBOARD
// ===============================
exports.getStudentDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id; // Extract user ID from the JWT token

    // Fetch student-specific data (courses, grades, year level, major)
    const studentData = await authService.getStudentDashboardData(userId);

    if (!studentData) {
      return res.status(404).json({ message: "Student data not found" });
    }

    res.status(200).json({
      message: "Student dashboard data fetched successfully",
      student: studentData
    });

  } catch (error) {
    next(error);
  }
};

// Admin view all students
exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await authService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// Admin view all courses
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await authService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// Admin view all enrollments
exports.getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await authService.getAllEnrollments();
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};

// Admin view all grades
exports.getAllGrades = async (req, res, next) => {
  try {
    const grades = await authService.getAllGrades();
    res.status(200).json(grades);
  } catch (error) {
    next(error);
  }
};

// Get Instructor Dashboard Data
exports.getInstructorDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT token

    // Fetch instructor-specific data (courses, grades)
    const instructorData = await authService.getInstructorDashboardData(userId);

    if (!instructorData) {
      return res.status(404).json({ message: "Instructor data not found" });
    }

    res.status(200).json({
      message: "Instructor dashboard data fetched successfully",
      instructor: instructorData
    });

  } catch (error) {
    next(error);
  }
};

// Get Registrar Dashboard Data
exports.getRegistrarDashboard = async (req, res, next) => {
  try {
    const registrarData = await authService.getRegistrarDashboardData();

    res.status(200).json({
      message: "Registrar dashboard data fetched successfully",
      registrar: registrarData
    });

  } catch (error) {
    next(error);
  }
};

// ===============================
// 🔐 ADMIN ONLY ROUTES
// ===============================
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUsers();

    // 🔐 STEP 4 — HIDE SENSITIVE DATA
    const cleanUsers = users.map(u => {
      const data = u.toJSON ? u.toJSON() : u;

      return {
        id: data.id,
        full_name: data.full_name,
        email: data.email,
        role_id: data.role_id
      };
    });

    res.status(200).json({ users: cleanUsers });

  } catch (error) {
    next(error);
  }
};

// DELETE /users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await authService.deleteUser(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    next(error);
  }
};