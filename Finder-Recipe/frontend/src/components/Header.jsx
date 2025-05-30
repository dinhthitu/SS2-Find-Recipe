import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Thêm useNavigate
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.jpeg";
import moreIcon from "../assets/more.png";
import closeIcon from "../assets/delete.png";
import arrowIcon from "../assets/arrow.png";
import userIcon from "../assets/user-icon.png";

const Header = ({ isAdmin = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const stateAuth = useSelector((state) => state.UserReducer);
  const navigate = useNavigate(); // ✅ Hook để điều hướng
  const dispatch = useDispatch();
  const handleLogout = () => {
  localStorage.removeItem("token");
  dispatch({ type: "LogoutUserSuccess" });
  navigate("/");
 
};

  return (
    <div className="flex items-center justify-between px-4 py-4 relative bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        {isAdmin ? (
          <>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/34/Michelin_Logo.svg"
              alt="Michelin Logo"
              className="mr-3 w-16 h-auto"
            />
            <h1
              className="text-2xl italic text-[#B8324F]"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Recipe Finder Admin Dashboard
            </h1>
          </>
        ) : (
          <>
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="font-bold text-sm text-gray-800">RECIPE FINDER</span>
          </>
        )}
      </div>

      {!isAdmin && (
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/SearchRecipes" className="hover:text-gray-600">Search</Link>
          <Link to="/news" className="hover:text-gray-600">News</Link>
          <Link to="/Product" className="hover:text-gray-600">Product</Link>
          <Link to="/AboutUs" className="hover:text-gray-600">About</Link>
        </div>
      )}

      <div className="hidden md:flex gap-6 text-sm font-medium flex-row items-center">
        {stateAuth.user ? (
          <>
            {!isAdmin && (
              <Link to="/wishlist" className="hover:text-gray-600 flex items-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
            )}
            <img
              src={stateAuth.user?.avatar || userIcon}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <button onClick={handleLogout} className="hover:text-gray-600 flex items-center">
              Logout
              <img src={arrowIcon} className="w-4 h-5 ml-1" />
            </button>
          </>
        ) : (
          <>
            <img src={userIcon} alt="User Icon" className="w-8 h-8 rounded-full" />
            <Link to="/login" className="hover:text-gray-600 flex items-center">
              Login via Google
              <img src={arrowIcon} className="w-4 h-5 ml-1" />
            </Link>
          </>
        )}
      </div>

      <div className="md:hidden relative">
        <img
          src={showMenu ? closeIcon : moreIcon}
          alt="More"
          className="w-8 h-8 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <div className="fixed right-0 w-1/2 min-h-screen bg-white shadow-lg z-50 p-6 flex flex-col gap-4 font-bold transition-all duration-300 ease-in-out">
            {!isAdmin && (
              <>
                <Link to="/" className="block py-1 hover:text-gray-600">Home</Link>
                <Link to="/SearchRecipes" className="block py-1 hover:text-gray-600">Search</Link>
                <Link to="/news" className="block py-1 hover:text-gray-600">News</Link>
                <Link to="/Product" className="block py-1 hover:text-gray-600">Product</Link>
                <Link to="/AboutUs" className="block py-1 hover:text-gray-600">About</Link>
                {stateAuth.user && (
                  <Link to="/wishlist" className="block py-1 hover:text-gray-600 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Wishlist
                  </Link>
                )}
              </>
            )}
            {stateAuth.user ? (
              <div className="flex items-center gap-2">
                <img
                  src={stateAuth.user?.avatar || userIcon}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <button onClick={handleLogout} className="block py-1 hover:text-gray-600">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <img src={userIcon} alt="User Icon" className="w-8 h-8 rounded-full" />
                <Link to="/login" className="block py-1 hover:text-gray-600">
                  Login via Google
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
