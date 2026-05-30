import api from "./api.js";

class ReportService {
  createReport(formData) {
    return api.post("/reports", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateReport(id, updateData) {
    return api.put(`/reports/${id}`, updateData);
  }

  deleteReport(id) {
    return api.delete(`/reports/${id}`);
  }

  getMyReports() {
    return api.get("/reports/my-reports");
  }

  getAreaReports(status = null) {
    const params = status ? { status } : {};
    return api.get("/reports/area", { params });
  }

  getAllReports(filters = {}) {
    return api.get("/reports", { params: filters });
  }

  getReportById(id) {
    return api.get(`/reports/${id}`);
  }

  markAreaCollected(data) {
    return api.post("/reports/mark-area", data);
  }
}

export default new ReportService();
