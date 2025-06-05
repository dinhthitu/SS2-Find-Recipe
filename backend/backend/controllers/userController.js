const { User, OtpUser } = require("../models");
const { generateRandomNumber } = require("../helpers/generateHelper.js");
const { sendMail } = require("../helpers/sendMail.js");
const { deleteImg } = require("../middlewares/uploadImageToCloudinary.js");
const { sendOtpToken, sendToken } = require("../helpers/JsonToken.js");
const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, file, public_id } = req.body;
    const userEmail = await User.findOne({ where: { email } });
    const otpEmail = await OtpUser.findOne({ where: { email } });

    if (userEmail || otpEmail) {
      deleteImg(public_id)
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }
     
    if (password !== confirmPassword) {
      deleteImg(public_id)
      return res.json({
        success: false,
        message: "Password and Confirm Password must be the same",
      });
    }

    const objectOtpUser = {
      otp: generateRandomNumber(6),
      expiresAt: new Date(Date.now() + 3 * 60 * 1000),
      username,
      email,
      password,
      avatar: req.body.file,

    };

    try {
      const otpUser = await OtpUser.create(objectOtpUser);
      const hasError = await sendMail({
        email,
        subject: "[Find Recipe]Please verify your device",
        text: `Hello ${username},\n\nA sign-in attempt requires further verification because we did not recognize your device. To complete the sign-in, enter the verification code below:\n\nVerification code: ${objectOtpUser.otp}\n\nIf you did not attempt to sign in, your password may be compromised. Please take the necessary actions to secure your account.`,
      });

      if (hasError) {
        await OtpUser.destroy({ where: { id: otpUser.id } }); 
        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email. Please try again.",
        });
      }

      sendOtpToken(otpUser, 200, res);

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Failed to create OTP or send email: ${error.message}`,
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in registration: ${error.message}`,
    });
  }
};
const checkOtp = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const { tokenOtp } = req.cookies;
    if (!tokenOtp) {
      return res.status(401).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
        code: 401,
      });
    }
    try {
      const decoded = jwt.verify(tokenOtp, process.env.JWT_SECRET);
      const otpEntity = await OtpUser.findOne({ where: { id: decoded.id } });
      if (!otpEntity) {
        return res.status(401).json({
          success: false,
          message: "OTP has expired. Please request a new one.",
          code: 401,
        });
      }
      if (otpEntity.otp !== otp || otpEntity.expiresAt < new Date()) {
        return res.status(401).json({
          success: false,
          message: "Incorrect or expired OTP. Please try again.",
        });
      }
      const user = await User.create({
        username: otpEntity.username,
        email: otpEntity.email,
        password: otpEntity.password,
        avatar: otpEntity.avatar || "https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
      });
      await user.save();
      await OtpUser.destroy({ where: { id: otpEntity.id } });
      return res.json({
        success: true,
        message: "Your account has been successfully created!",
      });

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: `Token verification failed: ${error.message}`,
      });
    }

  } catch (error) {
      return res.status(500).json({
      success: false,
      message: `Error in OTP verification: ${error.message}`,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const [updated, [updatedUser]] = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "No User found with id " + req.params.id });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error in updateUser:', err.stack);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: "No User found with id " + req.params.id });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error('Error in deleteUser:', err.stack);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const allUsers = await User.findAll({ paranoid: false });
    console.log("== ALL USERS ==");
    console.log(allUsers.map(u => u.toJSON())); 
   try {
        res.status(200).json({
            success: true,
            user:req.user,
          });
    } catch (error) {
        return res.json({
            success:false,
            message:"Error in BE"
        })
    }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error in getAllUsers:', err.stack);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password. Please try again.",
      });
    }

    const isPass = await user.comparePassword(password);

    if (!isPass) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password. Please try again.",
      });
    }
    sendToken(user, 201, res);

  } catch (error) {
    console.error('Error in login:', error.stack);
    return res.status(500).json({
      success: false,
      message: `Error in login: ${error.message}`,
    });
  }
};

module.exports = {
  register,
  checkOtp,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  login,
};
