import api from "./api";

class ComplaintService {
  createComplaint(formData) {
    return api.post("/complaints", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateComplaintStatus(id, status) {
    return api.put(`/complaints/${id}`, { status });
  }

  deleteComplaint(id) {
    return api.delete(`/complaints/${id}`);
  }

  getMyComplaints() {
    return api.get("/complaints/my-complaints");
  }

  getAllComplaints(status = null) {
    const params = status ? { status } : {};
    return api.get("/complaints", { params });
  }

  getComplaintById(id) {
    return api.get(`/complaints/${id}`);
  }
}

export default new ComplaintService();
