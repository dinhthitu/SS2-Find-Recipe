'use strict';

const { User } = require('../models');

exports.loginOrSignup = async (req, res) => {
  const { uid, email, displayName, email_verified } = req.user;
  const { name } = req.body;  // client gửi lên trường `name`

  try {
    if (!email_verified) {
      return res.status(403).json({ success: false, message: 'Please verify your email first' });
    }

    let user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'name', 'role'],
    });

    if (!user) {
      user = await User.create({
        email,
        name: name || displayName || 'User',
        role: email === 'admin@example.com' ? 'admin' : 'user',
        password: 'default_password', // bắt buộc, vì model require
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in login/signup:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
