import { useState } from "react";
import {
  Container,
  Box,
  Button,
  Typography,
  Alert,
  useTheme,
} from "@mui/material";
import { Plus } from "lucide-react";
import { usePosts } from "../../hooks/usePosts";
import { usePost } from "../../hooks/usePost";
import { PostList } from "../../components/posts/PostList";
import { CreatePost } from "../../components/posts/CreatePost";
import { RepliesModal } from "../../components/replies/RepliesModal";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { createPostStyles } from "../../styles/postStyles";
import useAuthStore from "../../store/authStore";

export default function AllPosts() {
  const theme = useTheme();
  const styles = createPostStyles(theme);
  const { user } = useAuthStore();

  const {
    posts,
    loading,
    error,
    createPost,
    likePost,
    unlikePost,
    deletePost,
  } = usePosts();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [repliesModalOpen, setRepliesModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const {
    post: selectedPost,
    replies,
    repliesLoading,
    repliesError,
    createReply,
    deleteReply,
  } = usePost(selectedPostId);

  const handleCreatePost = async (data) => {
    await createPost(data);
    setCreateModalOpen(false);
  };

  const handleRepliesClick = (postId) => {
    setSelectedPostId(postId);
    setRepliesModalOpen(true);
  };

  const handleCloseRepliesModal = () => {
    setRepliesModalOpen(false);
    // To avoid visual glitch
    setTimeout(() => setSelectedPostId(null), 200);
  };

  const handleDeleteClick = (postId) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;

    try {
      setDeleting(true);
      await deletePost(postToDelete);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (err) {
      // Error already handled in hook
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handleLike = async (postId, isLiked) => {
    if (isLiked) {
      await unlikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  return (
    <Box sx={styles.pageContainer}>
      <Container sx={{ py: { xs: 3, md: 5 }, position: "relative", zIndex: 1 }}>
        <Box sx={styles.pageHeader}>
          <Box>
            <Typography variant="h3" sx={styles.pageTitle}>
              Q&A Forum
            </Typography>
            <Typography variant="body1" sx={styles.pageSubtitle}>
              Ask questions and get answers from FAST-NUCES alumni
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => setCreateModalOpen(true)}
            sx={styles.createButton}
          >
            New Post
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <PostList
          posts={posts}
          loading={loading}
          error={error}
          currentUserId={user?.id}
          onRepliesClick={handleRepliesClick}
          onLike={handleLike}
          onDelete={handleDeleteClick}
        />

        <CreatePost
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />

        <RepliesModal
          open={repliesModalOpen}
          onClose={handleCloseRepliesModal}
          post={selectedPost}
          replies={replies}
          repliesLoading={repliesLoading}
          repliesError={repliesError}
          currentUser={user}
          onCreateReply={createReply}
          onDeleteReply={deleteReply}
        />

        <ConfirmDialog
          open={deleteDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Delete Post"
          message="Are you sure you want to delete this post?"
          confirmText="Delete"
          cancelText="Cancel"
          loading={deleting}
        />
      </Container>
    </Box>
  );
}
