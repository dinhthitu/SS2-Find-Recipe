import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const ManageRecipes = () => {
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || { username: 'abc', id: userId };
    setUser(storedUser);

    const initialRecipes = [
      { id: 'r1', userId: 'fmmfmfmmf', name: 'Healthy Blueberry Lemon Pancakes', description: 'If you want to add more lacto ovo vegetarian recipes...', totalTime: 45 },
      { id: 'r2', userId: 'fmmfmfmmf', name: 'Healthy Blueberry Lemon Pancakes', description: 'If you want to add more lacto ovo vegetarian recipes...', totalTime: 45 },
      { id: 'r3', userId: 'user2', name: 'Healthy Blueberry Lemon Pancakes', description: 'If you want to add more lacto ovo vegetarian recipes...', totalTime: 45 },
      { id: 'r4', userId: 'fmmfmfmmf', name: 'Healthy Blueberry Lemon Pancakes', description: 'If you want to add more lacto ovo vegetarian recipes...', totalTime: 45 },
      { id: 'r5', userId: 'user3', name: 'Healthy Blueberry Lemon Pancakes', description: 'If you want to add more lacto ovo vegetarian recipes...', totalTime: 45 },
      { id: 'r6', userId: 'fmmfmfmmf', name: 'Healthy Blueberry Lemon Pancakes', description: 'If you want to add more lacto ovo vegetarian recipes...', totalTime: 45 },
      { id: 'r7', userId: 'fmmfmfmmf', name: 'Healthy Blueberry Lemon Pancakes', description: 'If you want to add more lacto ovo vegetarian recipes...', totalTime: 45 },
    ];
    const userRecipes = initialRecipes.filter(recipe => recipe.userId === userId);
    setRecipes(userRecipes);
  }, [userId]);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const currentRecipes = recipes
    .filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen flex font-sans">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        {/* Search bar with user info */}
        <div className="flex justify-between items-center px-8 py-4 bg-gray-50">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter recipe name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 w-full max-w-md focus:outline-none focus:ring-1 focus:ring-[#B8324F]"
            />
            <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-1024.png"
                className="h-5 w-5"
                alt="Search"
              />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">User name: {user?.username || 'abc'}</span>
            <span className="text-sm text-gray-600">User ID: {user?.id || userId}</span>
            <span className="bg-[#B8324F] text-white px-3 py-1 rounded-full text-sm">
              {recipes.length} Recipes
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-x-auto mx-8 mt-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 font-semibold">Recipe Name</th>
                <th className="p-3 font-semibold">Description</th>
                <th className="p-3 font-semibold">Total Time</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-100">
              {currentRecipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td className="p-3">{recipe.name}</td>
                  <td className="p-3">{recipe.description}</td>
                  <td className="p-3 text-[#B8324F] font-medium">{recipe.totalTime}</td>
                  <td className="p-3 space-x-3">
                    <Link to={`/recipe/${recipe.id}`} className="text-[#B8324F] hover:underline">View</Link>
                    <button className="text-[#B8324F] hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <nav className="inline-flex items-center space-x-1">
            <button
              className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-full border ${
                  currentPage === page ? 'bg-[#B8324F] text-white' : 'bg-white text-gray-600'
                } hover:bg-gray-100`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
            >
              &gt;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ManageRecipes;