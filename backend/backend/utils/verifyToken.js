const { User } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Please login to continue" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decode.id }, paranoid: false });
    if (!user) {
      res.clearCookie('token');
      return res.status(401).json({
        success: false,
        message: "User no longer exists. Please login again.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("verifyToken error:", error);
    return res.status(401).json({ success: false, message: "Please login to continue" });
  }
};


const verifyUser = async (req, res, next) => {
  // future implementation
};

module.exports = { verifyToken, verifyUser };
