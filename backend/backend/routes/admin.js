
const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const { getUsers, createUser, getUserRecipes } = require('../controllers/adminController');
const { updateUser, deleteUser } = require('../controllers/userController');

router.use(isAdmin);
const { deleteRecipeFromWishlist } = require('../controllers/wishlistController');

router.delete('/users/:userId/recipes/:recipeId', deleteRecipeFromWishlist);
router.post('/users/create', createUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users/:userId/recipes', getUserRecipes);


module.exports = router;
