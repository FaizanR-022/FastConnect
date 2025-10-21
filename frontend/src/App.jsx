import { Box, ThemeProvider } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import theme from "./global/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <AppRoutes />
        {/* <SignupChoice /> */}
      </Box>
    </ThemeProvider>
  );
}

export default App;

// import React from 'react';
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import theme from './theme/theme';

// // Import auth components
// import { Login } from './components/auth/Login';
// import { StudentSignup } from './components/auth/StudentSignup';
// import { AlumniSignup } from './components/auth/AlumniSignup';
// import { SignupChoice } from './components/auth/SignupChoice';

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignupChoice />} />
//           <Route path="/signup/student" element={<StudentSignup />} />
//           <Route path="/signup/alumni" element={<AlumniSignup />} />
//           {/* Add more routes as needed */}
//         </Routes>
//       </BrowserRouter>
//     </ThemeProvider>
//   );
// }

// export default App;
