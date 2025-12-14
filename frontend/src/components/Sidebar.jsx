import React from "react";
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

  const activeClass = "bg-green-600 text-white font-bold";
  const inactiveClass = "text-gray-300 hover:bg-gray-700 hover:text-white";
  const baseNavLinkClass = "block px-4 py-3 rounded-lg transition-colors duration-200";
  
   const activeSubLink = "text-green-400 font-bold";
  const inactiveSubLink = "text-gray-400 hover:text-green-400";

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col fixed shadow-lg z-50">
       <div className="p-5 border-b border-gray-700">
        <h2 className="text-xl font-bold truncate">{user.name}</h2>
        <p className="text-sm text-gray-400 truncate">{user.email}</p>
        <p className="text-xs font-semibold text-green-400 capitalize mt-2">
          {user.role}
        </p>
      </div>

       <nav className="flex-grow p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseNavLinkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Dashboard (Work)
        </NavLink>
        
         {onDashboard && (user.role === 'admin' || user.role === 'collector') && (
          <div className="pl-4 space-y-2 border-l-2 border-gray-700 ml-4">
            {/* Collector Links */}
            {user.role === 'collector' && (
              <Link 
                to="/dashboard#create-report"
                className={`${currentHash === '#create-report' || (onDashboard && currentHash === '') ? activeSubLink : inactiveSubLink} block py-1`}
              >
                &#8227; Create Record
              </Link>
            )}
             <Link 
              to="/dashboard#complaints"
              className={`${
                (user.role === 'admin' && (currentHash === '#complaints' || (onDashboard && currentHash === ''))) ||
                (user.role === 'collector' && currentHash === '#complaints')
                ? activeSubLink : inactiveSubLink} block py-1`}
            >
              &#8227; Complaints
            </Link>
            <Link 
              to="/dashboard#reports"
              className={`${currentHash === '#reports' ? activeSubLink : inactiveSubLink} block py-1`}
            >
              &#8227; Waste Records
            </Link>
             {user.role === 'admin' && (
              <>
                <Link 
                  to="/dashboard#users"
                  className={`${currentHash === '#users' ? activeSubLink : inactiveSubLink} block py-1`}
                >
                  &#8227; User Management
                </Link>
                <Link 
                  to="/dashboard#create-report"
                  className={`${currentHash === '#create-report' ? activeSubLink : inactiveSubLink} block py-1`}
                >
                  &#8227; Create Record
                </Link>
              </>
            )}
          </div>
        )}
         
        {onDashboard && (user.role === 'citizen' || user.role === 'organisation') && (
           <div className="pl-4 space-y-2 border-l-2 border-gray-700 ml-4">
            <Link 
              to="/dashboard#my-reports"
              className={`${currentHash === '#my-reports' || (onDashboard && currentHash === '') ? activeSubLink : inactiveSubLink} block py-1`}
            >
              &#8227; My Records
            </Link>
             <Link 
              to="/dashboard#my-complaints"
              className={`${currentHash === '#my-complaints' ? activeSubLink : inactiveSubLink} block py-1`}
            >
              &#8227; My Complaints
            </Link>
            <Link 
              to="/dashboard#file-complaint"
              className={`${currentHash === '#file-complaint' ? activeSubLink : inactiveSubLink} block py-1`}
            >
              &#8227; File a Complaint
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
 
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;