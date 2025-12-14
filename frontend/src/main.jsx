import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Redux
import { store } from "./redux/redux.js";
import { Provider } from "react-redux";

// Contexts & Styles
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "./index.css"; // Your Tailwind CSS

// Layouts
import Layout from "./pages/layout/Layout.jsx";
import AuthLayout from "./pages/AuthLayout.jsx"; // Import the new layout

// --- Pages ---
// Public
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Terms from "./pages/terms/Terms.jsx";
import Privacy from "./pages/privacy/Privacy.jsx";

// Auth
import Auth from "./pages/auth/Auth.jsx";

// Protected
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Settings from "./pages/settings/Settings.jsx";

// Router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    // The main Layout wrapper contains the Header, Footer, and auth-check logic
    <Route path="/" element={<Layout />}>
      
      {/* --- Public Routes --- */}
      {/* These routes are accessible to everyone, always */}
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="terms-and-conditions" element={<Terms />} />
      <Route path="privacy-policy" element={<Privacy />} />

      {/* --- Auth Route (Unauthenticated Only) --- */}
      {/* This route is only accessible if the user is NOT logged in */}
      <Route element={<AuthLayout authenticationRequired={false} />}>
        <Route path="auth" element={<Auth />} />
      </Route>

      {/* --- Protected Routes (Authenticated Only) --- */}
      {/* These routes are only accessible if the user IS logged in */}
      <Route element={<AuthLayout authenticationRequired={true} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Route>
  )
);

// Render the App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);