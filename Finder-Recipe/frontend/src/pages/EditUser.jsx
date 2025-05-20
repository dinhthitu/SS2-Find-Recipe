// EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = ({ users, setUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', savedRecipes: 0 });

  useEffect(() => {
    const user = users.find(u => u.id.toString() === id);
    if (user) {
      setFormData({ ...user });
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "savedRecipes" ? parseInt(value) || 0 : value
    }));
  };

  const handleSave = () => {
    const updatedUsers = users.map(u => u.id.toString() === id ? formData : u);
    setUsers(updatedUsers);
    navigate('/admin'); // hoặc đường dẫn tương ứng
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
         <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Saved Recipes</label>
          <input
            type="number"
            name="savedRecipes"
            value={formData.savedRecipes}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6 gap-2">
        <button
          onClick={() => navigate('/admin')}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#B8324F] text-white rounded hover:bg-[#94263a]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUser;
