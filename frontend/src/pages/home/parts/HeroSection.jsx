import React from "react";
import { Link } from "react-router-dom";
import { content } from "../../../constants/content";
import LogButton from "../../../components/LogButton"; // Import LogButton

const HeroSection = () => {
  const { title, subtitle, buttons } = content.home.hero;

  return (
    <div className="w-full bg-gray-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center py-24 md:py-32">
        {/* Left Side: Text */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-2xl">
            {subtitle}
          </p>
        </div>
        
        {/* Right Side: Buttons */}
        <div className="flex flex-col space-y-4 p-8 bg-white rounded-2xl shadow-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Started</h3>
          {buttons.map((btn) => (
            <Link
              key={btn.title}
              to={btn.path}
              className={`text-center px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                btn.primary
                  ? "bg-black text-white hover:bg-gray-800 focus:ring-black"
                  : "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600"
              }`}
            >
              {btn.title}
            </Link>
          ))}
          {/* We include the LogButton separately */}
          <LogButton />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
