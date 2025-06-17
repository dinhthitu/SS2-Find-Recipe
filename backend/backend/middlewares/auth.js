const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.checkToken = async (req, res, next) => {
  let token = req.cookies?.token;
  if (!token) {
    token = req.headers.authorization?.split(' ')[1]; 
  }

  console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please login to continue',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
