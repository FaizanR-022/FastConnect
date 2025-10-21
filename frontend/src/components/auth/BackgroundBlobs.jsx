import { Box, useTheme } from "@mui/material";
import { createAuthStyles } from "../../styles/authStyles";

export const BackgroundBlobs = () => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          ...styles.decorativeBlob("0s"),
          top: "80px",
          left: "-80px",
          bgcolor: theme.palette.decorative.blob1,
        }}
      />
      <Box
        sx={{
          ...styles.decorativeBlob("2s"),
          top: "160px",
          right: "-80px",
          bgcolor: theme.palette.decorative.blob2,
        }}
      />
      <Box
        sx={{
          ...styles.decorativeBlob("4s"),
          bottom: "-80px",
          left: "160px",
          bgcolor: theme.palette.decorative.blob3,
        }}
      />
    </Box>
  );
};
