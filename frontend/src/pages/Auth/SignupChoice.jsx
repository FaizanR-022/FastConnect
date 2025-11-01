// components/auth/SignupChoice.jsx
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { AuthContainer } from "../../components/auth/FormContainer";
import { createAuthStyles } from "../../styles/authStyles";
import { ROUTES } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

export default function SignupChoice({ props }) {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const navigate = useNavigate();

  return (
    <AuthContainer styles={styles}>
      <Box sx={{ textAlign: "center", p: { xs: 4, md: 8 } }}>
        <Typography variant="h3" sx={{ ...styles.title, mb: 2 }}>
          Join FastConnect
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 6,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Choose your account type to get started
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Student Option */}
          <Grid item xs={12} md={5}>
            <Paper
              onClick={() => navigate(ROUTES.SIGNUP_STUDENT)}
              sx={styles.signupCard}
            >
              <Box sx={styles.signupIconBox(theme.palette.gradients.student)}>
                <Typography variant="h3" sx={{ color: "white" }}>
                  🎓
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                I'm a Student
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Sign up with your @nu.edu.pk email to connect with alumni
              </Typography>
            </Paper>
          </Grid>

          {/* Alumni Option */}
          <Grid item xs={12} md={5}>
            <Paper
              onClick={() => navigate(ROUTES.SIGNUP_ALUMNI)}
              sx={styles.signupCard}
            >
              <Box sx={styles.signupIconBox(theme.palette.gradients.alumni)}>
                <Typography variant="h3" sx={{ color: "white" }}>
                  💼
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.secondary.dark,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                I'm an Alumni
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Join to mentor students and expand your network
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary, mt: 6 }}
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
      </Box>
    </AuthContainer>
  );
}
