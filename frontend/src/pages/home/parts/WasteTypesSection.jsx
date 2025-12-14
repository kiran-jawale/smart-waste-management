import React from "react";
import { content } from "../../../constants/content";


const WasteTypesSection = () => {
  const { title, types } = content.home.wasteTypes;
  return (
    <div className="bg-white dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {types.map((waste) => (
            <div
              key={waste.name}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
              <img
                src={waste.img}
                alt={waste.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">
                  {waste.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{waste.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WasteTypesSection;