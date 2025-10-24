import { Box, Stack, Typography, useTheme } from "@mui/material";
import { GraduationCap } from "lucide-react";
import { createHeaderStyles } from "../../../styles/headerStyles";

export const Logo = ({ onClick }) => {
  const theme = useTheme();
  const styles = createHeaderStyles(theme);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      onClick={onClick}
      sx={styles.logoContainer}
    >
      <Box sx={styles.logoBox}>
        <GraduationCap size={24} color="white" strokeWidth={2.5} />
      </Box>
      <Typography variant="h6" sx={styles.logoText}>
        FastConnect
      </Typography>
    </Stack>
  );
};
