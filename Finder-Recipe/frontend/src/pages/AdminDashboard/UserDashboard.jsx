import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUserAction } from '../../redux/actions/UserAction';
import toast from 'react-hot-toast';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="bg-white p-4 rounded-md shadow-md max-w-xs w-full text-center pointer-events-auto"
      >
        <p className="mb-4 text-base">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-[#B8324F] text-white px-3 py-1.5 rounded hover:bg-[#94263a] text-sm"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 px-3 py-1.5 rounded hover:bg-gray-400 text-sm"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = ({ users, usersLoading }) => {
  const dispatch = useDispatch();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filter users by search term (id or username)
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleDeleteUser = async (id) => {
    const result = await dispatch(deleteUserAction(id));
    if (result.success) {
      toast.success('User deleted successfully');
    } else {
      toast.error(result.message);
    }
    setConfirmDeleteId(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Search bar */}
      <div className="flex justify-between items-center mb-4 px-8 mt-5">
        <div className="flex items-center w-1/2 gap-2">
          <input
            type="text"
            placeholder="Enter name or user id to find a user"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handlePageChange(1);
            }}
            className="border border-gray-300 rounded-full px-5 py-2 w-full max-w-md focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <img
              src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-strong-1024.png"
              className="max-w-28 h-6 w-6"
              alt="Search"
            />
          </button>
        </div>
        <div>
          <Link
            to="/admin/create"
            className="p-1.5 border border-gray-600 text-gray-800 font-semibold text-base rounded-4xl hover:bg-[#B8324F] transition-colors duration-200 hover:text-white hover:border-none"
          >
            Create User
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto mx-8">
        {usersLoading ? (
          <div className="p-4 text-center text-gray-500">Loading users...</div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">User Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Total saved recipes</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-100">
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 text-[#B8324F] font-medium">{user.savedRecipes}</td>
                    <td className="p-3 space-x-3">
                      <a href={`/manage-recipes/${user.id}`} className="text-[#B8324F] hover:underline">
                        Manage Recipes
                      </a>
                      <Link to={`/admin/edit/${user.id}`} className="text-[#B8324F] hover:underline">
                        Edit
                      </Link>
                      <button
                        onClick={() => setConfirmDeleteId(user.id)}
                        className="text-[#B8324F] hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="inline-flex items-center space-x-1">
          <button
            className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
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
            className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          >
            &gt;
          </button>
        </nav>
      </div>

      {/* Confirm delete modal */}
      {confirmDeleteId !== null && (
        <ConfirmModal
          message="Do you want to delete?"
          onConfirm={() => handleDeleteUser(confirmDeleteId)}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </>
  );
};

export default UserDashboard;