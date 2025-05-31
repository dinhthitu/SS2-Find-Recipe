import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // Kiểm tra đăng nhập

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await api.get("/wishList");
      setWishlist(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (recipeId) => {
    try {
      await api.delete(`/wishList/${recipeId}`);
      await fetchWishlist();
    } catch (err) {
      setError(err.message || "Failed to remove recipe");
    }
  };

  const clearWishlist = async () => {
    try {
      await api.delete("/wishList");
      await fetchWishlist();
    } catch (err) {
      setError(err.message || "Failed to clear wishlist");
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-gray-800">
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-gray-600 text-lg mb-4">Please log in to view your wishlist.</p>
          <Link
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full text-sm shadow-md"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      

      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Your Wishlist</h1>
            <div className="flex items-center">
              <p className="text-gray-600 text-lg mr-4">
                {wishlist.length} Recipe{wishlist.length !== 1 ? "s" : ""}
              </p>
              <button
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Clear Wishlist
              </button>
            </div>
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-4">Wishlist is empty.</p>
              <Link
                to="/SearchRecipes"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full text-sm shadow-md"
              >
                Explore Recipes
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {wishlist.map((recipe) => {
                  const nutrition = recipe.nutrition?.nutrients || [];
                  const calories = nutrition.find((n) => n.name === "Calories")?.amount || "N/A";
                  const fat = nutrition.find((n) => n.name === "Fat")?.amount || "N/A";
                  const carbs = nutrition.find((n) => n.name === "Carbohydrates")?.amount || "N/A";

                  return (
                    <div
                      key={recipe.id}
                      className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col"
                    >
                      <img
                        src={recipe.imageUrl || "https://via.placeholder.com/300"}
                        alt={recipe.title}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                      <p className="text-sm text-gray-600 mb-4">
                        Approx. {calories} calories per serving, {fat}g fat, {carbs}g carbs.
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <Link
                          to={`/recipe/${recipe.id}`}
                          className="px-4 py-2 bg-[#F39AA7] text-gray-800 rounded-full text-sm font-semibold hover:bg-[#f3a4b0]"
                        >
                          See Recipe
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(recipe.id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center mt-4">
                <button className="mx-1 px-2 text-gray-600">1</button>
                <button className="mx-1 px-2 bg-red-500 text-white rounded-full">2</button>
                <button className="mx-1 px-2 text-gray-600">3</button>
                <button className="mx-1 px-2 text-gray-600">4</button>
                <button className="mx-1 px-2 text-gray-600">▶</button>
              </div>
            </>
          )}
        </div>
      </main>

      
    </div>
  );
};

export default Wishlist;
