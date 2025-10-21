import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from './ProtectedRoute';
// import PublicRoute from './PublicRoute';
import { ROUTES } from "../constants/constants";

// Lazy load pages
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import SignupStudent from "../pages/Auth/SignupStudent";
import SignupAlumni from "../pages/Auth/SignupAlumni";
import SignupChoice from "../pages/Auth/SignupChoice";
// import Dashboard from '../pages/Student/Dashboard';
// import AlumniList from '../pages/Alumni/AlumniList';
// import AlumniProfile from '../pages/Alumni/AlumniProfile';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path={ROUTES.HOME}
        element={
          // <PublicRoute>
          <Home />
          // </PublicRoute>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          // <PublicRoute>
          <Login />
          // </PublicRoute>
        }
      />

      <Route
        path={ROUTES.SIGNUP_CHOICE}
        element={
          // <PublicRoute>
          <SignupChoice />
          // </PublicRoute>
        }
      />
      <Route
        path={ROUTES.SIGNUP_STUDENT}
        element={
          // <PublicRoute>
          <SignupStudent />
          // </PublicRoute>
        }
      />
      <Route
        path={ROUTES.SIGNUP_ALUMNI}
        element={
          // <PublicRoute>
          <SignupAlumni />
          // </PublicRoute>
        }
      />

      {/* Protected Routes
      <Route
        path={ROUTES.DASHBOARD}
        element={
          // <ProtectedRoute>
            <Dashboard />
          // </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ALUMNI_LIST}
        element={
          // <ProtectedRoute>
            <AlumniList />
          // </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ALUMNI_PROFILE}
        element={
          // <ProtectedRoute>
            <AlumniProfile />
          // </ProtectedRoute>
        }
      /> */}

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default AppRoutes;
