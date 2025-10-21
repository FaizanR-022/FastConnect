import { Box, Stack, Typography, useTheme } from "@mui/material";
import { createAuthStyles } from "../../styles/authStyles";

export const InfoSection = ({ title, description, features, gradient }) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <Box sx={{ ...styles.infoSection, background: gradient }}>
      {/* Decorative Circles */}
      <Box
        sx={styles.decorativeCircle(
          theme.custom.auth.decorativeCircleSizes.large,
          { top: "40px", right: "40px" }
        )}
      />
      <Box
        sx={styles.decorativeCircle(
          theme.custom.auth.decorativeCircleSizes.medium,
          { bottom: "40px", left: "40px" }
        )}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "80px",
          width: theme.custom.auth.decorativeCircleSizes.small,
          height: theme.custom.auth.decorativeCircleSizes.small,
          bgcolor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          backdropFilter: "blur(4px)",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 10 }}>
        <Typography variant="h4" sx={styles.infoTitle}>
          {title}
        </Typography>

        <Typography variant="body1" sx={styles.infoDescription}>
          {description}
        </Typography>

        <Box sx={styles.featureBox}>
          <Typography variant="body2" sx={styles.featureTitle}>
            {features.title}
          </Typography>
          <Stack spacing={1}>
            {features.items.map((feature, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <Box sx={styles.featureBullet} />
                <Typography variant="body2" sx={styles.featureItem}>
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        <Box sx={styles.infoFooter}>
          <Typography variant="body2" sx={styles.infoFooterText}>
            Proudly serving the FAST-NUCES community
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
