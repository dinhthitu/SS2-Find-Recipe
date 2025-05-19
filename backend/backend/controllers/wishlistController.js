const { User, Recipe } = require('../models');

/**
 * @desc    Get user's wishlist
 * @route   GET /wishlist
 * @access  Private
 */
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{
        association: 'wishlist',
        through: { attributes: [] }, // Exclude join table attributes
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] } // Customize recipe fields
      }],
      attributes: [] // Only return wishlist array
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      count: user.wishlist.length,
      data: user.wishlist
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching wishlist',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Add recipe to wishlist
 * @route   POST /wishlist/:recipeId
 * @access  Private
 */
exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const recipe = await Recipe.findByPk(req.params.recipeId);
    
    if (!recipe) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recipe not found' 
      });
    }

    // Check if already in wishlist
    const existing = await user.hasWishlist(recipe);
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Recipe already in wishlist' 
      });
    }

    await user.addWishlist(recipe);
    
    const updatedWishlist = await user.getWishlist({
      attributes: ['id', 'title', 'imageUrl'] // Only return essential fields
    });

    res.status(200).json({
      success: true,
      message: 'Recipe added to wishlist',
      count: updatedWishlist.length,
      data: updatedWishlist
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while adding to wishlist',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Remove recipe from wishlist
 * @route   DELETE /wishlist/:recipeId
 * @access  Private
 */
exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const recipe = await Recipe.findByPk(req.params.recipeId);
    
    if (!recipe) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recipe not found' 
      });
    }

    const wasInWishlist = await user.hasWishlist(recipe);
    if (!wasInWishlist) {
      return res.status(400).json({ 
        success: false, 
        message: 'Recipe not in wishlist' 
      });
    }

    await user.removeWishlist(recipe);
    
    const updatedWishlist = await user.getWishlist({
      attributes: ['id', 'title', 'imageUrl']
    });

    res.status(200).json({
      success: true,
      message: 'Recipe removed from wishlist',
      count: updatedWishlist.length,
      data: updatedWishlist
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while removing from wishlist',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Clear entire wishlist
 * @route   DELETE /wishlist
 * @access  Private
 */
exports.clearWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    // Get count before clearing
    const count = await user.countWishlist();
    
    if (count === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'Wishlist is already empty',
        count: 0,
        data: []
      });
    }

    await user.setWishlist([]); // Clear all associations
    
    res.status(200).json({
      success: true,
      message: `Cleared ${count} items from wishlist`,
      count: 0,
      data: []
    });
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while clearing wishlist',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Check if recipe is in wishlist
 * @route   GET /wishlist/:recipeId/check
 * @access  Private
 */
exports.checkInWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const recipe = await Recipe.findByPk(req.params.recipeId);
    
    if (!recipe) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recipe not found' 
      });
    }

    const isInWishlist = await user.hasWishlist(recipe);
    
    res.status(200).json({
      success: true,
      isInWishlist,
      recipeId: recipe.id
    });
  } catch (error) {
    console.error('Error checking wishlist:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while checking wishlist',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get wishlist count
 * @route   GET /wishlist/count
 * @access  Private
 */
exports.getWishlistCount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const count = await user.countWishlist();
    
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error getting wishlist count:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while getting wishlist count',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};