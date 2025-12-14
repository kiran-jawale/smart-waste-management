import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import userService from "../../../services/user.service";
import { areaOptions } from "../../../constants/forms"; // Import area options

const BasicSettingsForm = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    contact: user.contact || "",
    address: user.address || "",
    areacode: user.areacode || areaOptions[0].code, // Default to user's area or first option
    status: user.status || "", // Add status field
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await userService.updateMyProfile(formData);
      if (response.data && response.data.success) {
        dispatch(login(response.data.data)); // Update the user in Redux
        setSuccess("Profile updated successfully!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all";

  return (
    <div className="p-8 md:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Basic Settings
      </h1>

      {error && <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
      {success && <div className="p-3 mb-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input name="name" type="text" onChange={handleChange} value={formData.name} required className={inputStyles} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input name="email" type="email" onChange={handleChange} value={formData.email} required className={inputStyles} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Number</label>
          <input name="contact" type="tel" onChange={handleChange} value={formData.contact} required className={inputStyles} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Address</label>
          <input name="address" type="text" onChange={handleChange} value={formData.address} required className={inputStyles} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Area Code</label>
          <select name="areacode" value={formData.areacode} onChange={handleChange} className={inputStyles}>
            {areaOptions.map(opt => (
              <option key={opt.code} value={opt.code}>{opt.code} - {opt.address}</option>
            ))}
          </select>
        </div>
        {/* Only show 'status' field if user is an organisation */}
        {user.role === 'organisation' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Organisation Type (e.g., Hospital, School)</label>
            <input name="status" type="text" placeholder="Hospital, School, etc." onChange={handleChange} value={formData.status} className={inputStyles} />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default BasicSettingsForm;