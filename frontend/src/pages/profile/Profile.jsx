import React,{useContext} from "react";
import { useSelector } from "react-redux";
import Container from "../../components/Container";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Container>
        <div className="flex items-center justify-center rounded-3xl border border-gray-200 bg-white py-20 text-lg font-medium text-gray-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          Loading profile...
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-8 border-b border-gray-200 pb-5 dark:border-slate-700">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
            Personal and account information associated with your SmartPeepal
            profile.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

const InfoRow = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-slate-700 dark:bg-slate-900">
    <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
      {label}
    </span>

    <p className="mt-2 break-words text-sm font-medium text-gray-800 dark:text-gray-100">
      {value}
    </p>
  </div>
);

export default Profile;
