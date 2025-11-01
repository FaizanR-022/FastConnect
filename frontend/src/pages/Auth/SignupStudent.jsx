import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  FormHelperText,
} from "@mui/material";
import { UserPlus } from "lucide-react";
import { FormContainer } from "../../components/auth/FormContainer";
import { PageHeader } from "../../components/auth/PageHeader";
import { createAuthStyles } from "../../styles/authStyles";
import { DEPARTMENTS, BATCH_YEARS } from "../../constants/authConstants";
import { studentSignupSchema } from "../../utils/validationSchemas";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/constants";

export default function SignupStudent({ props }) {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(studentSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      batch: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Student signup submitted:", data);
      // Handle signup logic here
      // await authService.signupStudent(data);
      reset();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <FormContainer name="signupStudent">
      <PageHeader
        icon={UserPlus}
        title="Student Registration"
        subtitle="Create your account using your @nu.edu.pk email address"
      />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Box sx={{ flex: 1 }}>
              {/* <Grid container spacing={2}> */}
              {/* <Grid item xs={12} sm={6}> */}
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
              {/* </Grid> */}
              {/* <Grid item xs={12} sm={6}> */}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
              {/* </Grid> */}
              {/* </Grid> */}
            </Box>
          </Stack>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="University Email"
                type="email"
                variant="outlined"
                fullWidth
                size="small"
                placeholder="your.name@nu.edu.pk"
                error={!!errors.email}
                helperText={
                  errors.email?.message || "Must be a valid @nu.edu.pk email"
                }
              />
            )}
          />

          {/* <Grid container spacing={2}> */}
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Box sx={{ flex: 1 }}>
              {/* <Grid item xs={12} sm={6}> */}
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    size="small"
                    error={!!errors.department}
                  >
                    <InputLabel>Department</InputLabel>
                    <Select {...field} label="Department">
                      {DEPARTMENTS.map((dept) => (
                        <MenuItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.department && (
                      <FormHelperText>
                        {errors.department.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>
            {/* </Grid> */}
            {/* <Grid item xs={12} sm={6}> */}
            <Box sx={{ flex: 1 }}>
              <Controller
                name="batch"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small" error={!!errors.batch}>
                    <InputLabel>Batch Year</InputLabel>
                    <Select {...field} label="Batch Year">
                      {BATCH_YEARS.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.batch && (
                      <FormHelperText>{errors.batch.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>
          </Stack>

          <Controller
            name="profilePicture"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Profile Picture URL (Optional)"
                variant="outlined"
                fullWidth
                size="small"
                placeholder="https://example.com/your-photo.jpg"
                error={!!errors.profilePicture}
                helperText={
                  errors.profilePicture?.message ||
                  "Paste a link to your profile picture"
                }
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

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={styles.submitButton}
          >
            {isSubmitting ? "Creating Account..." : "Create Student Account"}
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
          >
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate(ROUTES.LOGIN)}
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
