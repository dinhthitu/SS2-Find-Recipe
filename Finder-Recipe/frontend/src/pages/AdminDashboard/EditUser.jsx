import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserAction} from '../../redux/actions/UserAction';
import toast from 'react-hot-toast';
import {EyeOff, Eye} from "lucide-react"
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.UserReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', savedRecipes: 0 });

  useEffect(() => {
    const user = users.find((u) => u.id.toString() === id);
    if (user) {
      setFormData({ 
        username: user.username || '',
        email: user.email || '',
        password: '', 
        savedRecipes: user.savedRecipes || 0
      });
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'savedRecipes' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    const updateData = { ...formData };
    if (!updateData.password) delete updateData.password;
    console.log('Sending update data:', updateData);
    const result = await dispatch(updateUserAction(id, updateData));
    console.log('Update result:', result);
    if (result.success) {
      toast.success('User updated successfully');
      navigate('/admin');
    } else {
      toast.error(result.message || 'Failed to update user');
    }
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
        <label className="block text-sm font-medium">Password (leave blank to keep unchanged)</label>

        <div className = "flex justify-between w-full border px-3 py-2 rounded">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="focus:outline-none"
            type= {showPassword ? "text" : "password"}
          />
          <button onClick = {() => setShowPassword(!showPassword)}> 
          {!showPassword ? <EyeOff size = "1.2rem" /> : <Eye size = "1.2rem" />}</button>
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
      <div className="flex justify-between mt-6 ">
        
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