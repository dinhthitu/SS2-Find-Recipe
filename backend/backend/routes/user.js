const express = require('express');
const router = express.Router();
const { deleteUser, getUser, updateUser, register, checkOtp, login } = require('../controllers/userController');
const { verifyToken, verifyUser } = require('../utils/verifyToken');
const { registerUserValidate, loginUserValidate } = require('../validate/user');
const multer = require('multer');
const { uploadImageToCloudinary } = require('../middlewares/uploadImageToCloudinary');
const {User} = require('../models'); 

const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', upload.single('file'), uploadImageToCloudinary, registerUserValidate, register);
router.post('/checkOtp', checkOtp);
router.post('/login', loginUserValidate, login);
router.get('/getuser', verifyToken, getUser);



router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' })
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
