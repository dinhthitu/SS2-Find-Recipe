import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserRecipesAction, deleteUserRecipeAction } from '../../redux/actions/UserAction';


const ManageRecipes = () => {
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { recipes, recipesLoading, recipesError } = useSelector((state) => state.UserReducer);


  useEffect(() => {
    console.log('Loading recipes for userId:', userId);
    dispatch(loadUserRecipesAction(userId));
  }, [dispatch, userId]);
  

  const userRecipes = recipes[userId] || [];
  const totalPages = Math.ceil(userRecipes.length / recipesPerPage);
  const currentRecipes = userRecipes
    .filter(recipe => recipe && recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage);

  const handleDeleteRecipe = (recipeId) => {
  if (window.confirm("Are you sure you want to delete this recipe?")) {
    dispatch(deleteUserRecipeAction(userId, recipeId));
  }
  };

  const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const truncateDescription = (text, maxLength) => {
    if (!text) return 'No description';
    const plainText = stripHtml(text);
    return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
  };
  return (
    <div className="min-h-screen flex font-sans">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <div className="flex justify-between items-center px-8 py-4 bg-gray-50">
          
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-x-auto mx-8 mt-4">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 font-semibold">Recipe Name</th>
                <th className="p-3 font-semibold">Description</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-100">
              {recipesLoading ? (
                <tr><td colSpan="4" className="p-3 text-center">Loading...</td></tr>
              ) : recipesError ? (
                <tr><td colSpan="4" className="p-3 text-center text-red-500">{recipesError}</td></tr>
              ) : currentRecipes.length === 0 ? (
                <tr><td colSpan="4" className="p-3 text-center">No recipes found</td></tr>
              ) : (
                currentRecipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td className="p-3">{recipe.title || 'Unnamed Recipe'}</td>
                    <td className="p-3" title={recipe.description || 'No description'}>
                     {truncateDescription(recipe.description || '', 100)}
                    </td>                    
                    <td className="p-3 space-x-3">
                      <Link to={`/recipe/${recipe.id}`} className="text-[#B8324F] hover:underline">View</Link>
                      <button onClick={() => handleDeleteRecipe(recipe.id)} className="text-[#B8324F] hover:underline">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <nav className="inline-flex items-center space-x-1">
            <button
              className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
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