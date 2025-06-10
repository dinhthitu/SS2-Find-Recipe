import React, { useEffect, useState } from "react";
import api from "../api";
import RecipeCard from "../components/RecipeCard";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    api.get("/recipes") // Replace with your actual endpoint
      .then(res => setRecipes(res.data))
      .catch(() => setRecipes([]));
  }, []);

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </div>
  );
}

export default RecipeList;
