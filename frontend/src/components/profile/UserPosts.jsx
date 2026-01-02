import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { MessageSquare } from "lucide-react";
import { useTheme } from "@mui/material";
import { createProfileStyles } from "../../styles/profileStyles";
import { PostCard } from "../posts/PostCard";

export const UserPosts = ({
  posts,
  loading,
  error,
  user,
  currentUserId,
  onRepliesClick,
  onLike,
  onDelete,
}) => {
  const theme = useTheme();
  const styles = createProfileStyles(theme);

  return (
    <Container sx={styles.postsSection}>
      <Box sx={styles.postsHeader}>
        <Typography sx={styles.postsTitle}>Posts</Typography>
        <Typography sx={styles.postsCount}>
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </Typography>
      </Box>

      {loading ? (
        <Box sx={styles.loadingContainer}>
          <CircularProgress size={60} />
        </Box>
      ) : error ? (
        <Box sx={styles.emptyState}>
          <Typography variant="h6" sx={styles.emptyStateTitle}>
            Error Loading Posts
          </Typography>
          <Typography variant="body2" sx={styles.emptyStateText}>
            {error}
          </Typography>
        </Box>
      ) : posts.length === 0 ? (
        <Box sx={styles.emptyState}>
          <MessageSquare size={64} color={theme.palette.text.disabled} />
          <Typography variant="h6" sx={{ ...styles.emptyStateTitle, mt: 2 }}>
            No posts yet
          </Typography>
          <Typography variant="body2" sx={styles.emptyStateText}>
            {user?.firstName} hasn't posted anything yet.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                ...post,
                author: {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  role: user.role,
                  profilePicture: user.profilePicture,
                },
              }}
              currentUser={currentUserId}
              onRepliesClick={onRepliesClick}
              onLike={onLike}
              onDelete={onDelete}
            />
          ))}
        </Stack>
      )}
    </Container>
  );
};
