const express = require('express');
const router = express.Router();
const { deleteUser, getAllUsers, getUser, updateUser, register, checkOtp, login } = require('../controllers/userController');
const { verifyAdmin, verifyToken, verifyUser } = require('../utils/verifyToken');
const { registerUserValidate, loginUserValidate } = require('../validate/user');
const multer = require('multer');
const { uploadImageToCloudinary } = require('../middlewares/uploadImageToCloudinary');
const {User} = require('../models'); // Assuming User model

const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', upload.single('file'), uploadImageToCloudinary, registerUserValidate, register);
router.post('/checkOtp', checkOtp);
router.post('/login', loginUserValidate, login);
router.get('/getuser', verifyToken, getUser);

// New endpoint to check if email exists
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ success: true, exists: true });
    }
    return res.status(200).json({ success: true, exists: false });
  } catch (error) {
    console.error('Check email error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: false, sameSite: 'none' })
    .status(200)
    .json({ success: true, message: 'Logged out successfully' });
});

router.get('/check/:id', verifyUser, (req, res) => {
  res.send('Hello user, you\'re logged in and can delete your account');
});




router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', verifyUser, getUser);


module.exports = router;