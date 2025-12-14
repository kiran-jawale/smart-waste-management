import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { content } from "../../../constants/content";

const TermsContent = () => {
  const { theme } = useContext(ThemeContext);
  const { title, text } = content.terms;
  
  return (
    <div className={`p-8 md:p-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl`}>
      <h1 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h1>
      <div className={`prose prose-lg ${theme === 'dark' ? 'prose-invert' : ''} max-w-none ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="lead">{text}</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By creating an account and using the SmartPeepal platform, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, you must not use this service.
        </p>

        <h2>2. User Roles and Responsibilities</h2>
        <ul>
          <li>
            <strong>Citizen/Organisation:</strong> You are responsible for providing accurate information in your reports and complaints. You agree not to submit false, malicious, or spam reports.
          </li>
           <li>
            <strong>Collector:</strong> You are responsible for attending to assigned reports and complaints in a timely manner and updating their status accurately on the platform.
          </li>
           <li>
            <strong>Admin:</strong> You are responsible for overseeing the platform's operation and managing user data in accordance with our Privacy Policy.
          </li>
        </ul>
        
        <h2>3. Prohibited Conduct</h2>
        <p>
          You agree not to use the service for any unlawful purpose or to:
        </p>
        <ul>
          <li>Harass, abuse, or harm another person.</li>
          <li>Submit knowingly false or misleading information.</li>
          <li>Attempt to gain unauthorized access to other user accounts or admin-level privileges.</li>
          <li>Disrupt or interfere with the security or performance of the service.</li>
        </ul>
        
        <h2>4. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account at our sole discretion, without notice, for any conduct that we believe violates these Terms & Conditions or is harmful to other users of the service.
        </p>
      </div>
    </div>
  );
};

export default TermsContent;