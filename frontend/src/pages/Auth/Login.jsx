// pages/Auth/Login.jsx
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  useTheme,
  FormHelperText,
} from "@mui/material";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/constants";
import { FormContainer } from "../../components/auth/FormContainer";
import { PageHeader } from "../../components/auth/PageHeader";
import { createAuthStyles } from "../../styles/authStyles";
import { loginSchema } from "../../utils/validationSchemas";

export default function Login({ props }) {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Login submitted:", data);
      // Handle login logic here
      // await authService.login(data);
      // onNavigate("alumni");
      navigate(ROUTES.ALUMNI_LIST);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <FormContainer name="login">
      <PageHeader
        icon={LogIn}
        title="Welcome Back"
        subtitle="Login to access your FAST-NUCES Alumni Portal account"
      />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
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
              )}
            />
            <Typography variant="body2" sx={styles.link}>
              Forgot Password?
            </Typography>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={styles.submitButton}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
          >
            Don't have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate(ROUTES.SIGNUP_CHOICE)}
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
