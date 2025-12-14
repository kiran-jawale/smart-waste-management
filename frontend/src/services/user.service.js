import api from "./api";

class UserService {
  /**
   * Registers a new user.
   * @param {object} userData - { name, email, password, contact, areacode, address, status, code }
   */
  register(userData) {
    // This endpoint expects standard JSON, not FormData
    return api.post("/users/register", userData);
  }

  /**
   * Logs in a user.
   * @param {object} credentials - { loginIdentifier, password }
   */
  login(credentials) {
    return api.post("/users/login", credentials);
  }

  /**
   * Logs out the currently authenticated user.
   */
  logout() {
    return api.post("/users/logout");
  }

  /**
   * Fetches the profile of the currently logged-in user.
   */
  getMyProfile() {
    return api.get("/users/me");
  }

  /**
   * Updates the profile of the currently logged-in user.
   * @param {object} profileData - { name, contact, address, status }
   */

updateMyProfile(profileData) {
    return api.put("/users/update-profile", profileData);
  }

  // --- NEW METHOD ---
  /**
   * Sends old and new password to change the user's password.
   * @param {object} passwordData - { oldPassword, newPassword }
   */
  changePassword(passwordData) {
    return api.post("/users/change-password", passwordData);
  }
}

// Export a singleton instance of the class
export default new UserService();