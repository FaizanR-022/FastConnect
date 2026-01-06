import { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import { Bell, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../store/useNotificationStore";
import { formatDistanceToNow } from "../../utils/dateHelpers";
import { ROUTES } from "../../constants/constants";

export const NotificationWidget = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { notifications, fetchNotifications, markAsRead } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    navigate(ROUTES.SINGLE_POST.replace(":id", notification.metadata.postUuid));
  };

  const handleViewAll = () => {
    navigate(ROUTES.NOTIFICATIONS);
  };

  const recentNotifications = notifications.slice(0, 5);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Bell size={24} color={theme.palette.primary.main} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            Recent Notifications
          </Typography>
        </Box>
      </Box>

      {/* Notifications List */}
      {recentNotifications.length === 0 ? (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Bell
            size={48}
            color={theme.palette.text.disabled}
            style={{ opacity: 0.5 }}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              color: theme.palette.text.secondary,
            }}
          >
            No notifications yet
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.5,
              color: theme.palette.text.secondary,
            }}
          >
            You'll see updates here when someone posts or replies
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {recentNotifications.map((notification, index) => (
              <Box key={notification.id}>
                <Box
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    p: 1.5,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: notification.isRead
                      ? "transparent"
                      : `${theme.palette.primary.main}08`,
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
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
                        mt: 1,
                      }}
                    />
                  )}
                </Box>
                {index !== recentNotifications.length - 1 && (
                  <Divider sx={{ my: 0.5 }} />
                )}
              </Box>
            ))}
          </Box>

          {/* View All Button */}
          <Button
            fullWidth
            endIcon={<ArrowRight size={18} />}
            onClick={handleViewAll}
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: 600,
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: `${theme.palette.primary.main}08`,
              },
            }}
          >
            View All Notifications
          </Button>
        </>
      )}
    </Paper>
  );
};

export default NotificationWidget;
