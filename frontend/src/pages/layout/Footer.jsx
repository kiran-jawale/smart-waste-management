import React from "react";
import { Link } from "react-router-dom";
import { content } from "../../constants/content";

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-green-500">
              SmartPeepal
            </Link>
            <p className="text-sm mt-2">
              Reshaping our future, one bin at a time.
            </p>
          </div>
          <div className="flex space-x-6">
            {content.footerLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="text-sm hover:text-green-400 transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} SmartPeepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
