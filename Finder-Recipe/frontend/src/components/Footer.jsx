import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#531A27] text-white py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4">
          <h2 className="text-5xl font-extrabold font-serif">Discover.</h2>
          <h2 className="text-5xl font-extrabold font-serif text-[#EECED0]">Create.</h2>
          <h2 className="text-5xl font-extrabold font-serif text-[#C54F6A]">Savor.</h2>
        </div>
        <div className="flex flex-col gap-3">
          <p className="mt-2">Empowering you to find, customize, and cherish every recipe with ease.</p>
          <div className="flex flex-row space-x-2">
            <Link to="/" className="hover:underline">Home | </Link>
            <Link to="/SearchRecipes" className="hover:underline">Search | </Link>
            <Link to="/news" className="hover:underline">News | </Link>
            <Link to="/AboutUs" className="hover:underline">About Us</Link>
          </div>
          <div className="">
            <p className="mb-2">Contact Us</p>
            <div className="flex gap-2 mt-3">
              <input
                type="email"
                placeholder="Email"
                className="px-5 py-2 rounded-lg bg-gray-500 opacity-30"
              />
              <button className="px-3 py-2 bg-white text-[#4A2C2A] rounded-lg">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-4 text-sm">
        © 2025 Recipe Finder & Collection Manager. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
