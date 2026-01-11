import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { ROUTES } from "@/constants/constants";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function PublicRoute({ children, darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // If authenticated and email verified, redirect to home
    if (isAuthenticated && user?.isEmailVerified) {
      navigate(ROUTES.HOME, { replace: true });
      return;
    }

    // If authenticated but email not verified, redirect to verify email
    if (isAuthenticated && !user?.isEmailVerified) {
      navigate(ROUTES.VERIFY_EMAIL, { replace: true });
      return;
    }
  }, [isAuthenticated, user, navigate]);

  // Don't render anything while redirecting to prevent flash
  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
