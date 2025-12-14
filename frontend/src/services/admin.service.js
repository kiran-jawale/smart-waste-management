import api from "./api";

class AdminService {
  /**
   * Fetches all users. (Admin only)
   * @param {string} [role] - Optional filter by role (e.g., 'collector').
   */
  getAllUsers(role = null) {
    const params = role ? { role } : {};
    return api.get("/admin/users", { params });
  }

  /**
   * Fetches a single user by ID. (Admin only)
   * @param {string} id - The user's ID.
   */
  getUserById(id) {
    return api.get(`/admin/users/${id}`);
  }

  /**
   * Updates a user's details. (Admin only)
   * @param {string} id - The user's ID.
   * @param {object} userData - { name, contact, role, etc. }
   */
  updateUser(id, userData) {
    return api.put(`/admin/users/${id}`, userData);
  }

  /**
   * Deletes a user. (Admin only)
   * @param {string} id - The user's ID.
   */
  deleteUser(id) {
    return api.delete(`/admin/users/${id}`);
  }
}

// Export a singleton instance
export default new AdminService();