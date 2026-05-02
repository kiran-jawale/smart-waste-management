import React from "react";
import { useSelector } from "react-redux";
import Container from "../../components/Container";

// This page just displays the user's info from Redux
const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Container><div>Loading profile...</div></Container>;
  }

  return (
    <Container>
      <div className="p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          My Profile
        </h1>
        <div className="space-y-6">
          <InfoRow label="Name" value={user.name} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Role" value={user.role} />
          <InfoRow label="Area Code" value={user.areacode} />
          <InfoRow label="Address" value={user.address} />
          <InfoRow label="Contact" value={user.contact} />
          <InfoRow label="User Code" value={user.code} />
        </div>
      </div>
    </Container>
  );
};

// Re-styled InfoRow for a cleaner look
const InfoRow = ({ label, value }) => (
  <div className="flex flex-col p-4 border-b border-gray-200 dark:border-gray-700">
    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ">
      {label}
    </span>
    <span className="text-lg font-semibold text-gray-900 dark:text-white">
      {value}
    </span>
  </div>
);

export default Profile;