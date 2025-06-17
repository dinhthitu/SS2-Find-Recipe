import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

const SingleIngredientDetails = () => {
  const { ingredientId } = useParams();
  const { state } = useLocation();
  const recipeId = state?.recipeId;
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
        <p className="text-red-500 mb-6 bg-red-50 px-4 py-2 rounded-lg">
          {error || "Ingredient not found."}
        </p>
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

  // Lấy thông tin nutrition
  const nutrition = ingredient?.nutrition?.nutrients || [];
  const getAmount = (name) => {
    const n = nutrition.find((x) => x.name === name);
    return n ? n.amount : "N/A";
  };
  const calories = getAmount("Calories");
  const fat = getAmount("Fat");
  const carbs = getAmount("Carbohydrates");
  const protein = getAmount("Protein");

  return (
<<<<<<< HEAD
    // Bỏ min-h-screen để footer kéo sát hơn
    <div className="flex flex-col items-center bg-white text-gray-800">
      {/* Tên nguyên liệu */}
=======
    <div className="flex flex-col items-center bg-white text-gray-800">
>>>>>>> cead9ca8478481f50cb9c01cf97e84f9dd0a7703
      <div className="w-full max-w-6xl px-6 pt-8">
        <h1 className="text-6xl font-extrabold font-serif text-[#3E1F28] leading-tight text-center md:text-left">
          {ingredient.name}
        </h1>
      </div>

<<<<<<< HEAD
      {/* Container chính: Ảnh | Details | Nutrition */}
      <div className="w-full max-w-6xl px-6 py-8 flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-10">
        {/* Cột 1: Ảnh nguyên liệu */}
=======
      <div className="w-full max-w-6xl px-6 py-8 flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-10">
        {/* Image */}
>>>>>>> cead9ca8478481f50cb9c01cf97e84f9dd0a7703
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <div className="w-64 h-64 bg-white rounded-lg overflow-hidden">
            <img
              src={
                ingredient.image
                  ? `https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}`
                  : "https://via.placeholder.com/300"
              }
              alt={ingredient.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

<<<<<<< HEAD
        {/* Cột 2: Details (nền #FFFAF6) */}
=======
        {/* Details*/}
>>>>>>> cead9ca8478481f50cb9c01cf97e84f9dd0a7703
        <div className="flex-1 bg-[#FFFAF6] p-6 rounded-lg ring-1 ring-gray-200">
          <h2 className="text-3xl font-bold text-[#000000] mb-4">Details</h2>
          <div className="text-base text-gray-700 space-y-3">
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

<<<<<<< HEAD
        {/* Cột 3: Nutrition (mockup) */}
        <div className="w-full md:w-64 bg-[#FDEEEF] rounded-lg overflow-hidden ring-1 ring-gray-200">
          {/* Header bo tròn góc trên */}
=======
        {/* Nutrition */}
        <div className="w-full md:w-64 bg-[#FDEEEF] rounded-lg overflow-hidden ring-1 ring-gray-200">
>>>>>>> cead9ca8478481f50cb9c01cf97e84f9dd0a7703
          <div className="bg-[#7A2E3D] py-2 rounded-t-lg">
            <h3 className="text-center text-white text-lg font-semibold">
              Nutrition (per unit)
            </h3>
          </div>
<<<<<<< HEAD
          {/* Nội dung nutrition với dotted leader */}
=======
>>>>>>> cead9ca8478481f50cb9c01cf97e84f9dd0a7703
          <div className="p-4 space-y-3">
            <div className="flex items-center">
              <span className="text-gray-800">Calories</span>
              <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
              <span className="text-gray-800">
                {calories !== "N/A" ? `${calories} kcal` : "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-800">Fat</span>
              <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
              <span className="text-gray-800">{fat !== "N/A" ? `${fat} g` : "N/A"}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-800">Carbs</span>
              <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
              <span className="text-gray-800">{carbs !== "N/A" ? `${carbs} g` : "N/A"}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-800">Protein</span>
              <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
              <span className="text-gray-800">{protein !== "N/A" ? `${protein} g` : "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Hai nút ở dưới (footer) */}
=======
>>>>>>> cead9ca8478481f50cb9c01cf97e84f9dd0a7703
      <div className="flex justify-center space-x-4 mb-6">
        {recipeId ? (
          <>
            <Link
              to={`/recipe/${recipeId}`}
              className="px-6 py-3 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
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
  );
};

export default SingleIngredientDetails;
