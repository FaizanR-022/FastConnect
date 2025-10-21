import { Box, Stack, Typography, useTheme } from "@mui/material";
import { createAuthStyles } from "../../styles/authStyles";

export const PageHeader = ({ icon: Icon, title, subtitle }) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
        <Box sx={styles.iconBox}>
          <Icon size={24} color="white" />
        </Box>
        <Box>
          <Typography variant="h4" sx={styles.title}>
            {title}
          </Typography>
          <Box sx={styles.underline} />
        </Box>
      </Stack>
      <Typography variant="body2" sx={styles.subtitle}>
        {subtitle}
      </Typography>
    </>
  );
};
