const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const createActiveToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const sendToken = (data, statusCode, res) => {
  data.password = '';
  const token = data.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    data,
    token,
  });
};

const sendOtpToken = (data, statusCode, res) => {
  const token = data.getJwtToken();
  const options = {
    expires: new Date(Date.now() + 3 * 60 * 1000),
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  };

  res.status(statusCode).cookie('tokenOtp', token, options).json({
    success: true,
    data,
    token,
  });
};

module.exports = { createActiveToken, sendOtpToken, sendToken };
