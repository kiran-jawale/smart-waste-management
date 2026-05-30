import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import WhatWhySection from "../home/parts/WhatWhySection";
import { content } from "../../constants/content";
import Container from "../../components/Container";

const About = () => {
  const { theme } = useContext(ThemeContext);
  const { whatWhy } = content.home;
  const { title, text } = content.about;
  return (
    <div>
      <Container>
        <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              className={`text-3xl md:text-4xl font-bold tracking-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h1>

            <p
              className={`mt-6 text-base md:text-lg leading-relaxed ${
                theme === "dark" ? "text-slate-300" : "text-gray-600"
              }`}
            >
              {text}
            </p>
          </div>
        </div>
      </Container>

      <div
        className={`border-y ${
          theme === "dark"
            ? "border-slate-800 bg-slate-900"
            : "border-gray-200 bg-gray-100"
        }`}
      >
        <WhatWhySection
          title={whatWhy.title}
          what={whatWhy.what}
          why={whatWhy.why}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default About;
