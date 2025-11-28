import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { User, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createAuthStyles } from "../../styles/authStyles";
import { updateStudentProfileSchema } from "../../utils/profileValidationSchemas";
import { userService } from "../../services/userService";
import useAuthStore from "../../store/authStore";
import { ROUTES } from "../../constants/constants";
import Loader from "../../components/common/Loader";

export default function StudentProfile() {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateStudentProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      profilePicture: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await userService.getUserProfile();

        // Pre-fill form with current data
        reset({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          profilePicture: data.user.profilePicture || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const result = await userService.updateUserProfile(data);

      // Update Zustand store with new user data
      updateUser(result.user);

      setSuccess("Profile updated successfully!");

      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate(ROUTES.ALUMNI_LIST);
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={styles.pageContainer}>
      <Container sx={{ py: { xs: 3, md: 6 }, position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowLeft size={20} />}
              onClick={() => navigate(-1)}
              sx={{
                textTransform: "none",
                color: theme.palette.primary.main,
              }}
            >
              Back
            </Button>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              ...styles.paper,
              p: { xs: 3, md: 4 },
            }}
          >
            {/* Profile Header */}
            <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  background: theme.palette.gradients.primary,
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </Avatar>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" sx={styles.title}>
                  Edit Profile
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary, mt: 0.5 }}
                >
                  Update your personal information
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ mb: 4 }} />

            {/* Alerts */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {/* Read-only Info */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Account Information
              </Typography>
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{user?.email}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1">{user?.department}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Campus
                  </Typography>
                  <Typography variant="body1">{user?.campus}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Batch Year
                  </Typography>
                  <Typography variant="body1">{user?.batch}</Typography>
                </Box>
              </Stack>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Editable Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Editable Information
              </Typography>

              <Stack spacing={3}>
                {/* First Name */}
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />

                {/* Last Name */}
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />

                {/* Profile Picture */}
                <Controller
                  name="profilePicture"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Profile Picture URL (Optional)"
                      variant="outlined"
                      fullWidth
                      placeholder="https://example.com/your-photo.jpg"
                      error={!!errors.profilePicture}
                      helperText={
                        errors.profilePicture?.message ||
                        "Paste a link to your profile picture"
                      }
                    />
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={submitting || !isDirty}
                  startIcon={submitting ? null : <Save size={20} />}
                  sx={styles.submitButton}
                >
                  {submitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>

                {!isDirty && (
                  <Typography
                    variant="caption"
                    sx={{
                      textAlign: "center",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Make changes to enable the save button
                  </Typography>
                )}
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
