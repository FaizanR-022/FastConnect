import api from "./api";
import { API_ENDPOINTS } from "../constants/constants";
import { handleApiCall } from "../utils/apiHandler";

export const feedbackService = {
  // Submit feedback
  submitFeedback: async (feedbackData) => {
    return handleApiCall(
      () => api.post(API_ENDPOINTS.CREATE_FEEDBACK, feedbackData),
      "Failed to submit feedback. Please try again."
    );
  },

  // // Get user's own feedbacks
  // getMyFeedbacks: async () => {
  //   return handleApiCall(
  //     () => api.get(API_ENDPOINTS.GET_MY_FEEDBACKS),
  //     "Failed to fetch your feedbacks. Please try again."
  //   );
  // },

  // // Admin: Get all feedbacks
  // getAllFeedbacks: async (params) => {
  //   return handleApiCall(
  //     () => api.get(API_ENDPOINTS.GET_ALL_FEEDBACKS, { params }),
  //     "Failed to fetch feedbacks. Please try again."
  //   );
  // },

  // // Admin: Update feedback status
  // updateFeedbackStatus: async (id, status) => {
  //   return handleApiCall(
  //     () =>
  //       api.patch(API_ENDPOINTS.UPDATE_FEEDBACK_STATUS.replace(":id", id), {
  //         status,
  //       }),
  //     "Failed to update feedback status. Please try again."
  //   );
  // },
};

export default feedbackService;
