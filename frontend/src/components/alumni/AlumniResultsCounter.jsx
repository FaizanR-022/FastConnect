// components/Alumni/AlumniResultsCounter.jsx
import { Box, Typography, useTheme } from "@mui/material";
import { createAlumniStyles } from "../../styles/alumniStyles";

export const AlumniResultsCounter = ({ count }) => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  return (
    <Box sx={styles.resultsCounter}>
      <Typography variant="body2" sx={styles.resultsCountText}>
        <Box component="span" sx={styles.resultsCountNumber}>
          {count}
        </Box>{" "}
        {count === 1 ? "alumni" : "alumni"} found
      </Typography>
    </Box>
  );
};
