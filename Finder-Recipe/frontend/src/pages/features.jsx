import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import moreIcon from "../assets/more.png";
import closeIcon from "../assets/delete.png";
import completeIcon from "../assets/complete.png";
import arrowIcon from "../assets/arrow.png";

const features = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-purple-100 text-gray-500 px-6 py-2 rounded-full text-sm shadow-sm mb-6">
          Discover our new AI-powered recipe generator.{" "}
          <Link to="/learn-more" className=" text-purple-700 font-semibold hover:underline">
            Learn more →
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Features
        </h1>
        <h2 className="text-gray-600 text-xl max-w-2xl mb-6">
          Discover the features that make our product unique.
        </h2>
        <div className=" flex flex-col text-gray-500 text-base md:text-sm max-w-2xl mb-6 text-left py-2">
          <p className="flex flex-row py-2"> 
            <img src={completeIcon} className="w-4 h-4"/> 
            Support for various dietary preferences like vegan, gluten-free, and more</p>
          <p className="flex flex-row py-2"> 
            <img src={completeIcon} className="w-4 h-4"/> 
            Easy-to-use interface for adding ingredients and generating recipes.</p>
          <p className="flex flex-row py-2"> 
            <img src={completeIcon} className="w-4 h-4"/> 
            Save, rate, and share your favorite recipes with others.</p>
        </div>
        <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full text-sm shadow-md">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default features;