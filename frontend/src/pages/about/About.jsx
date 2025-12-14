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
        <div
          className={`p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl`}
        >
          <h1
            className={`text-4xl font-bold mb-8 text-center ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-lg text-center leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {text}
          </p>
        </div>
      </Container>
      
 
      <div className="bg-gray-100 dark:bg-gray-800">
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