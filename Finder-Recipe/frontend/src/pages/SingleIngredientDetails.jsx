import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

const SingleIngredientDetails = () => {
  const { ingredientId } = useParams();
  const { state } = useLocation(); // Access recipeId from navigation state
  const recipeId = state?.recipeId; // Get recipeId from state
  const [ingredient, setIngredient] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  useEffect(() => {
    const fetchIngredientDetails = async () => {
      if (!apiKey) {
        setError("API Key is missing. Please check your .env file.");
        return;
      }

      try {
        const response = await fetch(
          `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?apiKey=${apiKey}&amount=1`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch ingredient: ${await response.text()}`);
        }
        const data = await response.json();
        setIngredient(data);
        setError("");
      } catch (err) {
        setError(`Failed to fetch ingredient details: ${err.message}`);
        console.error(err);
      }
    };

    fetchIngredientDetails();
  }, [ingredientId, apiKey]);

  if (!ingredient && !error) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error || !ingredient) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-6">{error || "Ingredient not found."}</p>
        {recipeId && (
          <Link
            to={`/recipe/${recipeId}`}
            className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
          >
            Back to Recipe
          </Link>
        )}
      </div>
    );
  }

  const nutrition = ingredient?.nutrition?.nutrients || [];
  const calories = nutrition.find((n) => n.name === "Calories")?.amount || "N/A";
  const fat = nutrition.find((n) => n.name === "Fat")?.amount || "N/A";
  const carbs = nutrition.find((n) => n.name === "Carbohydrates")?.amount || "N/A";
  const protein = nutrition.find((n) => n.name === "Protein")?.amount || "N/A";

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex-1 flex flex-col items-center px-13 py-7">
        {error && (
          <p className="text-red-500 mb-6 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        )}
        {ingredient && (
          <div className="w-full max-w-4xl">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#000000] mb-4">
                {ingredient.name}
              </h1>
              <img
                src={
                  ingredient.image
                    ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`
                    : "https://via.placeholder.com/100"
                }
                alt={ingredient.name}
                className="w-full max-w-md h-64 object-cover rounded-lg mx-auto"
              />
            </div>

            <div className="mb-12 bg-[#F7F2EE] rounded-lg p-5 shadow-sm shadow-gray-400">
              <h2 className="text-3xl font-bold text-[#B8324F] mb-4">Details</h2>
              <div className="text-sm text-gray-600 space-y-3">
                <p>
                  <span className="font-semibold">Possible Units: </span>
                  {ingredient.possibleUnits?.length > 0
                    ? ingredient.possibleUnits.join(", ")
                    : "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Estimated Cost (per unit): </span>
                  ${(ingredient.estimatedCost?.value / 100).toFixed(2) || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Substitute Names: </span>
                  {ingredient.substitutes?.length > 0
                    ? ingredient.substitutes.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="mb-12 p-6 shadow-sm/30 shadow-gray-600">
              <h2 className="text-3xl font-bold text-[#B8324F] mb-7">Nutrition (per unit)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
              </div>
            </div>

            <div className="text-center mb-12">
              {recipeId ? (
                <>
                  <Link
                    to={`/recipe/${recipeId}`}
                    className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 mr-4"
                  >
                    Back to Recipe
                  </Link>
                  <Link
                    to={`/ingredients/${recipeId}`}
                    className="px-6 py-3 bg-[#F39AA7] text-gray-800 rounded-lg text-sm font-semibold hover:bg-[#f3a4b0]"
                  >
                    View All Ingredients
                  </Link>
                </>
              ) : (
                <p className="text-gray-600">No recipe context available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleIngredientDetails;