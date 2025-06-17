import React, {useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import Store from "./redux/store";
import { loadUserAction } from "./redux/actions/UserAction";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ConfirmOtpPage from "./pages/ConfirmOtpPage";
import SearchRecipes from "./pages/SearchRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import IngredientDetails from "./pages/IngredientDetails";
import SingleIngredientDetails from "./pages/SingleIngredientDetails";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ManageRecipes from "./pages/AdminDashboard/ManageRecipes";
import Wishlist from "./pages/Wishlist";
import CookingNews from "./pages/CookingNews";

const App = () => {
  const stateAuth = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const [otp,setOtp] = useState('');
  const isAdminRoute =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/manage-recipes") ||
    location.pathname === "/admin/create";

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await dispatch(loadUserAction());
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    fetchApi();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header user={stateAuth.user} isAdmin={isAdminRoute} />
      <Toaster position="top-right" /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage otp={otp} setOtp={setOtp} />} /> 
        <Route path="/register" element={<RegisterPage otp={otp} setOtp={setOtp} />} /> 
        <Route path="/confirmOtp" element={<ConfirmOtpPage otp={otp} setOtp={setOtp} />} /> 
        <Route path="/SearchRecipes" element={<SearchRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/manage-recipes/:userId" element={<ManageRecipes />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/ingredient/:ingredientId" element={<SingleIngredientDetails />} />
        <Route path="/news" element={<CookingNews />} />
       
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;