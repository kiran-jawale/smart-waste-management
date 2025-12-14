import api from "./api";

class ReportService {
  /**
   * Creates a new waste report.
   * NOTE: The component must send a 'FormData' object.
   * @param {FormData} formData - Must contain 'category', 'areacode', 'image', etc.
   */
  createReport(formData) {
    return api.post("/reports", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Updates an existing report. (Admin/Collector)
   * @param {string} id - The ID of the report.
   * @param {object} updateData - { status, collectionTime, departureTime, etc. }
   */
  updateReport(id, updateData) {
    return api.put(`/reports/${id}`, updateData);
  }

  /**
   * Deletes a report. (Admin only)
   * @param {string} id - The ID of the report.
   */
  deleteReport(id) {
    return api.delete(`/reports/${id}`);
  }

  /**
   * Fetches reports submitted by the logged-in user. (Citizen/Org)
   */
  getMyReports() {
    return api.get("/reports/my-reports");
  }

  /**
   * Fetches reports for the logged-in user's area. (Admin/Collector)
   * @param {string} [status] - Optional filter by status (e.g., 'scheduled').
   */
  getAreaReports(status = null) {
    const params = status ? { status } : {};
    return api.get("/reports/area", { params });
  }

  /**
   * Fetches all reports in the system. (Admin only)
   * @param {object} [filters] - Optional filters { status, areacode }.
   */
  getAllReports(filters = {}) {
    return api.get("/reports", { params: filters });
  }

  /**
   * Fetches a single report by its ID. (Admin/Collector)
   * @param {string} id - The ID of the report.
   */
  getReportById(id) {
    return api.get(`/reports/${id}`);
  }

  // --- NEW METHOD ---
  /**
   * Creates a new report to mark an entire area as collected.
   * @param {object} data - { areacode, reason }
   */
  markAreaCollected(data) {
    return api.post("/reports/mark-area", data);
  }
}

// Export a singleton instance
export default new ReportService();