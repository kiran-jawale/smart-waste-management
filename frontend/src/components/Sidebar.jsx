import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import userService from "../services/user.service";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const onDashboard = location.pathname === "/dashboard";

  const currentHash = location.hash;

  const handleLogout = async () => {
    try {
      await userService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(logout());
      navigate("/");
    }
  };

  const activeClass = "bg-emerald-600 text-white shadow-md";

  const inactiveClass = "text-slate-300 hover:bg-slate-800 hover:text-white";

  const baseNavLinkClass =
    "block px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200";

  const activeSubLink = "text-emerald-400 font-semibold";

  const inactiveSubLink = "text-slate-400 hover:text-emerald-400";

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-[#0f172a] text-white shadow-2xl">
      <div className="border-b border-slate-800 p-6">
        <h2 className="truncate text-lg font-semibold">{user.name}</h2>

        <p className="mt-1 truncate text-sm text-slate-400">{user.email}</p>

        <div className="mt-4 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold capitalize text-emerald-400">
          {user.role}
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseNavLinkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Dashboard
        </NavLink>

        {onDashboard &&
          (user.role === "admin" || user.role === "collector") && (
            <div className="ml-4 space-y-3 border-l border-slate-700 pl-4">
              {user.role === "collector" && (
                <Link
                  to="/dashboard#create-report"
                  className={`block text-sm transition-colors ${
                    currentHash === "#create-report" ||
                    (onDashboard && currentHash === "")
                      ? activeSubLink
                      : inactiveSubLink
                  }`}
                >
                  Create Record
                </Link>
              )}

              <Link
                to="/dashboard#complaints"
                className={`block text-sm transition-colors ${
                  (user.role === "admin" &&
                    (currentHash === "#complaints" ||
                      (onDashboard && currentHash === ""))) ||
                  (user.role === "collector" && currentHash === "#complaints")
                    ? activeSubLink
                    : inactiveSubLink
                }`}
              >
                Complaints
              </Link>

              <Link
                to="/dashboard#reports"
                className={`block text-sm transition-colors ${
                  currentHash === "#reports" ? activeSubLink : inactiveSubLink
                }`}
              >
                Waste Records
              </Link>

              {user.role === "admin" && (
                <>
                  <Link
                    to="/dashboard#users"
                    className={`block text-sm transition-colors ${
                      currentHash === "#users" ? activeSubLink : inactiveSubLink
                    }`}
                  >
                    User Management
                  </Link>

                  <Link
                    to="/dashboard#create-report"
                    className={`block text-sm transition-colors ${
                      currentHash === "#create-report"
                        ? activeSubLink
                        : inactiveSubLink
                    }`}
                  >
                    Create Record
                  </Link>
                </>
              )}
            </div>
          )}

        {onDashboard &&
          (user.role === "citizen" || user.role === "organisation") && (
            <div className="ml-4 space-y-3 border-l border-slate-700 pl-4">
              <Link
                to="/dashboard#my-reports"
                className={`block text-sm transition-colors ${
                  currentHash === "#my-reports" ||
                  (onDashboard && currentHash === "")
                    ? activeSubLink
                    : inactiveSubLink
                }`}
              >
                My Records
              </Link>

              <Link
                to="/dashboard#my-complaints"
                className={`block text-sm transition-colors ${
                  currentHash === "#my-complaints"
                    ? activeSubLink
                    : inactiveSubLink
                }`}
              >
                My Complaints
              </Link>

              <Link
                to="/dashboard#file-complaint"
                className={`block text-sm transition-colors ${
                  currentHash === "#file-complaint"
                    ? activeSubLink
                    : inactiveSubLink
                }`}
              >
                File Complaint
              </Link>
            </div>
          )}

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${baseNavLinkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${baseNavLinkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Settings
        </NavLink>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="w-full rounded-2xl bg-red-600 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
