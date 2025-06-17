import { Link } from "react-router-dom";
import familyImg from '../assets/about_img/family1.jpg';
import chefImg from '../assets/about_img/chef.jpeg';
import familyImage from '../assets/about_img/family2.jpg';
import connectImg from '../assets/about_img/connect.png';
import memberImg from '../assets/about_img/memberimg.jpg';
import React, { useState } from "react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Trinh Minh Anh",
      image: memberImg,
      bio: "Coder for Frontend (Home, About Us, Single Ingredient, News, Manage Wishlist(admin)), Designer for the website UI (Figma), Sequence Diagrams, PowerPoint, write the paper report.",
    },
    {
      name: "Nguyen Thanh Phuong",
      image: memberImg,
      bio: "Coder for Frontend (Wishlist, Search Recipe, Single Ingredient, Ingredients Detail, Recipe Details), Sequence Diagrams, PowerPoint, write the paper report.",
    },
    {
      name: "Dinh Thi Tu",
      image: memberImg,
      bio: "Main Coder for Frontend and Backend logic (test and fix bugs): Login/Register, Recipe Details, Wishlist, User and User's Recipes Management in Admin Dashboard.",
    },
    {
      name: "Dao Duc Nghiep",
      image: memberImg,
      bio: "Database Connection, Design in SQLite, co-coder for frontend and backend of User's Recipes Management in Admin Dashboard.",
    },
  ];

  const contactItems = [
    {
      title: "Address",
      details: ["1408 Maple Street, New York", "York City, New York, USA"],
      iconPath:
        "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5 S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z",
    },
    {
      title: "Phone",
      details: ["+123 456 7890", "+123 456 7890"],
      iconPath:
        "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.72 11.72 0 003.68.59 1 1 0 011 1V20a1 1 0 01-1 1c-9.39 0-17-7.61-17-17a1 1 0 011-1h3.41a1 1 0 011 1c0 1.27.2 2.51.59 3.68 a1 1 0 01-.21 1.11l-2.2 2.21z",
    },
    {
      title: "Email",
      details: ["info@gmail.com", "demo@gmail.com"],
      iconPath:
        "M4 4h16c1.11 0 1.99.89 1.99 2L22 18a2 2 0 01-2 2H4 c-1.11 0-2-.89-2-2V6a2 2 0 012-2zm8 7l8-5H4l8 5zm0 2l-8-5v10h16V8l-8 5z",
    },
    {
      title: "Chat now",
      details: ["+123 456 7890", "+123 456 7890"],
      iconPath:
        "M20 2H4a2 2 0 00-2 2v14l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z M6 9h12v2H6V9zm0-3h12v2H6V6zm0 6h8v2H6v-2z",
    },
  ];

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Hero Section */}
      <section className="w-full bg-[#B8324F] flex flex-col items-center text-white px-6 md:px-16 py-16">
        <div className="max-w-3xl text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold">About Us</h1>
          <p className="max-w-[800px] mx-auto text-lg leading-relaxed">
            We help you cook smarter – starting with what you already have.<br />
            Born from the idea of “no-stress cooking,” Recipe Finder is a platform designed
            for anyone who wants to turn their available ingredients into delicious,
            easy, and satisfying meals.
          </p>
          <p className="max-w-[800px] mx-auto text-lg leading-relaxed">
            Just enter what you have in your kitchen, and our system will instantly suggest
            recipes that match – from quick breakfasts to cozy family dinners.
          </p>
        </div>
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          <div className="w-[360px] h-[225px] rounded-xl overflow-hidden shadow-lg">
            <img src={familyImg} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-[360px] h-[225px] rounded-xl overflow-hidden shadow-lg">
            <img src={chefImg} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="w-[360px] h-[225px] rounded-xl overflow-hidden shadow-lg">
            <img src={familyImage} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-[#F7F2EE] py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-start gap-8">
          <div className="flex items-center gap-4">
            <h3 className="text-5xl font-bold text-[#B8324F]">Our Mission</h3>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#B8324F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-xl font-semibold italic">
              <span className="font-bold">Reduce waste</span> – <span className="font-bold">Spark creativity</span> – <span className="font-bold">Make cooking easier</span>
            </p>
            <p className="text-xl">
              We believe that anyone can cook well with the right tools and a bit of inspiration.
              Recipe Finder helps you save time, minimize food waste, and discover the joy of home cooking.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-16 text-center">
          <h3 className="text-6xl font-bold mb-12">Meet Our Team</h3>
          <ul className="space-y-12">
            {teamMembers.map((member, idx) => (
              <li key={idx} className="flex flex-col md:flex-row items-start gap-6">
                <img src={member.image} alt={member.name} className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover" />
                <div className="text-left flex-1">
                  <h4 className="text-lg font-bold mb-2">{member.name}</h4>
                  <p className="text-sm leading-6">{member.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Connect Section */}
      <div className="mx-auto max-w-5xl bg-[#F4EFEB] rounded-3xl py-8 px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Left: Image + Overlay */}
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={connectImg}
              alt="Delicious food spread"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h2 className="text-4xl font-extrabold text-white">LET’S</h2>
              <h2 className="text-4xl font-extrabold text-pink-200">CONNECT!</h2>
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="md:col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 text-gray-800">
            {contactItems.map((item, i) => (
              <div key={i} className="flex flex-col items-start gap-2">
                <svg className="w-8 h-8 text-[#852A3E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d={item.iconPath} />
                </svg>
                <p className="text-sm font-semibold">{item.title}</p>
                {item.details.map((d, j) => (
                  <p key={j} className="text-sm">{d}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
