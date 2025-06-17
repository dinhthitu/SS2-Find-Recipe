import React, { useEffect } from 'react';
import Login from '../components/Login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const LoginPage = ({ otp, setOtp }) => {
  const { isAuthenticated, user } = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="relative min-h-screen">
      <Login />
    </div>
  );
};

export default LoginPage;