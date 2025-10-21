// components/auth/StudentSignup.jsx
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
import { UserPlus } from "lucide-react";
import { FormContainer } from "../../components/auth/FormContainer";
import { PageHeader } from "../../components/auth/PageHeader";
import { InfoSection } from "../../components/auth/InfoSection";
import { createAuthStyles } from "../../styles/authStyles";
import { DEPARTMENTS, INFO_CONTENT } from "../../constants/authConstants";

export default function SignupStudent({ onNavigate = () => {} }) {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    graduationYear: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student signup submitted:", formData);
    // Handle signup logic here
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer name="signupStudent">
      <PageHeader
        icon={UserPlus}
        title="Student Registration"
        subtitle="Create your account using your @nu.edu.pk email address"
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
            label="University Email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="your.name@nu.edu.pk"
            required
            size="small"
            helperText="Must be a valid @nu.edu.pk email"
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
            label="Expected Graduation Year"
            variant="outlined"
            fullWidth
            value={formData.graduationYear}
            onChange={(e) => handleChange("graduationYear", e.target.value)}
            placeholder="e.g., 2025"
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
            Create Student Account
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
