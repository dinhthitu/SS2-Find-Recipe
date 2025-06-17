const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkInWishlist,
  getUserWishlist,
  addRecipeToUserWishlist,
  deleteRecipeFromWishlist
} = require("../controllers/wishlistController");

// Apply checkToken for all routes to ensure authentication
router.use(checkToken);

// Routes for all authenticated users
router.get("/wishlist", getWishlist);
router.post("/wishlist/:recipeId", addToWishlist);
router.delete("/wishlist/:recipeId", removeFromWishlist);
router.delete("/wishlist", clearWishlist);
router.get("/wishlist/check/:recipeId", checkInWishlist);

// Routes for admins only
router.get("/admin/:userId", isAdmin, getUserWishlist);
router.post("/admin/:userId/:recipeId", isAdmin, addRecipeToUserWishlist);
router.delete("/admin/:userId/:recipeId", isAdmin, deleteRecipeFromWishlist);

module.exports = router;
