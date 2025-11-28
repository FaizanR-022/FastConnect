import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { ROUTES } from "../constants/constants.js";

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
}

export default PublicRoute;
