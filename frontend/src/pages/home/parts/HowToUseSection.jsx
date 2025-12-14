import React from "react";
import { content } from "../../../constants/content";

const HowToUseSection = () => {
  const { title, steps } = content.home.howToUse;
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.name}
              className="p-6 text-center bg-white dark:bg-gray-700 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
                {step.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToUseSection;