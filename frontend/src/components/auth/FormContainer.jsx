import { Container, Paper, Box, useTheme, Grid } from "@mui/material";
import { createAuthStyles } from "../../styles/authStyles";
import { BackgroundBlobs } from "./BackgroundBlobs";
import { InfoSection } from "./InfoSection";
import { INFO_CONTENT } from "../../constants/authConstants";

export const FormContainer = ({ children, name }) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  const content = {
    login: INFO_CONTENT.login,
    signupStudent: INFO_CONTENT.signupStudent,
    signupAlumni: INFO_CONTENT.signupAlumni,
  };

  return (
    <Box sx={styles.pageContainer}>
      <BackgroundBlobs />
      <Container sx={{ py: { xs: 3, md: 6 }, position: "relative", zIndex: 1 }}>
        <Paper elevation={0} sx={styles.paper}>
          <Grid
            container
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: "stretch",
            }}
          >
            <Grid item xs={12} md={6} sx={{ display: "flex", flex: 1 }}>
              <Box sx={styles.formSection}>
                {/*  */}
                {children}
                {/*  */}
              </Box>
            </Grid>
            {/* Right side, Info box */}
            <Grid item xs={12} md={6} sx={{ display: "flex", flex: 1 }}>
              <InfoSection {...content[name]} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
