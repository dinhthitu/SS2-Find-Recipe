const wishlistRoutes = require("./routes/wishlist");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const usersRoute = require("./routes/user");
const googleAuthRoute = require("./routes/googleAuth");
const adminRoutes = require("./routes/admin"); 
const swaggerDocs = require("./swagger");
const db = require("./models");

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/users", usersRoute);
app.use("/api/auth", googleAuthRoute);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);

// Connect to DB
(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: false });
  } catch (e) {
    console.error("Database connection error:", e);
  }
})();

// Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ success: false, message });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  swaggerDocs(app, PORT);
});