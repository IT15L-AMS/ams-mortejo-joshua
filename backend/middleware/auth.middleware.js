const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  // 1️⃣ Get token from header
  const authHeader = req.headers["authorization"];

  // Format should be: Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];

  // 2️⃣ No token
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // 3️⃣ Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    // 4️⃣ Attach user info to request
    req.user = user;

    next();
  });
};