const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkInWishlist,
  getUserWishlist,
  deleteRecipeFromWishlist
} = require("../controllers/wishlistController");

router.use(checkToken);

// Routes for all authenticated users
router.get("/wishlist", getWishlist);
router.post("/wishlist/:recipeId", addToWishlist);
router.delete("/wishlist/:recipeId", removeFromWishlist);
router.get("/wishlist/check/:recipeId", checkInWishlist);

// Routes for admins only
router.get("/admin/:userId", isAdmin, getUserWishlist);
router.delete("/admin/:userId/:recipeId", isAdmin, deleteRecipeFromWishlist);

module.exports = router;
