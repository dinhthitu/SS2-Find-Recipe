const axios = require('axios');
const { User, Recipe } = require('../models');
const apiKey = process.env.SPOONACULAR_API_KEY;

const saveRecipeIfNotExists = async (recipeId) => {
  let recipe = await Recipe.findOne({ where: { spoonacularId: recipeId } });
  if (!recipe) {
    const spoonacularResponse = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`
    );
    const recipeData = spoonacularResponse.data;

    recipe = await Recipe.create({
      spoonacularId: recipeData.id,
      title: recipeData.title,
      description: recipeData.summary || '',
      ingredients: JSON.stringify(recipeData.extendedIngredients) || '',
      steps: JSON.stringify(recipeData.analyzedInstructions) || '',
      imageUrl: recipeData.image || '',
      isDeleted: false,
      userId: null,
    });
  }
  return recipe;
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{
        association: 'wishlist',
        through: { attributes: [] },
        where: { isDeleted: false },
        attributes: ['id', 'spoonacularId', 'title', 'description', 'imageUrl']
      }],
      attributes: []
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fetch nutrition data for each recipe
    const wishlistWithNutrition = await Promise.all(
      user.wishlist.map(async (recipe) => {
        try {
          const spoonacularResponse = await axios.get(
            `https://api.spoonacular.com/recipes/${recipe.spoonacularId}/information?apiKey=${apiKey}&includeNutrition=true`
          );
          const recipeData = spoonacularResponse.data;
          return {
            ...recipe.toJSON(),
            nutrition: recipeData.nutrition || { nutrients: [] }
          };
        } catch (err) {
          console.error(`Error fetching nutrition for recipe ${recipe.spoonacularId}:`, err);
          return {
            ...recipe.toJSON(),
            nutrition: { nutrients: [] }
          };
        }
      })
    );

    res.status(200).json({
      success: true,
      count: wishlistWithNutrition.length,
      data: wishlistWithNutrition
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

exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const recipeId = req.params.recipeId;

    const recipe = await saveRecipeIfNotExists(recipeId);
    
    const existing = await user.hasWishlist(recipe);
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Recipe already in wishlist' 
      });
    }

    await user.addWishlist(recipe);
    
    const updatedWishlist = await user.getWishlist({
      attributes: ['id', 'title', 'imageUrl']
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

exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const recipe = await Recipe.findOne({ where: { spoonacularId: req.params.recipeId } });
    
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

exports.clearWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    const count = await user.countWishlist();
    
    if (count === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'Wishlist is already empty',
        count: 0,
        data: []
      });
    }

    await user.setWishlist([]);
    
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

exports.checkInWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const recipe = await Recipe.findOne({ where: { spoonacularId: req.params.recipeId } });
    
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
// exports.getWishlist = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id, {
//       include: [{
//         association: 'wishlist',
//         through: { attributes: [] },
//         where: { isDeleted: false },
//         attributes: ['id', 'spoonacularId', 'title', 'description', 'imageUrl'] // Add spoonacularId
//       }],
//       attributes: []
//     });

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Optionally fetch nutrition data for each recipe
//     const wishlistWithNutrition = await Promise.all(
//       user.wishlist.map(async (recipe) => {
//         try {
//           const spoonacularResponse = await axios.get(
//             `https://api.spoonacular.com/recipes/${recipe.spoonacularId}/information?apiKey=${apiKey}&includeNutrition=true`
//           );
//           const recipeData = spoonacularResponse.data;
//           return {
//             ...recipe.toJSON(),
//             nutrition: recipeData.nutrition || { nutrients: [] }
//           };
//         } catch (err) {
//           console.error(`Error fetching nutrition for recipe ${recipe.spoonacularId}:`, err);
//           return {
//             ...recipe.toJSON(),
//             nutrition: { nutrients: [] }
//           };
//         }
//       })
//     );

//     res.status(200).json({
//       success: true,
//       count: wishlistWithNutrition.length,
//       data: wishlistWithNutrition
//     });
//   } catch (error) {
//     console.error('Error fetching wishlist:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while fetching wishlist',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };
