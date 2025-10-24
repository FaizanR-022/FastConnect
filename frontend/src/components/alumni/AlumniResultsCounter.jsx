// components/Alumni/AlumniResultsCounter.jsx
import { Box, Typography, useTheme } from "@mui/material";
import { createAlumniStyles } from "../../styles/alumniStyles";

export const AlumniResultsCounter = ({ count }) => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Box sx={styles.resultsCounter}>
        <Typography variant="body2" sx={styles.resultsCountText}>
          <Box component="span" sx={styles.resultsCountNumber}>
            {count}
          </Box>{" "}
          Alumni found
        </Typography>
      </Box>
    </Box>
  );
};
