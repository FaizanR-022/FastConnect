import { Box, Container, Typography, Button } from "@mui/material";
import { Plus } from "lucide-react";
import { useTheme } from "@mui/material";
import { createDashboardStyles } from "../../styles/dashboardStyles";
import useAuthStore from "../../store/authStore";

export const WelcomeSection = ({ onNewPostClick }) => {
  const theme = useTheme();
  const styles = createDashboardStyles(theme);
  const { user } = useAuthStore();

  const getRoleBadgeIcon = () => {
    return user?.role === "student" ? "🎓" : "🎖️";
  };

  const getRoleText = () => {
    return user?.role === "student" ? "Student" : "Alumni";
  };

  return (
    <Container sx={styles.welcomeSection}>
      <Box sx={styles.welcomeHeader}>
        <Box sx={styles.welcomeText}>
          <Typography variant="h4" sx={styles.welcomeTitle}>
            Welcome back, {user?.firstName}
          </Typography>
          <span style={styles.welcomeWave}>👋</span>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={onNewPostClick}
          sx={styles.newPostButton}
        >
          New Post
        </Button>
      </Box>

      <Box sx={styles.metaRow}>
        <Box sx={styles.roleBadge}>
          <span>{getRoleBadgeIcon()}</span>
          <span>{getRoleText()}</span>
        </Box>
        <Typography sx={styles.metaText}>{user?.department}</Typography>
        <Typography sx={styles.metaDivider}>•</Typography>
        <Typography sx={styles.metaText}>{user?.campus}</Typography>
      </Box>
    </Container>
  );
};
