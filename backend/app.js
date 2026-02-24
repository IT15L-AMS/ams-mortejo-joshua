const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

// Centralized error handler
const { errorHandler } = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;