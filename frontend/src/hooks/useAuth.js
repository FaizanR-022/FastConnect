import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import authService from "../services/authService";
import { ROUTES } from "../constants/constants";

export const useAuth = () => {
  const navigate = useNavigate();
  const { login: storeLogin, logout: storeLogout } = useAuthStore();

  const [error, setError] = useState("");

  const login = async (credentials) => {
    try {
      setError("");

      const { token, user } = await authService.login(credentials);
      storeLogin(user, token);
      navigate(ROUTES.ALUMNI_LIST);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signupStudent = async (studentData) => {
    try {
      setError("");

      const { token, user } = await authService.signupStudent(studentData);
      storeLogin(user, token);
      navigate(ROUTES.ALUMNI_LIST);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signupAlumni = async (alumniData) => {
    try {
      setError("");
      console.log(alumniData);
      const { token, user } = await authService.signupAlumni(alumniData);
      storeLogin(user, token);
      navigate(ROUTES.ALUMNI_LIST);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    storeLogout();
    navigate(ROUTES.LOGIN);
  };

  const clearError = () => setError("");

  return {
    login,
    signupStudent,
    signupAlumni,
    logout,
    error,
    clearError,
  };
};
