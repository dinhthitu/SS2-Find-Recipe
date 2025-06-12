import React, { useEffect, useState } from "react";
import axios from "axios";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's own recipes
  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await axios.get("/api/recipes/my");
        setRecipes(res.data);
      } catch (err) {
        console.error("Failed to fetch recipes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRecipes();
  }, []);

  // Delete a recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await axios.delete(`/api/recipes/${id}`);
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete recipe.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Recipes</h2>
      {recipes.length === 0 ? (
        <p>You have not created any recipes yet.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <strong>{recipe.title}</strong>
              <button onClick={() => handleDelete(recipe._id)} style={{ marginLeft: 10 }}>
                Delete
              </button>
              {/* You can add Edit functionality here if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRecipes;
