import {
  Box,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  useTheme,
} from "@mui/material";
import { User, Settings, LogOut } from "lucide-react";
import { createHeaderStyles } from "../../../styles/headerStyles";

export const ProfileMenu = ({
  user,
  anchorEl,
  isOpen,
  onClose,
  onNavigateProfile,
  onLogout,
}) => {
  const theme = useTheme();
  const styles = createHeaderStyles(theme);

  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: styles.menu,
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {/* User Info */}
      {user && (
        <>
          <Box sx={styles.userInfoContainer}>
            <Typography variant="body2" sx={styles.userName}>
              {user.name || user.fullName || "User"}
            </Typography>
            <Typography variant="caption" sx={styles.userEmail}>
              {user.email || "email@example.com"}
            </Typography>
            <Box sx={styles.roleBadge}>
              <Typography variant="caption" sx={styles.roleText}>
                {user.role || "student"}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />
        </>
      )}

      {/* Profile MenuItem */}
      <MenuItem onClick={onNavigateProfile} sx={styles.menuItem}>
        <ListItemIcon>
          <User size={20} color={theme.palette.primary.main} />
        </ListItemIcon>
        <ListItemText
          primary="View Profile"
          primaryTypographyProps={styles.menuItemText}
        />
      </MenuItem>

      {/* Settings MenuItem */}
      <MenuItem
        onClick={() => {
          onClose();
          // Add settings navigation later
        }}
        sx={styles.menuItem}
      >
        <ListItemIcon>
          <Settings size={20} color={theme.palette.primary.main} />
        </ListItemIcon>
        <ListItemText
          primary="Settings"
          primaryTypographyProps={styles.menuItemText}
        />
      </MenuItem>

      <Divider sx={{ my: 1 }} />

      {/* Logout MenuItem */}
      <MenuItem onClick={onLogout} sx={styles.logoutMenuItem}>
        <ListItemIcon>
          <LogOut size={20} color={theme.palette.error.main} />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          primaryTypographyProps={styles.logoutText}
        />
      </MenuItem>
    </Menu>
  );
};

export const ProfileButton = ({ user, onClick }) => {
  const theme = useTheme();
  const styles = createHeaderStyles(theme);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box sx={{ ml: { md: "85px" } }}>
      <IconButton onClick={onClick} sx={styles.profileButton}>
        <Avatar sx={styles.avatar}>
          {user ? getInitials(user.name || user.fullName) : "U"}
        </Avatar>
      </IconButton>
    </Box>
  );
};
