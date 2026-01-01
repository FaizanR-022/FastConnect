import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  useTheme,
} from "@mui/material";
import { MessageCircle } from "lucide-react";
import { ReplyCard } from "./ReplyCard";
import { createReplyStyles } from "../../styles/replyStyles";

export const ReplyList = ({
  replies,
  loading,
  error,
  currentUser,
  onDelete,
}) => {
  const theme = useTheme();
  const styles = createReplyStyles(theme);

  if (loading) {
    return (
      <Box sx={styles.replyLoadingContainer}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.replyEmptyState}>
        <Typography variant="h6" sx={styles.replyEmptyStateTitle}>
          Error Loading Replies
        </Typography>
        <Typography variant="body2" sx={styles.replyEmptyStateText}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (!replies || replies.length === 0) {
    return (
      <Box sx={styles.replyEmptyState}>
        <MessageCircle
          size={48}
          color={theme.palette.text.disabled}
          style={{ marginBottom: 16 }}
        />
        <Typography variant="h6" sx={styles.replyEmptyStateTitle}>
          No replies yet
        </Typography>
        <Typography variant="body2" sx={styles.replyEmptyStateText}>
          Be the first alumni to share your insights!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.replySection}>
      <Box sx={styles.replySectionHeader}>
        <Typography variant="h6" sx={styles.replySectionTitle}>
          Replies
        </Typography>
        <Typography variant="body2" sx={styles.replyCount}>
          {replies.length} {replies.length === 1 ? "reply" : "replies"}
        </Typography>
      </Box>

      <Stack spacing={2}>
        {replies.map((reply) => (
          <ReplyCard
            key={reply.id}
            reply={reply}
            currentUser={currentUser}
            onDelete={onDelete}
          />
        ))}
      </Stack>
    </Box>
  );
};
