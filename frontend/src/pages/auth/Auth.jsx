import React, { useState, useContext } from "react";
import Login from "./parts/Login";
import Register from "./parts/Register";
import { ThemeContext } from "../../contexts/ThemeContext";
 
const Auth = () => {
  const { theme } = useContext(ThemeContext);
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => setIsLoginView((prev) => !prev);

  return (
    <div className={`flex justify-center items-center py-12 min-h-[calc(100vh-200px)] transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
         
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-4xl" role="img" aria-label="recycle">
              ♻️
            </span>
          </div>
        </div>
    
        {isLoginView ? (
          <Login onToggleView={toggleView} />
        ) : (
          <Register onToggleView={toggleView} />
        )}
      </div>
    </div>
  );
};

export default Auth;