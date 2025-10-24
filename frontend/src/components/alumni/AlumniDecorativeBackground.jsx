// components/Alumni/AlumniDecorativeBackground.jsx
import { Box, useTheme } from "@mui/material";
import { createAlumniStyles } from "../../styles/alumniStyles";

export const AlumniDecorativeBackground = () => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  return (
    <Box sx={styles.decorativeBackground}>
      <Box
        sx={{
          ...styles.decorativeBlob({ top: 0, left: "25%" }),
          bgcolor: theme.palette.decorative.blob1,
        }}
      />
      <Box
        sx={{
          ...styles.decorativeBlob({ bottom: 0, right: "25%" }),
          bgcolor: theme.palette.decorative.blob2,
        }}
      />
    </Box>
  );
};
