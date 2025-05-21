import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const IngredientDetails = () => {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  useEffect(() => {
    const fetchIngredientDetails = async () => {
      if (!apiKey) {
        setError("API Key is missing. Please check your .env file.");
        return;
      }

      try {
        // Fetch recipe information to get ingredients
        const recipeResponse = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`
        );
        if (!recipeResponse.ok) {
          throw new Error(`Failed to fetch recipe: ${await recipeResponse.text()}`);
        }
        const recipeData = await recipeResponse.json(); // Fixed: Use recipeResponse instead of response

        // Fetch detailed information for each ingredient
        const ingredientDetails = await Promise.all(
          recipeData.extendedIngredients.map(async (ingredient) => {
            try {
              const ingredientResponse = await fetch(
                `https://api.spoonacular.com/food/ingredients/${ingredient.id}/information?apiKey=${apiKey}&amount=${ingredient.amount}&unit=${ingredient.unit}`
              );
              if (!ingredientResponse.ok) {
                console.warn(
                  `Failed to fetch ingredient ${ingredient.id}: ${await ingredientResponse.text()}`
                );
                return { ...ingredient, nutrition: {}, possibleUnits: [], estimatedCost: {} };
              }
              const ingredientData = await ingredientResponse.json();
              return {
                ...ingredient,
                nutrition: ingredientData.nutrition || {},
                possibleUnits: ingredientData.possibleUnits || [],
                estimatedCost: ingredientData.estimatedCost || {},
              };
            } catch (err) {
              console.warn(`Error fetching ingredient ${ingredient.id}:`, err);
              return { ...ingredient, nutrition: {}, possibleUnits: [], estimatedCost: {} };
            }
          })
        );
        setIngredients(ingredientDetails);

        // Fetch price breakdown
        try {
          const priceResponse = await fetch(
            `https://api.spoonacular.com/recipes/${id}/priceBreakdown?apiKey=${apiKey}`
          );
          if (!priceResponse.ok) {
            console.warn(`Failed to fetch price breakdown: ${await priceResponse.text()}`);
            // Fallback: Calculate total cost from ingredient estimatedCost
            const totalCost = ingredientDetails.reduce(
              (sum, ing) => sum + (ing.estimatedCost?.value || 0),
              0
            );
            setPriceBreakdown({ totalCost });
          } else {
            const priceData = await priceResponse.json();
            setPriceBreakdown(priceData);
          }
        } catch (priceErr) {
          console.warn("Error fetching price breakdown:", priceErr);
          // Fallback: Calculate total cost from ingredient estimatedCost
          const totalCost = ingredientDetails.reduce(
            (sum, ing) => sum + (ing.estimatedCost?.value || 0),
            0
          );
          setPriceBreakdown({ totalCost });
        }

        setError("");
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
        console.error(err);
      }
    };

    fetchIngredientDetails();
  }, [id, apiKey]);

  if (!ingredients.length && !error) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error || !ingredients.length) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-6">{error || "No ingredients found."}</p>
        <Link
          to={`/recipe/${id}`}
          className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
        >
          Back to Recipe Details
        </Link>
      </div>
    );
  }

  const totalCost = priceBreakdown?.totalCost
    ? (priceBreakdown.totalCost / 100).toFixed(2)
    : ingredients.reduce((sum, ing) => sum + (ing.estimatedCost?.value || 0), 0) / 100 || "N/A";

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <div className="flex-1 flex flex-col items-center px-13 py-7">
        {error && (
          <p className="text-red-500 mb-6 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
        )}
        <div className="w-full max-w-4xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#B8324F] mb-4 p-3">Ingredient Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {ingredients.map((ingredient) => {
                const nutrition = ingredient.nutrition?.nutrients || [];
                const calories = nutrition.find((n) => n.name === "Calories")?.amount || "N/A";
                const fat = nutrition.find((n) => n.name === "Fat")?.amount || "N/A";
                const carbs = nutrition.find((n) => n.name === "Carbohydrates")?.amount || "N/A";
                const protein = nutrition.find((n) => n.name === "Protein")?.amount || "N/A";

                return (
                  <div
                    key={ingredient.id}
                    className="bg-[#F7F2EE] rounded-lg p-4 shadow-sm shadow-gray-400"
                  >
                    <div className="flex items-center gap-3 mb-3">
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
                        <p className="text-lg font-semibold text-gray-800">{ingredient.name}</p>
                        <p className="text-sm text-gray-600">
                          {ingredient.amount} {ingredient.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Possible Units: </span>
                        {ingredient.possibleUnits.length > 0
                          ? ingredient.possibleUnits.join(", ")
                          : "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Nutrition (per {ingredient.unit}): </span>
                        Calories: {calories} kcal, Fat: {fat}g, Carbs: {carbs}g, Protein: {protein}g
                      </p>
                      <p>
                        <span className="font-semibold">Cost (per {ingredient.unit}): </span>
                        ${(ingredient.estimatedCost?.value / 100).toFixed(2) || "N/A"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#B8324F] mb-4">Total Cost</h2>
            <p className="text-lg text-gray-600">Estimated Total Cost: ${totalCost}</p>
          </div>

          <div className="text-center mb-12">
            <Link
              to={`/recipe/${id}`}
              className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
            >
              Back to Recipe Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;