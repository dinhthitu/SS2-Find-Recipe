import React, { useState } from 'react';
import axios from 'axios';

const AdminUserWishlist = () => {
  const [userId, setUserId] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [recipeId, setRecipeId] = useState('');
  const [message, setMessage] = useState('');

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`/api/wishlist/admin/${userId}`);
      setWishlist(res.data);
      setMessage('');
    } catch (err) {
      setWishlist([]);
      setMessage(err.response?.data?.message || 'Error fetching wishlist');
    }
  };

  const addRecipe = async () => {
    try {
      await axios.post(`/api/wishlist/admin/${userId}/${recipeId}`);
      setMessage('Recipe added');
      fetchWishlist();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding recipe');
    }
  };

  const removeRecipe = async (rid) => {
    try {
      await axios.delete(`/api/wishlist/admin/${userId}/${rid}`);
      setMessage('Recipe removed');
      fetchWishlist();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error removing recipe');
    }
  };

  return (
    <div>
      <h2>Admin: Manage User Wishlist</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
      />
      <button onClick={fetchWishlist}>Fetch Wishlist</button>
      <br />
      <input
        type="text"
        placeholder="Recipe ID"
        value={recipeId}
        onChange={e => setRecipeId(e.target.value)}
      />
      <button onClick={addRecipe}>Add Recipe</button>
      <div>{message}</div>
      <ul>
        {wishlist.map(recipe => (
          <li key={recipe._id}>
            {recipe.title || recipe._id}
            <button onClick={() => removeRecipe(recipe._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserWishlist;
