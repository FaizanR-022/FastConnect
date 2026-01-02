import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material";
import { createDashboardStyles } from "../../styles/dashboardStyles";

export const RepliesSidebar = ({
  replies,
  loading,
  onReplyClick,
  onViewAll,
}) => {
  const theme = useTheme();
  const styles = createDashboardStyles(theme);

  if (loading) {
    return (
      <Box sx={styles.sidebarCard}>
        <Typography sx={styles.sidebarTitle}>💬 Recent Replies</Typography>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress size={32} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={styles.sidebarCard}>
      <Typography sx={styles.sidebarTitle}>💬 Recent Replies</Typography>

      {replies && replies.length > 0 ? (
        <>
          <Box sx={styles.replyList}>
            {replies.slice(0, 5).map((reply) => (
              <Box
                key={reply.id}
                sx={styles.replyItem}
                onClick={() => onReplyClick(reply.postId)}
              >
                <Typography sx={styles.replyText}>{reply.body}</Typography>
                <Box sx={styles.replyMeta}>
                  <Typography sx={styles.replyLabel}>On:</Typography>
                  <Typography sx={styles.replyPostTitle}>
                    {reply.postTitle}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {replies.length > 5 && (
            <Button
              variant="outlined"
              fullWidth
              onClick={onViewAll}
              sx={styles.viewAllButton}
            >
              View All Replies →
            </Button>
          )}
        </>
      ) : (
        <Box sx={styles.repliesEmpty}>
          <Typography>
            No replies yet.
            <br />
            Start helping students by answering their questions!
          </Typography>
        </Box>
      )}
    </Box>
  );
};
