import React, { useState, useContext } from "react";
import Container from "../../components/Container";
import BasicSettingsForm from "./parts/BasicSettingsForm";
import ChangePasswordForm from "./parts/ChangePasswordForm";

const Settings = () => {
  const [isBasicView, setIsBasicView] = useState(true);

  const activeTab =
    "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400";
  const inactiveTab =
    "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300";

  return (
    <Container>
      <div className="space-y-8">
        <div
          className="
          rounded-3xl border border-gray-200 bg-white p-2 shadow-sm
          dark:border-slate-700 dark:bg-slate-800
        "
        >
          <nav className="flex flex-col gap-2 sm:flex-row" aria-label="Tabs">
            <button
              onClick={() => setIsBasicView(true)}
              className={`rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200 ${
                isBasicView
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              Basic Settings
            </button>

            <button
              onClick={() => setIsBasicView(false)}
              className={`rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-200 ${
                !isBasicView
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              Change Password
            </button>
          </nav>
        </div>

        {isBasicView ? <BasicSettingsForm /> : <ChangePasswordForm />}
      </div>
    </Container>
  );
};

export default Settings;
