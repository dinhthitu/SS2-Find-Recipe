import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { getUserApi } from "../utils/api";
import clock from "../assets/clock.png";
import people from "../assets/people.png";
import heartIcon from "../assets/heart-icon.png";
import share from "../assets/share.png";
import toast from "react-hot-toast"; // Add this import

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);

  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const checkWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to check wishlist.");
        return;
      }
      const response = await api.get(`/wishlist/wishlist/${id}/check`);
      setIsInWishlist(response.isInWishlist);
    } catch (err) {
      console.error("Error checking wishlist:", err);
      setError("Failed to check wishlist. Please try again.");
    }
  };

  const toggleWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to update wishlist.");
        toast.error("Please login to update wishlist.");
        return;
      }
      if (isInWishlist) {
        const response = await api.delete(`/wishlist/wishlist/${id}`);
        setIsInWishlist(false);
        toast.success(response.message || "Recipe removed from wishlist");
      } else {
        const response = await api.post(`/wishlist/wishlist/${id}`);
        setIsInWishlist(true);
        toast.success(response.message || "Recipe added to wishlist");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update wishlist";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!apiKey) {
        setError("API Key is missing. Please check your .env file.");
        return;
      }

      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${await response.text()}`);
        }
        const data = await response.json();
        setRecipe(data);

        try {
          const similarResponse = await fetch(
            `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}&number=4`
          );
          if (!similarResponse.ok) {
            console.warn(`Failed to fetch similar recipes: ${await similarResponse.text()}`);
            setSimilarRecipes([]);
          } else {
            const similarData = await similarResponse.json();
            const uniqueSimilarData = Array.from(
              new Map(similarData.map((item) => [item.id, item])).values()
            );
            const comparableRecipesWithNutrition = await Promise.all(
              uniqueSimilarData.map(async (similarRecipe) => {
                const nutritionResponse = await fetch(
                  `https://api.spoonacular.com/recipes/${similarRecipe.id}/information?apiKey=${apiKey}&includeNutrition=true`
                );
                if (!nutritionResponse.ok) {
                  console.warn(`Failed to fetch nutrition for recipe ${similarRecipe.id}`);
                  return { ...similarRecipe, nutrition: { nutrients: [] } };
                }
                const nutritionData = await nutritionResponse.json();
                return { ...similarRecipe, nutrition: nutritionData.nutrition };
              })
            );
            setSimilarRecipes(comparableRecipesWithNutrition || []);
          }
        } catch (similarErr) {
          console.warn("Error fetching similar recipes:", similarErr);
          setSimilarRecipes([]);
        }

        setError("");
      } catch (err) {
        setError(`Failed to fetch recipe details: ${err.message}`);
        console.error(err);
      }
    };

    fetchRecipeDetails();
    checkWishlist();
  }, [id, apiKey]);

  const handleShareClick = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    } catch (err) {
      console.error("Failed to copy the link:", err);
      alert("Failed to copy the link. Please copy it manually.");
    }
  };

  if (!recipe && !error) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error || !recipe) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-6">{error || "Recipe not found."}</p>
        <Link
          to="/SearchRecipes"
          className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
        >
          Back to Search
        </Link>
      </div>
    );
  }

  const nutrition = recipe?.nutrition?.nutrients || [];
  const calories = nutrition.find((n) => n.name === "Calories")?.amount || "N/A";
  const fat = nutrition.find((n) => n.name === "Fat")?.amount || "N/A";
  const carbs = nutrition.find((n) => n.name === "Carbohydrates")?.amount || "N/A";
  const protein = nutrition.find((n) => n.name === "Protein")?.amount || "N/A";
  const sugar = nutrition.find((n) => n.name === "Sugar")?.amount || "N/A";

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex-1 flex flex-col items-center px-13 py-7">
        {error && <p className="text-red-500 mb-6 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
        {recipe && (
          <div className="w-full">
            <div className="w-full mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#000000] mb-4">
                {recipe.title}
              </h1>
              <img
                src={recipe.image || "https://via.placeholder.com/1440x400"}
                alt={recipe.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
              <div className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-5 text-sm text-gray-600">
                    <div className="gap-1 flex flex-row">
                      <img src={clock} className="w-5 h-5" />
                      <span>Total {recipe.readyInMinutes || 45} minutes</span>
                    </div>
                    <div className="gap-1 flex flex-row">
                      <img src={people} className="w-5 h-5" />
                      <span>Servings: {recipe.servings || 2} people</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={toggleWishlist}
                      className={`flex items-center gap-1 ${isInWishlist ? "text-red-600" : "text-gray-600 hover:text-red-600"}`}
                    >
                      <img src={heartIcon} className="w-5 h-5" />
                      <span>{isInWishlist ? "Saved" : "Save"}</span>
                    </button>
                    <button
                      onClick={handleShareClick}
                      className="flex items-center gap-1 text-gray-600 hover:text-red-600"
                    >
                      <img src={share} className="w-5 h-5 cursor-pointer" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-[#B8324F] p-3">Ingredients</h2>
                <Link
                  to={`/ingredients/${id}`}
                  className="px-4 py-2 bg-[#F39AA7] text-gray-800 rounded-full text-sm font-semibold hover:bg-[#f3a4b0]"
                >
                  View All Ingredient Details
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recipe.extendedIngredients?.map((ingredient) => (
                  <Link
                    key={ingredient.id}
                    to={`/ingredient/${ingredient.id}`}
                    state={{ recipeId: id }}
                    className="flex items-center gap-3 hover:bg-[#F7F2EE] p-2 rounded-lg transition-colors duration-200"
                  >
                    <img
                      src={
                        ingredient.image
                          ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`
                          : "https://via.placeholder.com/100"
                      }
                      alt={ingredient.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{ingredient.name}</p>
                      <p className="text-sm text-gray-600">
                        {ingredient.amount} {ingredient.unit}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-12 bg-[#F7F2EE] rounded-lg p-5 shadow-sm shadow-gray-400">
              <h2 className="text-3xl font-bold text-[#B8324F] mb-4">Instructions</h2>
              <ol className="space-y-4 text-gray-600">
                {recipe.analyzedInstructions?.[0]?.steps?.map((step) => (
                  <li key={step.number} className="flex items-start gap-3 py-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#621829] text-white font-bold text-sm">
                      {step.number}
                    </span>
                    <span className="text-sm flex-1 border-b border-[#D0CCC9] max-w-fit">{step.step}</span>
                  </li>
                )) || <p className="text-gray-600">No instructions available.</p>}
              </ol>
            </div>

            <div className="mb-12 p-6 shadow-sm/30 shadow-gray-600">
              <h2 className="text-3xl font-bold text-[#B8324F] mb-7">Nutrition</h2>
              <div className="grid grid-cols-5 xl:grid-cols-9 gap-4">
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-bold text-[#A6354E]">{calories} kcal</p>
                  <p className="text-sm text-gray-800">Calories</p>
                </div>
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-semibold text-[#A6354E]">{fat}g</p>
                  <p className="text-sm text-gray-800">Fat</p>
                </div>
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-semibold text-[#A6354E]">{carbs}g</p>
                  <p className="text-sm text-gray-800">Carbs</p>
                </div>
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-semibold text-[#A6354E]">{protein}g</p>
                  <p className="text-sm text-gray-800">Protein</p>
                </div>
                <div className="text-center border-1 border-[#A6354E] rounded-lg p-2">
                  <p className="text-lg font-semibold text-[#A6354E]">{sugar}g</p>
                  <p className="text-sm text-gray-800">Sugar</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-7 p-6">Similar Recipes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarRecipes.map((similarRecipe) => {
                  const nutrition = similarRecipe.nutrition?.nutrients || [];
                  const calories = nutrition.find((n) => n.name === "Calories")?.amount || "N/A";
                  const fat = nutrition.find((n) => n.name === "Fat")?.amount || "N/A";
                  const carbs = nutrition.find((n) => n.name === "Carbohydrates")?.amount || "N/A";

                  return (
                    <div
                      key={similarRecipe.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col min-h-[340px]"
                    >
                      <img
                        src={
                          similarRecipe.id
                            ? `https://spoonacular.com/recipeImages/${similarRecipe.id}-312x231.jpg`
                            : "https://via.placeholder.com/300"
                        }
                        alt={similarRecipe.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 overflow-hidden">
                          {similarRecipe.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 flex-1">
                          Approx. {calories} calories per serving, {fat}g fat, {carbs}g carbs.
                        </p>
                        <div className="flex justify-between items-center mt-auto">
                          <Link
                            to={`/recipe/${similarRecipe.id}`}
                            className="px-4 py-2 bg-[#F39AA7] text-gray-800 rounded-full text-sm font-semibold hover:bg-[#f3a4b0]"
                          >
                            See Recipe
                          </Link>
                          <button className="flex items-center gap-1 text-gray-600 hover:text-red-500">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              ></path>
                            </svg>
                            <span className="text-sm">9</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center mb-12">
              <Link
                to="/SearchRecipes"
                className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
              >
                Explore More Recipes
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;