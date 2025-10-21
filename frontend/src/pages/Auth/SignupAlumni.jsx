// components/auth/AlumniSignup.jsx
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { FormContainer } from "../../components/auth/FormContainer";
import { PageHeader } from "../../components/auth/PageHeader";
import { InfoSection } from "../../components/auth/InfoSection";
import { createAuthStyles } from "../../styles/authStyles";
import { UserPlus } from "lucide-react";
import { DEPARTMENTS, INFO_CONTENT } from "../../constants/authConstants";

export default function SignupAlumni({ onNavigate = () => {} }) {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    graduationYear: "",
    currentCompany: "",
    jobRole: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Alumni signup submitted:", formData);
    // Handle signup logic here
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer name="signupAlumni">
      <PageHeader
        icon={UserPlus}
        title="Alumni Registration"
        subtitle="Join as an alumni and help guide the next generation"
      />

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            required
            size="small"
          />

          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your.email@example.com"
            required
            size="small"
          />

          <TextField
            label="Phone Number (Optional)"
            variant="outlined"
            fullWidth
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            size="small"
          />

          <FormControl fullWidth required size="small">
            <InputLabel>Department</InputLabel>
            <Select
              value={formData.department}
              label="Department"
              onChange={(e) => handleChange("department", e.target.value)}
            >
              {DEPARTMENTS.map((dept) => (
                <MenuItem key={dept.value} value={dept.value}>
                  {dept.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Graduation Year"
            variant="outlined"
            fullWidth
            value={formData.graduationYear}
            onChange={(e) => handleChange("graduationYear", e.target.value)}
            placeholder="e.g., 2020"
            required
            size="small"
          />

          <TextField
            label="Current Company"
            variant="outlined"
            fullWidth
            value={formData.currentCompany}
            onChange={(e) => handleChange("currentCompany", e.target.value)}
            required
            size="small"
          />

          <TextField
            label="Job Role"
            variant="outlined"
            fullWidth
            value={formData.jobRole}
            onChange={(e) => handleChange("jobRole", e.target.value)}
            placeholder="e.g., Software Engineer"
            required
            size="small"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
            size="small"
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            required
            size="small"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={styles.submitButton}
          >
            Create Alumni Account
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
          >
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => onNavigate("login")}
              sx={styles.link}
            >
              Login here
            </Box>
          </Typography>
        </Stack>
      </Box>
    </FormContainer>
  );
}
