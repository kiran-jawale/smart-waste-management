import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { store } from "./redux/redux.js";
import { Provider } from "react-redux";


import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "./index.css"; 

import Layout from "./pages/layout/Layout.jsx";
import AuthLayout from "./pages/AuthLayout.jsx"; 

import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Terms from "./pages/terms/Terms.jsx";
import Privacy from "./pages/privacy/Privacy.jsx";

import Auth from "./pages/auth/Auth.jsx";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Settings from "./pages/settings/Settings.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="terms-and-conditions" element={<Terms />} />
      <Route path="privacy-policy" element={<Privacy />} />
 
      <Route element={<AuthLayout authenticationRequired={false} />}>
        <Route path="auth" element={<Auth />} />
      </Route>
 
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
