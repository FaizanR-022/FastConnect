import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/constants";
import ProtectedRoute from "./ProtectedRoutes";
import EmailVerificationRoute from "./EmailVerificationRoute";

import Login from "../pages/Auth/Login";
import SignupStudent from "../pages/Auth/SignupStudent";
import SignupAlumni from "../pages/Auth/SignupAlumni";
import SignupChoice from "../pages/Auth/SignupChoice";
import VerifyEmail from "../pages/Auth/VerifyEmail";

import Home from "../pages/Home";
import AlumniList from "../pages/Alumni/AlumniList";
import Profile from "../pages/Profile";
import AlumniProfile from "../pages/Alumni/AlumniProfile";
import AllPosts from "../pages/Posts/AllPosts";
import SinglePost from "../pages/Posts/SinglePost";
import UserProfile from "../pages/User/UserProfile";
import NotificationsPage from "../pages/Notifications/NotificationsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP_CHOICE} element={<SignupChoice />} />
      <Route path={ROUTES.SIGNUP_STUDENT} element={<SignupStudent />} />
      <Route path={ROUTES.SIGNUP_ALUMNI} element={<SignupAlumni />} />

      <Route
        path={ROUTES.VERIFY_EMAIL}
        element={
          <EmailVerificationRoute>
            <VerifyEmail />
          </EmailVerificationRoute>
        }
      />

      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ALUMNI_LIST}
        element={
          <ProtectedRoute>
            <AlumniList />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ALUMNI_PROFILE}
        element={
          <ProtectedRoute>
            <AlumniProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.USER_PROFILE}
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PROFILE}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ALL_POSTS}
        element={
          <ProtectedRoute>
            <AllPosts />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SINGLE_POST}
        element={
          <ProtectedRoute>
            <SinglePost />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.NOTIFICATIONS}
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default AppRoutes;
