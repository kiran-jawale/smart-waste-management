import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { content, LOGO_URL } from "../../constants/content";
import LogButton from "../../components/LogButton";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-gray-50 text-gray-900 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* Dummy Logo */}
          <img src={LOGO_URL} alt="SmartPeepal Logo" className="h-10 w-10" />
          <span className="text-3xl font-bold text-gray-900">
            SmartPeepal
          </span>
        </Link>
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Public links are always visible */}
          {content.navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                `hidden md:block text-base font-medium transition-colors ${
                  isActive
                    ? "text-gray-900 font-bold" // Active link is bold
                    : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
          <LogButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
