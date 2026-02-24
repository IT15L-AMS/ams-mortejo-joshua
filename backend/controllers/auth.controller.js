const authService = require("../services/auth.service");
const hashPassword = require("../utils/hash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const roleRecord = await authService.findRoleByName(role);
    if (!roleRecord) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await authService.createUser({
      full_name: fullName,
      email,
      password: hashedPassword,
      role_id: roleRecord.id
    });

    delete user.password;

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    next(error); // 🔹 pass error to centralized handler
  }
};

// 🔐 LOGIN FUNCTION (PHASE 2)
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await authService.loginUser(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role_name
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    delete user.password;

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    next(error); // 🔹 pass error to centralized handler
  }
};