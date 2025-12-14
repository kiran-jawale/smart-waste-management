import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { content } from "../../../constants/content";

const PrivacyContent = () => {
  const { theme } = useContext(ThemeContext);
  const { title, text } = content.privacy;
  
  return (
    <div className={`p-8 md:p-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl`}>
      <h1 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h1>
      <div className={`prose prose-lg ${theme === 'dark' ? 'prose-invert' : ''} max-w-none ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="lead">{text}</p>
        
        <h2>Information We Collect</h2>
        <p>
          We may collect personally identifiable information, such as your name, email address, contact number, and location (areacode, address) when you register on our platform. We also collect information you provide when you submit a waste report or a complaint, including images and descriptions.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          The information we collect is used to:
        </p>
        <ul>
          <li>Provide and manage your access to our services.</li>
          <li>Identify you and authenticate your user account.</li>
          <li>Process and manage your reports and complaints.</li>
          <li>Assign tasks to collectors based on your provided areacode.</li>
          <li>Communicate with you regarding your submissions or account.</li>
        </ul>
        
        <h2>Information Sharing and Disclosure</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our platform (like database hosts) or servicing you, so long as those parties agree to keep this information confidential.
        </p>
        
        <h2>Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. Your password is encrypted, and we use secure socket layer (SSL) technology for data transmission.
        </p>
      </div>
    </div>
  );
};

export default PrivacyContent;