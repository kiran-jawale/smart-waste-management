import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { content } from "../../constants/content";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className={`border-t transition-colors duration-300 ${
      theme === "dark"
        ? "border-slate-800 bg-slate-950 text-slate-400"
        : "border-gray-200 bg-gray-50 text-gray-600"
    }`}>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              to="/"
              className={`text-3xl font-bold tracking-tight ${
                theme === "dark" ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              SmartPeepal
            </Link>

            <p className={`mt-3 max-w-md text-sm leading-relaxed ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}>
              Building cleaner communities through smart and efficient waste
              management solutions.
            </p>
          </div>

          <div className="flex flex-wrap gap-5">
            {content.footerLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  theme === "dark"
                    ? "hover:text-emerald-400"
                    : "hover:text-emerald-600"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        <div className={`mt-10 border-t pt-6 text-center text-sm ${
          theme === "dark"
            ? "border-slate-800 text-slate-500"
            : "border-gray-200 text-gray-500"
        }`}>
          <p>
            &copy; {new Date().getFullYear()} SmartPeepal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
