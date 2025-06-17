const { User, Recipe } = require('../models');
const { Op } = require('sequelize');

exports.getUsers = async (req, res) => {
  const users = await User.findAll({
  attributes: ['id', 'username', 'email', 'role'],
  include: [
    {
      model: Recipe,
      as: 'wishlist',
      attributes: ['id'],
      through: { attributes: [] },
      where: { isDeleted: false },
      required: false
    }
  ]
});
const usersWithRecipeCount = users.map(user => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  savedRecipes: user.wishlist?.length || 0
}));

res.json({ success: true, users: usersWithRecipeCount });

};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {
      include: [{
        model: Recipe,
        as: 'wishlist',
        through: { attributes: [] }, 
        where: { isDeleted: false },
        required: false,
        attributes: ['id', 'spoonacularId', 'title', 'description', 'imageUrl']
      }],
      attributes: ['id', 'username', 'email', 'role'] 
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      recipes: user.wishlist,
      count: user.wishlist.length,
      savedRecipes: user.savedRecipes 
    });
  } catch (error) {
    console.error('Error fetching user wishlist:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};