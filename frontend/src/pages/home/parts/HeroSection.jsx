import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { content } from "../../../constants/content";
import LogButton from "../../../components/LogButton";

const HeroSection = () => {
  const { title, subtitle, buttons } = content.home.hero;

  return (
    <div className="rounded-md w-full border-b border-gray-200 bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:border-slate-800 dark:from-[#0f172a] dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto grid items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
        <div className="text-center md:text-left">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Smart Waste Management
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white md:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-slate-300 md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Get Started
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
            Access citizen and organisation waste management services.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {buttons.map((btn) => (
              <Link
                key={btn.title}
                to={btn.path}
                className={`rounded-2xl px-6 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                  btn.primary
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-700 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
                }`}
              >
                {btn.title}
              </Link>
            ))}

            <LogButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
