import { Box, Container, Avatar, Typography, Button } from "@mui/material";
import { Edit, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { createProfileStyles } from "../../styles/profileStyles";
import { ROUTES } from "../../constants/constants";

export const ProfileHeader = ({ user, isOwnProfile, onContactClick }) => {
  const theme = useTheme();
  const styles = createProfileStyles(theme);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate(ROUTES.EDIT_PROFILE);
  };

  const getMetaText = () => {
    if (!user) return "";

    const parts = [];

    if (user.role === "student") {
      parts.push(user.department);
      parts.push(`Batch ${user.batch}`);
      parts.push(user.campus);
    } else if (user.role === "alumni") {
      parts.push(user.currentPosition);
      parts.push(user.currentCompany);
    }

    return parts.filter(Boolean).join(" • ");
  };

  return (
    <Box sx={styles.headerSection}>
      <Container sx={styles.headerContent}>
        <Box sx={styles.profilePictureContainer}>
          <Avatar
            src={user?.profilePicture || ""}
            alt={user?.fullName || "User"}
            sx={styles.profilePicture}
          >
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </Avatar>
        </Box>

        <Typography variant="h3" sx={styles.userName}>
          {user?.fullName || `${user?.firstName} ${user?.lastName}`}
        </Typography>

        <Typography variant="body1" sx={styles.userMeta}>
          {getMetaText()}
        </Typography>

        <Box sx={styles.editButton}>
          {isOwnProfile ? (
            <Button
              variant="contained"
              startIcon={<Edit size={18} />}
              onClick={handleEditProfile}
              sx={styles.editButtonStyle}
            >
              Edit Profile
            </Button>
          ) : (
            user?.role === "alumni" && (
              <Button
                variant="outlined"
                startIcon={<Mail size={18} />}
                onClick={onContactClick}
                sx={styles.contactButton}
              >
                Contact
              </Button>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
};
