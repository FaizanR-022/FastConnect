import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Plus } from "lucide-react";
import { useTheme } from "@mui/material";
import { createDashboardStyles } from "../../styles/dashboardStyles";
import { PostCard } from "../posts/PostCard";

export const MyPosts = ({
  posts,
  loading,
  currentUserId,
  onRepliesClick,
  onLike,
  onDelete,
  onNewPostClick,
}) => {
  const theme = useTheme();
  const styles = createDashboardStyles(theme);

  return (
    <Container sx={styles.mainContent}>
      <Box sx={styles.sectionHeader}>
        <Typography sx={styles.sectionTitle}>
          My Posts
          <span style={styles.postCount}>{posts?.length || 0}</span>
        </Typography>
      </Box>

      {loading ? (
        <Box sx={styles.loadingContainer}>
          <CircularProgress size={60} />
        </Box>
      ) : posts && posts.length > 0 ? (
        <Stack spacing={2} sx={styles.postsList}>
          {console.log(posts + "hello")}
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={currentUserId}
              onRepliesClick={onRepliesClick}
              onLike={onLike}
              onDelete={onDelete}
            />
          ))}
        </Stack>
      ) : (
        <Box sx={styles.emptyState}>
          <Box sx={styles.emptyIcon}>✍️</Box>
          <Typography variant="h6" sx={styles.emptyTitle}>
            No posts yet
          </Typography>
          <Typography variant="body2" sx={styles.emptyText}>
            Start a conversation! Ask your first question to connect with alumni
            and get valuable insights.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={onNewPostClick}
            sx={styles.emptyCta}
          >
            Create Your First Post
          </Button>
        </Box>
      )}
    </Container>
  );
};
