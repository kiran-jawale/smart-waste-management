import React,{useContext} from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { content, LOGO_URL } from "../../constants/content";
import LogButton from "../../components/LogButton";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-[#0f172a]/90">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl border border-emerald-200 bg-white p-2 shadow-sm dark:border-emerald-500/20 dark:bg-slate-800">
            <img src={LOGO_URL} alt="SmartPeepal Logo" className="h-10 w-10" />
          </div>

          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            SmartPeepal
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          {content.navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                `hidden rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 md:block ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            className="rounded-2xl border border-gray-200 bg-gray-100 p-2.5 text-lg transition-all duration-200 hover:bg-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
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
