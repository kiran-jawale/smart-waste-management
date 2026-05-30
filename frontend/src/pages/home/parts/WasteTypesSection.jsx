import React,{useContext} from "react";
import { content } from "../../../constants/content";

const WasteTypesSection = () => {
  const { title, types } = content.home.wasteTypes;
  return (
    <div className="bg-white py-16 md:py-24 dark:bg-[#0f172a]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base text-gray-600 dark:text-slate-400">
            Learn about different categories of waste and responsible disposal
            methods.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {types.map((waste) => (
            <div
              key={waste.name}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
            >
              <img
                src={waste.img}
                alt={waste.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {waste.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-300">
                  {waste.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WasteTypesSection;
