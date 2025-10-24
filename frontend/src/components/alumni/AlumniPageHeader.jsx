// components/Alumni/AlumniPageHeader.jsx
import { Box, Typography, useTheme } from "@mui/material";
import { createAlumniStyles } from "../../styles/alumniStyles";

// Alumni List Page Headings

export const AlumniPageHeader = () => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  return (
    <Box sx={styles.pageHeader}>
      <Typography variant="h3" sx={styles.pageTitle}>
        Alumni Directory
      </Typography>
      <Typography variant="body1" sx={styles.pageSubtitle}>
        Connect with FAST-NUCES alumni from around the world
      </Typography>
    </Box>
  );
};
