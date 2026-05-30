import api from "./api.js";

class AdminService {
  getAllUsers(role = null) {
    const params = role ? { role } : {};
    return api.get("/admin/users", { params });
  }

  getUserById(id) {
    return api.get(`/admin/users/${id}`);
  }
  updateUser(id, userData) {
    return api.put(`/admin/users/${id}`, userData);
  }

  deleteUser(id) {
    return api.delete(`/admin/users/${id}`);
  }
}

export default new AdminService();
