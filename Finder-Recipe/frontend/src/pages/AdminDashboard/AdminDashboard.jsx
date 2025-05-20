import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import CreateUserAdmin from '../CreateUserAdmin';
import UserDashboard from '../UserDashboard';
import EditUser from "../EditUser";

const AdminDashboard = () => {
 const [users, setUsers] = useState([
    { id: 'fmmfmfmmf', username: 'abc', email: 'abc123@gmail.com', password: "1234556789", savedRecipes: 23 },
    { id: 'user2', username: 'def', email: 'def456@gmail.com', password: "abc", savedRecipes: 12 },
    { id: 'user3', username: 'ghi', email: 'ghi789@gmail.com', password: "123", savedRecipes: 8 },
    { id: 'user4', username: 'jkl', email: 'jkl111@gmail.com', savedRecipes: 15 },
    { id: 'user5', username: 'mno', email: 'mno222@gmail.com', savedRecipes: 3 },
    { id: 'user6', username: 'pqr', email: 'pqr333@gmail.com', savedRecipes: 10 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const handleCreateUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
    setCurrentPage(1); // Quay về trang đầu sau khi thêm user
  };

  return (
    <div className="min-h-screen flex font-sans">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
       <Routes>
        <Route
            index
            element={
            <UserDashboard
                users={users}
                setUsers={setUsers}
                currentPage={currentPage}
                usersPerPage={usersPerPage}
                handlePageChange={setCurrentPage}
            />
            }
        />
        <Route
            path="/create"
            element={<CreateUserAdmin onCreateUser={handleCreateUser} />}
        />
        <Route
        path = "edit/:id"
        element = {<EditUser users = {users} setUsers= {setUsers} />} />
        </Routes>

      </div>
    </div>
  );
};


export default AdminDashboard;
