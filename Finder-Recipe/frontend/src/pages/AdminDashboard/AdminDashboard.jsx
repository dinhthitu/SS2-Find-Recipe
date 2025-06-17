
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllUsersAction } from '../../redux/actions/UserAction';
import Sidebar from '../../components/Sidebar';
import CreateUserAdmin from './CreateUserAdmin';
import UserDashboard from './UserDashboard';
import EditUser from './EditUser';
import toast from 'react-hot-toast';
import ManageRecipes from './ManageRecipes';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, users, usersLoading, usersError } = useSelector((state) => state.UserReducer);
  console.log('AdminDashboard state:', { isAuthenticated, user, users, usersLoading, usersError });
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user && user.role !== 'admin') {
      toast.error('Access denied. Admin role required.');
      navigate('/');
    } else {
      dispatch(loadAllUsersAction());
    }
  }, [dispatch, isAuthenticated, user, navigate]);

  useEffect(() => {
    if (usersError) {
      toast.error(usersError);
      dispatch({ type: 'ClearErrors' });
    }
  }, [usersError, dispatch]);

  return (
    <div className="min-h-screen flex font-sans">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        <Routes>
          <Route
            index
            element={<UserDashboard users={users} usersLoading={usersLoading} />}
          />
          <Route path="/create" element={<CreateUserAdmin />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="manage-recipes/:userId" element={<ManageRecipes />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
