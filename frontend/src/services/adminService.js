import api from "./api";
import { API_ENDPOINTS } from "../constants/constants";
import { handleApiCall } from "../utils/apiHandler";

export const adminService = {
  getAllStudents: async (params = {}) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.ADMIN_STUDENTS, { params }),
      "Failed to fetch students. Admin access required.",
    );
  },
};

export default adminService;
