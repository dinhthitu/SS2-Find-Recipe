import React, { useEffect, useState } from "react";
import api from "../api"; // Adjust path if needed

function RecipeCard({ recipe }) {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    api.get(`/wishlist/wishlist/check/${recipe.id}`)
      .then(res => setInWishlist(res.data.inWishlist))
      .catch(() => setInWishlist(false));
  }, [recipe.id]);

  const handleWishlist = async () => {
    if (inWishlist) {
      await api.delete(`/wishlist/wishlist/${recipe.id}`);
      setInWishlist(false);
    } else {
      await api.post(`/wishlist/wishlist/${recipe.id}`);
      setInWishlist(true);
    }
  };

  return (
    <div>
      <h3>{recipe.title}</h3>
      <button onClick={handleWishlist}>
        {inWishlist ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
      </button>
    </div>
  );
}

export default RecipeCard;
