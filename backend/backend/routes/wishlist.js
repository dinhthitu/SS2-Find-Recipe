const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkInWishlist,
  getWishlistCount
} = require('../controllers/wishlistController');

router.use(authMiddleware);

router.get('/', getWishlist);
router.get('/count', getWishlistCount);
router.get('/:recipeId/check', checkInWishlist);
router.post('/:recipeId', addToWishlist);
router.delete('/:recipeId', removeFromWishlist);
router.delete('/', clearWishlist);

module.exports = router;