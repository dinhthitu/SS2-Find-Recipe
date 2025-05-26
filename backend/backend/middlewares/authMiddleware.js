const admin = require('../config/firebaseAdmin');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    console.log('Received token:', token);
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Decoded token:', decodedToken);

    // Tìm user trong bảng Users dựa trên firebaseUid
    const user = await User.findOne({
      where: { firebaseUid: decodedToken.uid },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found in database' });
    }

    // Gán req.user với id thực sự từ bảng Users
    req.user = {
      id: user.id, // Sử dụng id tự tăng từ bảng Users
      email: decodedToken.email,
      email_verified: decodedToken.email_verified,
      firebaseUid: decodedToken.uid,
    };
    
    console.log('User found:', req.user);
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ success: false, message: 'Invalid token', details: error.message });
  }
};

module.exports = authMiddleware;