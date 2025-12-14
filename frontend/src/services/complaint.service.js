import api from "./api";

class ComplaintService {
  /**
   * Creates a new complaint.
   * NOTE: The component must send a 'FormData' object.
   * @param {FormData} formData - Must contain 'subject', 'description', 'image1', etc.
   */
  createComplaint(formData) {
    return api.post("/complaints", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Updates the status of a complaint. (Admin/Collector)
   * @param {string} id - The ID of the complaint.
   * @param {string} status - The new status (e.g., 'in-progress', 'resolved').
   */
  updateComplaintStatus(id, status) {
    return api.put(`/complaints/${id}`, { status });
  }

  /**
   * Deletes a complaint. (Admin only)
   * @param {string} id - The ID of the complaint.
   */
  deleteComplaint(id) {
    return api.delete(`/complaints/${id}`);
  }

  /**
   * Fetches complaints submitted by the logged-in user. (Citizen/Org)
   */
  getMyComplaints() {
    return api.get("/complaints/my-complaints");
  }

  /**
   * Fetches all complaints. (Admin/Collector)
   * @param {string} [status] - Optional filter by status (e.g., 'pending').
   */
  getAllComplaints(status = null) {
    const params = status ? { status } : {};
    return api.get("/complaints", { params });
  }

  /**
   * Fetches a single complaint by its ID. (Admin/Collector)
   * @param {string} id - The ID of the complaint.
   */
  getComplaintById(id) {
    return api.get(`/complaints/${id}`);
  }
}

// Export a singleton instance
export default new ComplaintService();