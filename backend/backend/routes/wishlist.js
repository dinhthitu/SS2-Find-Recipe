const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkInWishlist,
  getWishlistCount,
} = require("../controllers/wishlistController");

console.log('Imported getWishlist:', typeof getWishlist, getWishlist); // Debug import

// Áp dụng middleware cho toàn bộ route
router.use(checkToken);

// router.get("/", getWishlist); // GET /api/wishlist
// router.get("/count", getWishlistCount);
// router.get("/:recipeId/check", checkInWishlist);
// router.post("/:recipeId", addToWishlist);
// router.delete("/:recipeId", removeFromWishlist);
// router.delete("/", clearWishlist);

// module.exports = router;

const wishlistController = require('../controllers/wishlistController');

// Đúng cách gọi:
router.get('/wishlist', wishlistController.getWishlist);
router.post('/wishlist/:recipeId', wishlistController.addToWishlist);
router.delete('/wishlist/:recipeId', wishlistController.removeFromWishlist);
router.delete('/wishlist', wishlistController.clearWishlist);
router.get('/wishlist/check/:recipeId', wishlistController.checkInWishlist);

module.exports = router;
