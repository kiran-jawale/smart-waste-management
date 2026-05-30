import React,{useContext} from "react";
import { content } from "../../../constants/content";

const HowToUseSection = () => {
  const { title, steps } = content.home.howToUse;
  return (
    <div className="border-y border-gray-200 bg-gray-100 py-16 md:py-24 dark:border-slate-800 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base text-gray-600 dark:text-slate-400">
            Follow these simple steps to use SmartPeepal services efficiently.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.name}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-lg font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                {step.name}
              </div>

              <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-300">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToUseSection;
