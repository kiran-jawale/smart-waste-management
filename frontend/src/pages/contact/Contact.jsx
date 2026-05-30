import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { content } from "../../constants/content";
import Container from "../../components/Container";

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const { title, text, details } = content.contact;

  return (
    <Container>
      <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className={`text-3xl md:text-4xl font-bold tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h1>

          <p
            className={`mt-4 text-base md:text-lg leading-relaxed ${
              theme === "dark" ? "text-slate-300" : "text-gray-600"
            }`}
          >
            {text}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 md:grid-cols-2">
          {details.map((item) => (
            <div
              key={item.name}
              className={`rounded-2xl border p-5 transition-colors duration-200 ${
                theme === "dark"
                  ? "border-slate-700 bg-slate-900"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-wide ${
                  theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
                {item.name}
              </span>

              <p
                className={`mt-2 text-sm font-medium break-words ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Contact;
