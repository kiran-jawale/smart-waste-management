import api from "./api";

class UserService {
  register(userData) {
    return api.post("/users/register", userData);
  }

  login(credentials) {
    return api.post("/users/login", credentials);
  }

  logout() {
    return api.post("/users/logout");
  }

  getMyProfile() {
    return api.get("/users/me");
  }

  updateMyProfile(profileData) {
    return api.put("/users/update-profile", profileData);
  }

  changePassword(passwordData) {
    return api.post("/users/change-password", passwordData);
  }
}

export default new UserService();
