import { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  useTheme,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Bell, Check, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../store/useNotificationStore";
import { formatDistanceToNow } from "../../utils/dateHelpers";
import { ROUTES } from "../../constants/constants";

export default function NotificationsPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearError,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    navigate(ROUTES.SINGLE_POST.replace(":id", notification.metadata.postUuid));
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleDelete = async (notificationId, event) => {
    event.stopPropagation();
    await deleteNotification(notificationId);
  };

  if (loading && notifications.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.gradients?.background ||
          theme.palette.background.default,
        py: 5,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Bell size={32} color={theme.palette.primary.main} />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                }}
              >
                Notifications
              </Typography>
              {unreadCount > 0 && (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {unreadCount} unread
                </Typography>
              )}
            </Box>
          </Box>

          {unreadCount > 0 && (
            <Button
              variant="outlined"
              startIcon={<Check size={18} />}
              onClick={handleMarkAllAsRead}
              sx={{
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Mark all read
            </Button>
          )}
        </Box>

        {error && (
          <Alert severity="error" onClose={clearError} sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {notifications.length === 0 ? (
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Bell
              size={64}
              color={theme.palette.text.disabled}
              style={{ opacity: 0.5 }}
            />
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                mb: 1,
                color: theme.palette.text.secondary,
              }}
            >
              No notifications yet
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              When someone posts, replies, or likes your content, you'll see it
              here.
            </Typography>
          </Paper>
        ) : (
          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            {notifications.map((notification, index) => (
              <Box key={notification.id}>
                <Box
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    p: 2.5,
                    cursor: "pointer",
                    backgroundColor: notification.isRead
                      ? "transparent"
                      : `${theme.palette.primary.main}08`,
                    borderLeft: notification.isRead
                      ? "none"
                      : `4px solid ${theme.palette.primary.main}`,
                    transition: "background-color 0.2s",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <Avatar
                    src={notification.actor?.profilePicture}
                    sx={{ width: 48, height: 48 }}
                  >
                    {notification.actor?.name?.[0] || "?"}
                  </Avatar>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: notification.isRead ? 400 : 600,
                        color: theme.palette.text.primary,
                        mb: 0.5,
                      }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {formatDistanceToNow(notification.createdAt)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {!notification.isRead && (
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.primary.main,
                        }}
                      />
                    )}

                    <Button
                      size="small"
                      onClick={(e) => handleDelete(notification.id, e)}
                      sx={{
                        minWidth: 36,
                        width: 36,
                        height: 36,
                        p: 0,
                        color: theme.palette.text.secondary,
                        "&:hover": {
                          color: theme.palette.error.main,
                          backgroundColor: `${theme.palette.error.main}08`,
                        },
                      }}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </Box>
                </Box>
                {index !== notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        )}
      </Container>
    </Box>
  );
}
