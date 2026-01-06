import { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import { Bell, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../store/useNotificationStore";
import { formatDistanceToNow } from "../../utils/dateHelpers";
import { ROUTES } from "../../constants/constants";

export const BellIcon = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotificationStore();

  // Anchor Element
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    // navigate(`/posts/${notification.metadata.postUuid}`);
    navigate(ROUTES.SINGLE_POST.replace(":id", notification.metadata.postUuid));

    handleClose();
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleViewAll = () => {
    navigate(ROUTES.NOTIFICATIONS);
    handleClose();
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <Bell size={24} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 500,
            mt: 1.5,
            borderRadius: 2,
            boxShadow: theme.shadows[10],
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Button
              size="small"
              startIcon={<Check size={16} />}
              onClick={handleMarkAllAsRead}
              sx={{
                textTransform: "none",
                fontSize: "0.875rem",
              }}
            >
              Mark all read
            </Button>
          )}
        </Box>

        {/* Notifications List */}
        {recentNotifications.length === 0 ? (
          <Box sx={{ px: 3, py: 4, textAlign: "center" }}>
            <Bell size={48} color={theme.palette.text.disabled} />
            <Typography
              variant="body2"
              sx={{ mt: 2, color: theme.palette.text.secondary }}
            >
              No notifications yet
            </Typography>
          </Box>
        ) : (
          <>
            {recentNotifications.map((notification, index) => (
              <MenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  px: 2,
                  py: 1.5,
                  backgroundColor: notification.isRead
                    ? "transparent"
                    : `${theme.palette.primary.main}08`,
                  borderLeft: notification.isRead
                    ? "none"
                    : `3px solid ${theme.palette.primary.main}`,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  ...(index !== recentNotifications.length - 1 && {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }),
                }}
              >
                <Box sx={{ display: "flex", gap: 1.5, width: "100%" }}>
                  <Avatar
                    src={notification.actor?.profilePicture}
                    sx={{ width: 40, height: 40 }}
                  >
                    {notification.actor?.name?.[0] || "?"}
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: notification.isRead ? 400 : 600,
                        color: theme.palette.text.primary,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        display: "block",
                        mt: 0.5,
                      }}
                    >
                      {formatDistanceToNow(notification.createdAt)}
                    </Typography>
                  </Box>

                  {!notification.isRead && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.primary.main,
                        flexShrink: 0,
                        mt: 0.5,
                      }}
                    />
                  )}
                </Box>
              </MenuItem>
            ))}

            {/* View All Button */}
            <Divider />
            <Box sx={{ p: 1 }}>
              <Button
                fullWidth
                onClick={handleViewAll}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                View All Notifications
              </Button>
            </Box>
          </>
        )}
      </Menu>
    </>
  );
};

export default BellIcon;
