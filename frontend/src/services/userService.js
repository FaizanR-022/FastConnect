// services/userService.js
import api from "./api";
import { API_ENDPOINTS } from "../constants/constants";
import { handleApiCall } from "../utils/apiHandler";

export const userService = {
  // Get current user profile
  getUserProfile: async () => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_USER_PROFILE),
      "Failed to fetch user profile. Please try again."
    );
  },

  // Update user profile
  updateUserProfile: async (userData) => {
    return handleApiCall(
      () => api.put(API_ENDPOINTS.UPDATE_USER_PROFILE, userData),
      "Failed to update profile. Please try again."
    );
  },

  // Delete user account
  deleteUserAccount: async () => {
    return handleApiCall(
      () => api.delete(API_ENDPOINTS.DELETE_USER_ACCOUNT),
      "Failed to delete account. Please try again."
    );
  },
};

export default userService;
