const jwt = require("jsonwebtoken");

// ===============================
// 🔐 Authenticate JWT token
// ===============================
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  // 🔐 Ensure JWT secret exists
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message: "Server configuration error."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach user info to request

    // 🔐 Ensure the user is a student before proceeding
    if (req.user.role !== 'Student') {
      return res.status(403).json({
        message: "Forbidden. You are not authorized to access this resource."
      });
    }

    next();
  } catch (error) {
    // 🔐 Handle expired token
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again."
      });
    }

    // 🔐 Handle invalid token
    return res.status(403).json({
      message: "Invalid token."
    });
  }
};

// ===============================
// 🔐 Role-Based Authorization (RBAC)
// ===============================
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Ensure authentication ran first
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized. Please login."
      });
    }

    // Check role permission
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden. You do not have permission to access this resource."
      });
    }

    next();
  };
};