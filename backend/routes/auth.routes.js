const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const { validateRegister } = require("../middleware/validation.middleware"); // added

router.post("/register", validateRegister, authController.register); // modified
router.post("/login", authController.login);

router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Profile accessed successfully",
    user: req.user
  });
});

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

module.exports = router;