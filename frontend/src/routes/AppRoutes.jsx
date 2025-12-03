import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/constants";

// Lazy load pages
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import SignupStudent from "../pages/Auth/SignupStudent";
import SignupAlumni from "../pages/Auth/SignupAlumni";
import SignupChoice from "../pages/Auth/SignupChoice";
import AlumniList from "../pages/Alumni/AlumniList";
import Profile from "../pages/Profile";
import AlumniProfile from "../pages/Alumni/AlumniProfile";
import PostsFeed from "../pages/Posts/PostsFeed";
import MyPosts from "../pages/Posts/MyPosts";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP_CHOICE} element={<SignupChoice />} />
      <Route path={ROUTES.SIGNUP_STUDENT} element={<SignupStudent />} />
      <Route path={ROUTES.SIGNUP_ALUMNI} element={<SignupAlumni />} />
      <Route path={ROUTES.ALUMNI_LIST} element={<AlumniList />} />

      {/* Protected Routes */}
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.ALUMNI_PROFILE} element={<AlumniProfile />} />

      {/* Posts Routes */}
      <Route path={ROUTES.POSTS} element={<PostsFeed />} />
      <Route path={ROUTES.MY_POSTS} element={<MyPosts />} />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default AppRoutes;
