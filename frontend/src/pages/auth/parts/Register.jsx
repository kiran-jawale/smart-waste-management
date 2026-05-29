import React, { useState, useContext } from "react";
import userService from "../../../services/user.service";
import { areaOptions } from "../../../constants/forms";
import { ThemeContext } from "../../../contexts/ThemeContext";

const Register = ({ onToggleView }) => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    areacode: areaOptions[0].code,
    address: "",
    code: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await userService.register(formData);
      if (response.data && response.data.success) {
        setSuccess("Registration successful! Please log in.");
        setFormData({
          name: "",
          email: "",
          password: "",
          contact: "",
          areacode: areaOptions[0].code,
          address: "",
          code: "",
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-8 space-y-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl transition-all duration-300`}
    >
      <h2
        className={`text-3xl font-bold text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
      >
        Create Account
      </h2>

      {error && (
        <div
          className={`p-3 ${theme === "dark" ? "bg-red-900 border-red-600 text-red-200" : "bg-red-100 border-red-400 text-red-700"} border rounded-lg`}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className={`p-3 ${theme === "dark" ? "bg-green-900 border-green-600 text-green-200" : "bg-green-100 border-green-400 text-green-700"} border rounded-lg`}
        >
          {success}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.name}
          required
          className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" : "border-gray-300"}`}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" : "border-gray-300"}`}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
          className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" : "border-gray-300"}`}
        />
        <input
          name="contact"
          type="tel"
          placeholder="Contact Number"
          onChange={handleChange}
          value={formData.contact}
          required
          className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" : "border-gray-300"}`}
        />
        <input
          name="address"
          type="text"
          placeholder="Full Address"
          onChange={handleChange}
          value={formData.address}
          required
          className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" : "border-gray-300"}`}
        />

        <div>
          <label
            htmlFor="areacode"
            className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Area Code
          </label>
          <select
            id="areacode"
            name="areacode"
            value={formData.areacode}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
          >
            {areaOptions.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.code} - {opt.address}
              </option>
            ))}
          </select>
        </div>

        <input
          name="code"
          type="text"
          placeholder="Secret Code (if applicable)"
          onChange={handleChange}
          value={formData.code}
          className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" : "border-gray-300"}`}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p
        className={`text-sm text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
      >
        Already have an account?{" "}
        <button
          onClick={onToggleView}
          className={`font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default Register;
