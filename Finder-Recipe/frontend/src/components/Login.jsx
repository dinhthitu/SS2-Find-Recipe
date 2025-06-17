import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import Store from '../redux/store';
import { useSelector } from 'react-redux'; 
import { loginApi } from '../../Axios/client/api'; 
import { loginUserAction } from '../redux/actions/UserAction';
import toast from 'react-hot-toast';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user} = useSelector((state) => state.UserReducer);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const fetchApi = async (data) => {
    Store.dispatch(loginUserAction(data));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('User logged in:', user);
      console.log('User role:', user.role);
      
      if (user.role === 'admin') {
        console.log('Redirecting to admin dashboard');
        navigate('/admin/*');
      } else {
        console.log('Redirecting to home');
        navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast.error("Please fill in all required fields", { style: { maxWidth: 500 } });
      return;
    }
  
    const res = await loginApi({ email, password });
    if (!res.success) {
      toast.error(res.message, { style: { maxWidth: 500 } });
    } else {
      toast.success("Login successfully!");
      localStorage.setItem('token', res.token); 
      document.cookie = `token=${res.token}; path=/; max-age=86400`; 
      localStorage.setItem('user', JSON.stringify(res.data)); 
      await fetchApi(res.data);
      navigate("/");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/api/auth/login";
  };

  useEffect(() => {
    const checkGoogleLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get("error");
    
      if (error) {
        toast.error("Google login failed!", { style: { maxWidth: 500 } });
        navigate("/login", { replace: true });
        return;
      }
    
      // Lấy token từ cookie
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      console.log('Token from cookie after Google login:', token);
      if (token) {
        localStorage.setItem('token', token);
      }
    
      const res = await getUserApi();
      if (res.success) {
        toast.success("Google login successful!");
        localStorage.setItem('user', JSON.stringify(res.user));
        await fetchApi(res.user);
        navigate("/", { replace: true });
      } else {
        toast.error(res.message, { style: { maxWidth: 500 } });
        if (res.message === "Please login to continue") {
          navigate("/login", { replace: true });
        }
      }
    };

    checkGoogleLogin();
  }, [navigate]);

  return (
    <>
      <div className={"w-full min-h-screen"}>
  <div className={"absolute top-[5%] w-full"}>
    <div className={"w-[800px] mb-[30px] mx-auto"}>
      <div className={"w-full py-[10px] rounded-[20px] shadow-xl bg-white border border-red-200"}>
        <div className={"my-[25px] w-full flex items-center justify-center flex-col gap-[10px]"}>
          <h2 className='font-[700] text-[36px] leading-[40px] text-[#B8324F]'>Welcome Back</h2>
          <p className="text-gray-500 text-[16px]">Login to continue</p>
        </div>

        <div className={"w-[50%] my-12 mx-auto"}>
          <div className={"w-full flex flex-col items-center gap-[15px]"}>
            <div className={"px-[24px] flex items-center rounded-[12px] py-[12px] bg-[#FEE2E2] w-full transition hover:bg-[#fecaca]"}>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="px-[24px] flex items-center rounded-[12px] bg-transparent w-full border-none cursor-pointer"
              >
                <FcGoogle size={24} />
                <p className="flex-1 flex items-center justify-center font-medium text-[#B8324F]">Continue with Google</p>
              </button>
            </div>
          </div>

          <br /><br />
          <div className={"w-full"}>
            <div className={"w-full h-[1px] bg-[#FECACA] relative"}>
              <div className={"px-[12px] bottom-[-10px] left-[45%] absolute bg-white"}>
                <p className={"font-[500] text-[16px] leading-[24px] text-[#B8324F]"}>OR</p>
              </div>
            </div>
          </div>

          <br /><br />
          <div className={"w-full"}>
            <form onSubmit={handleLogin} className={"w-full flex flex-col gap-[20px]"}>
              <div>
                <label className={"font-[600] mb-[5px] pr-1 text-[14px] block leading-[20px] text-[#B8324F]"} htmlFor="">
                  Email <span className={"text-[#B8324F]"}>*</span>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"you@example.com"}
                  type="text"
                  className={"py-[10px] w-full px-[13px] border-[1px] border-[#FCA5A5] rounded-[12px] shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"}
                />
              </div>

              <div>
                <label className={"font-[600] mb-[5px] pr-1 text-[14px] block leading-[20px] text-[#B8324F]"} htmlFor="">
                    Password <span className={"text-[#B8324F]"}>*</span>
                </label>
                <Input.Password
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={"****"}
                  className={"!py-[10px] !w-full !px-[13px] !border-[1px] !border-[#FCA5A5] !rounded-[12px] !shadow-sm !focus:!outline-none !focus:!ring-2 !focus:!ring-red-400"}
                />
              </div>

              <div>
                <input
                  type="submit"
                  value={"Login"}
                  className={"cursor-pointer py-[12px] text-white w-full rounded-[50px] bg-[#B8324F] px-[24px] hover:bg-[#b91c1c] transition"}
                />
              </div>

              <div className={"w-full text-center mt-[10px]"}>
                <p className={"font-[400] text-[16px] leading-[24px]"}>
                  New user? <Link to={"/register"} className={"text-[#B8324F] font-medium hover:underline"}>Create an account</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Login;