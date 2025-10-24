// components/Alumni/AlumniEmptyState.jsx
import { Box, Typography, useTheme } from "@mui/material";
import { createAlumniStyles } from "../../styles/alumniStyles";

export const AlumniEmptyState = () => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  return (
    <Box sx={styles.emptyState}>
      <Typography variant="h6" sx={styles.emptyStateTitle}>
        No alumni found
      </Typography>
      <Typography variant="body2" sx={styles.emptyStateText}>
        Try adjusting your search or filters
      </Typography>
    </Box>
  );
};
