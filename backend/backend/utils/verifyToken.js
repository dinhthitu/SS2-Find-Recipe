const { User } = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Please login to continue" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded from JWT:", decode);
    const user = await User.findOne({ where: { id: decode.id }, paranoid: false});
    if (!user) {
      res.clearCookie('token'); // 👈 Xóa token cũ
      return res.status(401).json({
        success: false,
        message: "User no longer exists. Please login again.",
      });
    }
    console.log("User from DB:", user);

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
