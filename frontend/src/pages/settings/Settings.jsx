import React, { useState } from "react";
import Container from "../../components/Container";
import BasicSettingsForm from "./parts/BasicSettingsForm";
import ChangePasswordForm from "./parts/ChangePasswordForm";

// This page now toggles between Basic Settings and Change Password
const Settings = () => {
  const [isBasicView, setIsBasicView] = useState(true);

  // Tailwind classes for the tabs
  const activeTab = "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400";
  const inactiveTab = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300";

  return (
    <Container>
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setIsBasicView(true)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${isBasicView ? activeTab : inactiveTab}`}
            >
              Basic Settings
            </button>
            <button
              onClick={() => setIsBasicView(false)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${!isBasicView ? activeTab : inactiveTab}`}
            >
              Change Password
            </button>
          </nav>
        </div>
      </div>

      {/* Render the selected form */}
      {isBasicView ? <BasicSettingsForm /> : <ChangePasswordForm />}
    </Container>
  );
};

export default Settings;