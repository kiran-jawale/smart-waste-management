import React, { useState,useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import adminService from "../../../services/admin.service";
import ModalContainer from "../../../components/ModalContainer";

const EditUserModal = ({ user, onClose, onUpdateSuccess, theme }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    contact: user.contact || "",
    address: user.address || "",
    areacode: user.areacode || "",
    role: user.role || "citizen",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputStyles = `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
    theme === "dark"
      ? "border-gray-600 bg-gray-700 text-white"
      : "border-gray-300 bg-gray-50 text-gray-900"
  }`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminService.updateUser(user._id, formData);
      onUpdateSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalContainer isOpen={!!user} onClose={onClose}>
      <h2
        className={`text-xl font-semibold mb-5 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Edit User: {user.name}
      </h2>
      {error && (
        <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Contact
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>
        <div>
          <label
            className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={inputStyles}
          >
            <option value="citizen">Citizen</option>
            <option value="organisation">Organisation</option>
            <option value="collector">Collector</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${theme === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"} ${theme === "dark" ? "text-white" : "text-gray-800"} transition-colors`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

const UserManagement = ({ users, theme, onFetchData }) => {
  const [userSearch, setUserSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const inputStyles = `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
    theme === "dark"
      ? "border-gray-600 bg-gray-700 text-white"
      : "border-gray-300 bg-gray-50 text-gray-900"
  }`;

  const openEditModal = (userToEdit) => {
    setEditingUser(userToEdit);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };
  const handleUpdateSuccess = () => {
    closeModal();
    onFetchData();
  };

  const handleDeleteUser = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to PERMANENTLY delete this user? This action cannot be undone."
      )
    ) {
      try {
        await adminService.deleteUser(id);
        onFetchData();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <>
      <div
        className={`p-6 md:p-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-xl`}
      >
        <h2
          className={`text-2xl font-semibold mb-5 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          User Management
        </h2>
        <input
          type="text"
          placeholder="Search users by name or email..."
          onChange={(e) => setUserSearch(e.target.value)}
          className={`${inputStyles} mb-4`}
        />
        <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <li
                key={u._id}
                className={`p-4 ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"} rounded-lg flex flex-col sm:flex-row justify-between sm:items-center`}
              >
                <div>
                  <span
                    className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                  >
                    {u.name}
                  </span>
                  <span
                    className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} sm:ml-2`}
                  >
                    ({u.email})
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <span
                    className={`text-sm font-medium capitalize ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                  >
                    {u.role}
                  </span>
                  {u.role !== "admin" ? (
                    <>
                      <button
                        onClick={() => openEditModal(u)}
                        className={`text-sm font-medium ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className={`text-sm font-medium ${theme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-800"}`}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <span
                      className={`text-xs font-medium ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                    >
                      (No Actions)
                    </span>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-center py-4`}
            >
              No users found.
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <EditUserModal
          user={editingUser}
          onClose={closeModal}
          onUpdateSuccess={handleUpdateSuccess}
          theme={theme}
        />
      )}
    </>
  );
};

export default UserManagement;
