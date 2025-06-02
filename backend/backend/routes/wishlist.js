const express = require('express');
const router = express.Router();
const { checkToken } = require('../middlewares/auth'); // Import checkToken from auth middleware
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkInWishlist,
  getWishlistCount
} = require('../controllers/wishlistController');

router.use(checkToken); // Use checkToken middleware

router.get('/', getWishlist);
router.get('/count', getWishlistCount);
router.get('/:recipeId/check', checkInWishlist);
router.post('/:recipeId', addToWishlist);
router.delete('/:recipeId', removeFromWishlist);
router.delete('/', clearWishlist);

module.exports = router;