const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const { validateRegister } = require("../middleware/validation.middleware");

// 🔹 Register with validation
router.post("/register", validateRegister, authController.register);

// 🔹 Login (Step 2)
router.post("/login", authController.login); // no changes needed, just confirming

// 🔹 Profile (protected route)
router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Profile accessed successfully",
    user: req.user
  });
});

// 🔹 Admin-only route (RBAC)
router.get(
  "/admin-only",
  authenticateToken,
  authorizeRoles("Admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin! You have access.",
      user: req.user,
    });
  }
);

// 🔹 Optional Step 6 endpoints (Admin only)
router.get("/users", authenticateToken, authorizeRoles("Admin"), authController.getAllUsers);
router.delete("/users/:id", authenticateToken, authorizeRoles("Admin"), authController.deleteUser);

module.exports = router;