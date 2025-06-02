const express = require('express');
const router = express.Router();
const { checkToken } = require('../middlewares/auth');
const { login } = require('../controllers/userController');

router.post('/login', login);

module.exports = router;