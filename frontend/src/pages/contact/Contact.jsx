// /src/pages/contact/Contact.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { content } from "../../constants/content";
import Container from "../../components/Container";

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const { title, text, details } = content.contact;

  return (
    <Container>
      <div
        className={`p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl`}
      >
        <h1
          className={`text-4xl font-bold mb-4 text-center ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h1>
        <p
          className={`text-lg text-center leading-relaxed mb-10 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {text}
        </p>

        <div className="max-w-md mx-auto space-y-4">
          {details.map((item) => (
            <div
              key={item.name}
              className="flex flex-col p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <span
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.name}
              </span>
              <span
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Contact;