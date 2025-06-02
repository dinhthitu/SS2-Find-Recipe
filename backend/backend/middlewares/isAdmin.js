const { checkToken } = require('./auth');

module.exports = async (req, res, next) => {
  try {
    await checkToken(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied: Admins only',
        });
      }
      next();
    });
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};