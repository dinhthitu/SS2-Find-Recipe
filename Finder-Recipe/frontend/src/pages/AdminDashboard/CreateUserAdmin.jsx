import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserAction } from '../../redux/actions/UserAction';
import toast from 'react-hot-toast';

const CreateUserAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  console.log('Sending request - Form data:', formData, 'Token:', token); // Debug
  if (!token) {
    toast.error('Please log in as admin');
    return;
  }
  const result = await dispatch(createUserAction(formData));
  if (result.success) {
    toast.success('User created successfully');
    navigate('/admin');
  } else {
    toast.error(result.message);
  }
};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-[#B8324F]">Create New User</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#B8324F]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#B8324F]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#B8324F]"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#B8324F] text-white px-4 py-2 rounded-md hover:bg-[#9A2A43]"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUserAdmin;
