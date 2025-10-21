// import { Navigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";
// import { ROUTES } from "../utils/constants";

// function ProtectedRoute({ children, requiredRole }) {
//   const { isAuthenticated, user } = useAuthStore();

//   if (!isAuthenticated) {
//     return <Navigate to={ROUTES.LOGIN} replace />;
//   }

//   // Check role if required
//   if (requiredRole && user?.role !== requiredRole) {
//     return <Navigate to={ROUTES.DASHBOARD} replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;
