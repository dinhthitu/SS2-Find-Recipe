const admin = require('../config/firebaseAdmin');
const { User } = require('../models');
exports.loginOrSignup = async (req, res) => {
  const { token } = req.body;
  const { name } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ success: false, message: 'No token provided' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, uid, displayName, email_verified } = decodedToken;

    if (!email || !uid) {
      return res.status(400).json({ success: false, message: 'Missing email or UID' });
    }

    if (!email_verified) {
      return res.status(403).json({ success: false, message: 'Please verify your email first' });
    }

    let user = await User.findOne({
      where: { firebaseUid: uid }, // Tìm theo firebaseUid thay vì email
      attributes: ['id', 'email', 'name', 'role', 'firebaseUid'],
    });

    console.log('Found user:', user); // Thêm log

    if (!user) {
      let baseUsername = name || displayName || email.split('@')[0];
      let username = baseUsername;
      let counter = 1;

      while (await User.findOne({ where: { name: username } })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      user = await User.create({
        email,
        firebaseUid: uid,
        name: username,
        role: email === 'admin@example.com' ? 'admin' : 'user',
        password: 'google-signin-placeholder',
      });
      console.log('Created new user:', user); // Thêm log
    } else if (user.email !== email) {
      return res.status(403).json({ success: false, message: 'Email mismatch with existing account' });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: user.getJwtToken(), // Thêm token
    });
  } catch (error) {
    console.error('Error in login/signup:', error);
    return res.status(500).json({ success: false, message: 'Server error', details: error.message });
  }
};