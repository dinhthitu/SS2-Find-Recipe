import React, { useEffect } from 'react';
import Login from '../components/Login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

<<<<<<< HEAD
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
=======
const LoginPage = ({otp,setOtp}) => {
    const {isAuthenticated} = useSelector(state=>state.UserReducer)
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
        
>>>>>>> cead9ca8478481f50cb9c01cf97e84f9dd0a7703
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="relative min-h-screen">
      <Login />
    </div>
  );
};

<<<<<<< HEAD
export default LoginPage;
=======
    return (
        <>
            <div className={"relative min-h-screen"}>
              
                <Login/>

            </div>


        </>
    )
}
export default LoginPage
>>>>>>> cead9ca8478481f50cb9c01cf97e84f9dd0a7703
