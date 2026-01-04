import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Header from "../components/layout/Header/Header";
import { Box } from "@mui/material";
import { Footer } from "../components/layout/Footer/Footer";
import { ROUTES } from "../constants/constants";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, token, user, logout } = useAuthStore();

  if (!isAuthenticated || !token || !user) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
  }

  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = tokenPayload.exp * 1000;
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      logout();
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    logout();
    return <Navigate to="/login" replace />;
  }

  if (!user.isEmailVerified) {
    return <Navigate to={ROUTES.VERIFY_EMAIL} replace />;
  }

  return (
    <>
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </>
  );
};

export default ProtectedRoute;
