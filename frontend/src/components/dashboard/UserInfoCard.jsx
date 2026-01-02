import { Box, Avatar, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { createDashboardStyles } from "../../styles/dashboardStyles";
import useAuthStore from "../../store/authStore";

export const UserInfoCard = () => {
  const theme = useTheme();
  const styles = createDashboardStyles(theme);
  const { user } = useAuthStore();

  const getInitials = () => {
    if (!user) return "";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`;
  };

  const getUserDetails = () => {
    if (!user) return [];

    const details = [
      { icon: "🎓", text: user.department },
      { icon: "🏛️", text: user.campus },
    ];

    if (user.role === "student") {
      details.push({ icon: "📅", text: `Batch ${user.batch}` });
    } else if (user.role === "alumni") {
      details.push({ icon: "📅", text: `Class of ${user.graduationYear}` });
    }

    return details;
  };

  return (
    <Box sx={styles.userInfo}>
      <Avatar sx={styles.userAvatar} src={user?.profilePicture}>
        {getInitials()}
      </Avatar>

      <Typography sx={styles.userName}>
        {user?.firstName} {user?.lastName}
      </Typography>

      <Box sx={styles.userDetailsList}>
        {getUserDetails().map((detail, index) => (
          <Box key={index} sx={styles.userDetailItem}>
            <span style={styles.detailIcon}>{detail.icon}</span>
            <span>{detail.text}</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
