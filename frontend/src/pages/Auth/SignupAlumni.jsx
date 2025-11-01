// pages/Auth/SignupAlumni.jsx
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
  FormHelperText,
  IconButton,
  Divider,
} from "@mui/material";
import { UserPlus, Plus, Trash2 } from "lucide-react";

import { FormContainer } from "../../components/auth/FormContainer";
import { PageHeader } from "../../components/auth/PageHeader";
import { createAuthStyles } from "../../styles/authStyles";
import {
  DEPARTMENTS,
  GRADUATION_YEARS,
  YEARS,
} from "../../constants/authConstants";
import { alumniSignupSchema } from "../../utils/validationSchemas";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/constants";

export default function SignupAlumni({ props }) {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(alumniSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      graduationYear: "",
      currentCompany: "",
      currentPosition: "",
      previousCompanies: [],
      city: "",
      country: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "previousCompanies",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Alumni signup submitted:", data);
      // Handle signup logic here
      // await authService.signupAlumni(data);
      reset();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const addPreviousCompany = () => {
    append({ company: "", role: "", from: "", to: "" });
  };

  return (
    <FormContainer name="signupAlumni">
      <PageHeader
        icon={UserPlus}
        title="Alumni Registration"
        subtitle="Join as an alumni and help guide the next generation"
      />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* First Name & Last Name */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ flex: 1 }}>
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
            </Box>
          </Stack>

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
                placeholder="your.email@example.com"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number (Optional)"
                variant="outlined"
                fullWidth
                size="small"
                placeholder="+92 300 1234567"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />

          {/* Department & Graduation Year */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ flex: 1 }}>
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
            <Box sx={{ flex: 1 }}>
              <Controller
                name="graduationYear"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    size="small"
                    error={!!errors.graduationYear}
                  >
                    <InputLabel>Graduation Year</InputLabel>
                    <Select {...field} label="Graduation Year">
                      {GRADUATION_YEARS.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.graduationYear && (
                      <FormHelperText>
                        {errors.graduationYear.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>
          </Stack>

          {/* Current Company & Position */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Controller
                name="currentCompany"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Current Company"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.currentCompany}
                    helperText={errors.currentCompany?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Controller
                name="currentPosition"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Current Position"
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="e.g., Software Engineer"
                    error={!!errors.currentPosition}
                    helperText={errors.currentPosition?.message}
                  />
                )}
              />
            </Box>
          </Stack>

          {/* City & Country */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    variant="outlined"
                    fullWidth
                    size="small"
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </Box>
          </Stack>

          {/* Previous Companies Section */}
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1.5 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Previous Companies (Optional)
              </Typography>
              <Button
                size="small"
                startIcon={<Plus size={16} />}
                onClick={addPreviousCompany}
                sx={{
                  textTransform: "none",
                  color: theme.palette.primary.main,
                }}
              >
                Add Company
              </Button>
            </Stack>

            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  p: 2,
                  pt: 6,
                  mb: 2,
                  border: `1px solid ${theme.palette.grey[300]}`,
                  borderRadius: 2,
                  position: "relative",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => remove(index)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: theme.palette.error.main,
                  }}
                >
                  <Trash2 size={18} />
                </IconButton>

                <Stack spacing={2}>
                  <Controller
                    name={`previousCompanies.${index}.company`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors.previousCompanies?.[index]?.company}
                        helperText={
                          errors.previousCompanies?.[index]?.company?.message
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`previousCompanies.${index}.role`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Role"
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors.previousCompanies?.[index]?.role}
                        helperText={
                          errors.previousCompanies?.[index]?.role?.message
                        }
                      />
                    )}
                  />

                  {/* From & To Years */}
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Controller
                        name={`previousCompanies.${index}.from`}
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            fullWidth
                            size="small"
                            error={!!errors.previousCompanies?.[index]?.from}
                          >
                            <InputLabel>From</InputLabel>
                            <Select {...field} label="From">
                              {YEARS.map((year) => (
                                <MenuItem key={year} value={year}>
                                  {year}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.previousCompanies?.[index]?.from && (
                              <FormHelperText>
                                {errors.previousCompanies[index].from.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Controller
                        name={`previousCompanies.${index}.to`}
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            fullWidth
                            size="small"
                            error={!!errors.previousCompanies?.[index]?.to}
                          >
                            <InputLabel>To</InputLabel>
                            <Select {...field} label="To">
                              {YEARS.map((year) => (
                                <MenuItem key={year} value={year}>
                                  {year}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.previousCompanies?.[index]?.to && (
                              <FormHelperText>
                                {errors.previousCompanies[index].to.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 1 }} />

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

          {/* Password Fields */}
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
            {isSubmitting ? "Creating Account..." : "Create Alumni Account"}
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
