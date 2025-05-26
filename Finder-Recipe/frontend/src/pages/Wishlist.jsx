import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api.js';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await api.get('/wishList');
      setWishlist(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (recipeId) => {
    try {
      await api.delete(`/wishList/${recipeId}`);
      await fetchWishlist();
    } catch (err) {
      setError(err.message || 'Failed to remove recipe');
    }
  };

  const clearWishlist = async () => {
    try {
      await api.delete('/wishList');
      await fetchWishlist();
    } catch (err) {
      setError(err.message || 'Failed to clear wishlist');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-gray-800">
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-gray-800">
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <Link
            to="/SearchRecipes"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full text-sm shadow-md mt-4"
          >
            Explore Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Your Wishlist
        </h1>
        {wishlist.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-6">
              Your wishlist is empty. Start adding recipes to your wishlist!
            </p>
            <Link
              to="/SearchRecipes"
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full text-sm shadow-md"
            >
              Explore Recipes
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 text-lg">
                You have {wishlist.length} recipe{wishlist.length > 1 ? 's' : ''} in your wishlist.
              </p>
              <button
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Clear Wishlist
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col"
                >
                  <img
                    src={recipe.imageUrl || 'https://via.placeholder.com/300'}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {recipe.description || 'No description available.'}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="text-purple-600 hover:underline"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(recipe.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;