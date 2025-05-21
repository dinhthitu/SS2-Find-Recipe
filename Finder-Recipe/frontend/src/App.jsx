import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/features';
import Product from './pages/product';
import AboutUs from './pages/AboutUs';
import Login from './pages/login';
import Signup from './pages/signup';
import SearchRecipes from './pages/SearchRecipes';
import RecipeDetails from './pages/RecipeDetails';
import IngredientDetails from './pages/IngredientDetails';
import SingleIngredientDetails from './pages/SingleIngredientDetails';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ManageRecipes from './pages/ManageRecipes';
import Header from './components/Header';
import Footer from './components/Footer';
import { auth } from './firebase';
import Wishlist from './pages/Wishlist';
const App = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const isAdminRoute = location.pathname === '/admin' || location.pathname.startsWith('/manage-recipes') || location.pathname === '/admin/create';

  return (
    <>
      <Header user={user} isAdmin={isAdminRoute} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/SearchRecipes" element={<SearchRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path = "/wishlist" element = {<Wishlist />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/manage-recipes/:userId" element={<ManageRecipes />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/ingredient/:ingredientId" element={<SingleIngredientDetails />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;