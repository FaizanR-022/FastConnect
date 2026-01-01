import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import { MessageSquare } from "lucide-react";
import { PostCard } from "./PostCard";
import { createPostStyles } from "../../styles/postStyles";
import { useTheme } from "@mui/material";

export const PostList = ({
  posts,
  loading,
  error,
  currentUser,
  onRepliesClick,
  onLike,
  onDelete,
}) => {
  const theme = useTheme();
  const styles = createPostStyles(theme);

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.emptyState}>
        <Typography variant="h6" sx={styles.emptyStateTitle}>
          Error Loading Posts
        </Typography>
        <Typography variant="body2" sx={styles.emptyStateText}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Box sx={styles.emptyState}>
        <MessageSquare size={64} color={theme.palette.text.disabled} />
        <Typography variant="h6" sx={{ ...styles.emptyStateTitle, mt: 2 }}>
          No posts yet
        </Typography>
        <Typography variant="body2" sx={styles.emptyStateText}>
          Be the first to start a discussion!
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={currentUser}
          onRepliesClick={onRepliesClick}
          onLike={onLike}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
};
