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

    // TODO: Replace with API call in production
    const initialRecipes = [
      { id: 'r1', userId: 'fmmfmfmmf', name: 'Healthy Blueberry Lemon Pancakes', description: 'If you want to add more lacto ovo vegetarian recipes...', totalTime: 45 },
      { id: 'r2', userId: 'fmmfmfmmf', name: 'Avocado Toast', description: 'A quick and healthy breakfast...', totalTime: 10 },
      { id: 'r3', userId: 'user2', name: 'Classic Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing...', totalTime: 20 },
      { id: 'r4', userId: 'fmmfmfmmf', name: 'Spaghetti Bolognese', description: 'Traditional Italian pasta with meat sauce...', totalTime: 60 },
      { id: 'r5', userId: 'user3', name: 'Vegan Buddha Bowl', description: 'A nourishing bowl of grains and veggies...', totalTime: 30 },
      { id: 'r6', userId: 'fmmfmfmmf', name: 'Berry Smoothie', description: 'Refreshing smoothie with mixed berries...', totalTime: 5 },
      { id: 'r7', userId: 'fmmfmfmmf', name: 'Grilled Chicken', description: 'Juicy grilled chicken breast...', totalTime: 25 },
    ];
    const userRecipes = initialRecipes.filter(recipe => recipe.userId === userId);
    setRecipes(userRecipes);
  }, [userId]);

  const totalPages = Math.ceil(
    recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase())).length / recipesPerPage
  );
  const currentRecipes = recipes
    .filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // Figma-inspired color palette
  const accent = "#B8324F";
  const accentLight = "#F7D6DF";
  const accentDark = "#7A2233";

  return (
    <div className="min-h-screen flex font-sans bg-[#F9F5F3]">
      <Sidebar />
      <div className="flex-1">
        {/* Search bar and user info */}
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 bg-white shadow-sm">
          <div className="flex items-center w-full md:w-auto space-x-2">
            <input
              type="text"
              placeholder="Search recipe name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#B8324F] transition"
            />
            <button className="bg-[#F7D6DF] p-2 rounded-full hover:bg-[#B8324F] group transition">
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-1024.png"
                className="h-5 w-5 group-hover:invert"
                alt="Search"
              />
            </button>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-600 font-medium">
              <span className="font-bold text-[#B8324F]">User:</span> {user?.username || 'abc'}
            </span>
            <span className="text-sm text-gray-600 font-medium">
              <span className="font-bold text-[#B8324F]">ID:</span> {user?.id || userId}
            </span>
            <span className="bg-[#B8324F] text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
              {recipes.length} Recipes
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-xl overflow-x-auto mx-8 mt-8">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F7D6DF] text-[#7A2233]">
              <tr>
                <th className="p-4 font-bold">Recipe Name</th>
                <th className="p-4 font-bold">Description</th>
                <th className="p-4 font-bold">Total Time</th>
                <th className="p-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-[#F7D6DF]">
              {currentRecipes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-400">No recipes found.</td>
                </tr>
              ) : (
                currentRecipes.map((recipe) => (
                  <tr key={recipe.id} className="hover:bg-[#F9F5F3] transition">
                    <td className="p-4 font-semibold">{recipe.name}</td>
                    <td className="p-4">{recipe.description}</td>
                    <td className="p-4 text-[#B8324F] font-medium">{recipe.totalTime} min</td>
                    <td className="p-4 space-x-3">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="inline-block px-3 py-1 rounded-full bg-[#F7D6DF] text-[#B8324F] font-semibold hover:bg-[#B8324F] hover:text-white transition"
                      >
                        View
                      </Link>
                      <button
                        className="inline-block px-3 py-1 rounded-full bg-white border border-[#B8324F] text-[#B8324F] font-semibold hover:bg-[#B8324F] hover:text-white transition"
                        // TODO: Add delete handler
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 mb-8">
          <nav className="inline-flex items-center space-x-1">
            <button
              className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-[#F7D6DF] transition"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded-full border font-semibold transition ${
                  currentPage === page
                    ? 'bg-[#B8324F] text-white border-[#B8324F]'
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-[#F7D6DF]'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-[#F7D6DF] transition"
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
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
