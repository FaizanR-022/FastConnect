// components/auth/Login.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LogIn } from "lucide-react";

import { FormContainer } from "../../components/auth/FormContainer";
import { PageHeader } from "../../components/auth/PageHeader";
import { InfoSection } from "../../components/auth/InfoSection";
import { createAuthStyles } from "../../styles/authStyles";
import { INFO_CONTENT } from "../../constants/authConstants";

export default function Login({ onNavigate = () => {} }) {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    // Handle login logic here
    onNavigate("alumni");
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContainer name="login">
      <PageHeader
        icon={LogIn}
        title="Welcome Back"
        subtitle="Login to access your FAST-NUCES Alumni Portal account"
      />

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
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

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange("rememberMe", e.target.checked)}
                  sx={{
                    color: theme.palette.primary.main,
                    "&.Mui-checked": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  Remember me
                </Typography>
              }
            />
            <Typography variant="body2" sx={styles.link}>
              Forgot Password?
            </Typography>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={styles.submitButton}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
          >
            Don't have an account?{" "}
            <Box
              component="span"
              onClick={() => onNavigate("signup-choice")}
              sx={styles.link}
            >
              Sign up here
            </Box>
          </Typography>
        </Stack>
      </Box>
    </FormContainer>
  );
}
