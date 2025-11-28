import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { User, Save, ArrowLeft, Plus, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createAuthStyles } from "../../styles/authStyles";
import { updateAlumniProfileSchema } from "../../utils/profileValidationSchemas";
import { userService } from "../../services/userService";
import useAuthStore from "../../store/authStore";
import { ROUTES } from "../../constants/constants";
import { YEARS } from "../../constants/authConstants";
import Loader from "../../components/common/Loader";

export default function AlumniProfile() {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const navigate = useNavigate();
  const { user, updateUser } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateAlumniProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      currentCompany: "",
      currentPosition: "",
      currentCity: "",
      currentCountry: "",
      linkedin: "",
      profilePicture: "",
      previousExperiences: [],
      skills: [],
    },
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "previousExperiences",
  });

  const skills = watch("skills");

  // Fetch user profile on mount
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
          phone: data.user.phone || "",
          currentCompany: data.user.currentCompany || "",
          currentPosition: data.user.currentPosition || "",
          currentCity: data.user.currentCity || "",
          currentCountry: data.user.currentCountry || "",
          linkedin: data.user.linkedIn || "",
          profilePicture: data.user.profilePicture || "",
          previousExperiences: data.user.previousExperiences || [],
          skills: data.user.skills || [],
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

  const addSkill = () => {
    if (newSkill.trim() && !skills.find((s) => s.name === newSkill.trim())) {
      setValue("skills", [...skills, { name: newSkill.trim() }], {
        shouldDirty: true,
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setValue(
      "skills",
      skills.filter((_, i) => i !== index),
      { shouldDirty: true }
    );
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={styles.pageContainer}>
      <Container
        sx={{ py: { xs: 3, md: 6 }, position: "relative", zIndex: 1 }}
        maxWidth="lg"
      >
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
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
                  Update your professional information
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
                    Graduation Year
                  </Typography>
                  <Typography variant="body1">
                    {user?.graduationYear}
                  </Typography>
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
                  mb: 3,
                }}
              >
                Personal Information
              </Typography>

              <Stack spacing={3}>
                {/* First & Last Name */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
                </Stack>

                {/* Phone */}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number (Optional)"
                      variant="outlined"
                      fullWidth
                      placeholder="+92 300 1234567"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Current Position
                </Typography>

                {/* Current Company & Position */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Controller
                    name="currentCompany"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Current Company"
                        variant="outlined"
                        fullWidth
                        error={!!errors.currentCompany}
                        helperText={errors.currentCompany?.message}
                      />
                    )}
                  />
                  <Controller
                    name="currentPosition"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Current Position"
                        variant="outlined"
                        fullWidth
                        error={!!errors.currentPosition}
                        helperText={errors.currentPosition?.message}
                      />
                    )}
                  />
                </Stack>

                {/* Current City & Country */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Controller
                    name="currentCity"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Current City"
                        variant="outlined"
                        fullWidth
                        error={!!errors.currentCity}
                        helperText={errors.currentCity?.message}
                      />
                    )}
                  />
                  <Controller
                    name="currentCountry"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Current Country"
                        variant="outlined"
                        fullWidth
                        error={!!errors.currentCountry}
                        helperText={errors.currentCountry?.message}
                      />
                    )}
                  />
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Previous Experiences */}
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                      }}
                    >
                      Previous Experience
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Plus size={16} />}
                      onClick={() =>
                        appendExperience({
                          company: "",
                          role: "",
                          from: "",
                          to: "",
                        })
                      }
                      sx={{
                        textTransform: "none",
                        color: theme.palette.primary.main,
                      }}
                    >
                      Add Experience
                    </Button>
                  </Stack>

                  {experienceFields.map((field, index) => (
                    <Box
                      key={field.id}
                      sx={{
                        p: 2,
                        mb: 2,
                        border: `1px solid ${theme.palette.grey[300]}`,
                        borderRadius: 2,
                        position: "relative",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => removeExperience(index)}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          color: theme.palette.error.main,
                        }}
                      >
                        <Trash2 size={18} />
                      </IconButton>

                      <Stack spacing={2} sx={{ mt: 2 }}>
                        <Controller
                          name={`previousExperiences.${index}.company`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Company Name"
                              variant="outlined"
                              fullWidth
                              size="small"
                              error={
                                !!errors.previousExperiences?.[index]?.company
                              }
                              helperText={
                                errors.previousExperiences?.[index]?.company
                                  ?.message
                              }
                            />
                          )}
                        />

                        <Controller
                          name={`previousExperiences.${index}.position`}
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Role"
                              variant="outlined"
                              fullWidth
                              size="small"
                              error={
                                !!errors.previousExperiences?.[index]?.position
                              }
                              helperText={
                                errors.previousExperiences?.[index]?.position
                                  ?.message
                              }
                            />
                          )}
                        />

                        <Stack direction="row" spacing={2}>
                          <Controller
                            name={`previousExperiences.${index}.from`}
                            control={control}
                            render={({ field }) => (
                              <FormControl
                                fullWidth
                                size="small"
                                error={
                                  !!errors.previousExperiences?.[index]?.from
                                }
                              >
                                <InputLabel>From</InputLabel>
                                <Select {...field} label="From">
                                  {YEARS.map((year) => (
                                    <MenuItem key={year} value={year}>
                                      {year}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                          <Controller
                            name={`previousExperiences.${index}.to`}
                            control={control}
                            render={({ field }) => (
                              <FormControl
                                fullWidth
                                size="small"
                                error={
                                  !!errors.previousExperiences?.[index]?.to
                                }
                              >
                                <InputLabel>To</InputLabel>
                                <Select {...field} label="To">
                                  {YEARS.map((year) => (
                                    <MenuItem key={year} value={year}>
                                      {year}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          />
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Skills */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    Skills & Expertise
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <TextField
                      label="Add Skill"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleSkillKeyPress}
                      placeholder="e.g., React, Node.js"
                    />
                    <Button
                      variant="contained"
                      onClick={addSkill}
                      sx={{
                        minWidth: "100px",
                        background: theme.palette.gradients.primary,
                      }}
                    >
                      Add
                    </Button>
                  </Stack>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      minHeight: "50px",
                    }}
                  >
                    {skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill.name}
                        onDelete={() => removeSkill(index)}
                        deleteIcon={<X size={16} />}
                        sx={{
                          background:
                            "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                          color: theme.palette.primary.dark,
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* LinkedIn & Profile Picture */}
                <Controller
                  name="linkedin"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="LinkedIn URL (Optional)"
                      variant="outlined"
                      fullWidth
                      placeholder="https://linkedin.com/in/yourprofile"
                      error={!!errors.linkedin}
                      helperText={errors.linkedin?.message}
                    />
                  )}
                />

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
