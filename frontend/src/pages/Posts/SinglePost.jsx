import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Alert,
  CircularProgress,
  useTheme,
  Typography,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { usePost } from "../../hooks/usePost";
import { PostDetailView } from "../../components/posts/PostDetailView";
import { CreateReply } from "../../components/replies/CreateReply";
import { ReplyList } from "../../components/replies/ReplyList";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { createPostStyles } from "../../styles/postStyles";
import useAuthStore from "../../store/authStore";
import { ROUTES } from "../../constants/constants";
import Loader from "../../components/common/Loader";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = createPostStyles(theme);
  const { user } = useAuthStore();

  const {
    post,
    replies,
    loading,
    repliesLoading,
    error,
    repliesError,
    createReply,
    deleteReply,
    likePost,
    unlikePost,
    deletePost,
  } = usePost(id);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleLike = async () => {
    if (post.isLikedByCurrentUser) {
      await unlikePost();
    } else {
      await likePost();
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await deletePost();
      // No need to navigate - useEffect will handle it when post becomes null
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleBack = () => {
    navigate(ROUTES.ALL_POSTS);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={handleBack}
          sx={{ textTransform: "none" }}
        >
          Back to Posts
        </Button>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography variant="h6" sx={{ mb: 3, color: "text.secondary" }}>
          Post not found
        </Typography>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={handleBack}
          sx={{ textTransform: "none" }}
        >
          Back to Posts
        </Button>
      </Container>
    );
  }

  const isOwnPost = post.author.id === user?.id;

  return (
    <Box sx={styles.pageContainer}>
      <Container sx={{ py: { xs: 3, md: 5 } }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={handleBack}
          sx={{
            textTransform: "none",
            mb: 3,
            color: theme.palette.primary.main,
          }}
        >
          Back to Posts
        </Button>

        <PostDetailView
          post={post}
          onLike={handleLike}
          onDelete={handleDeleteClick}
          showDelete={isOwnPost}
        />

        <Box sx={{ mt: 4 }}>
          <CreateReply onSubmit={createReply} currentUser={user} />
        </Box>

        <Box sx={{ mt: 4 }}>
          <ReplyList
            replies={replies}
            loading={repliesLoading}
            error={repliesError}
            currentUserId={user?.id}
            onDeleteReply={deleteReply}
          />
        </Box>

        <ConfirmDialog
          open={deleteDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Delete Post"
          message="Are you sure you want to delete this post? "
          confirmText="Delete"
          cancelText="Cancel"
          loading={deleting}
        />
      </Container>
    </Box>
  );
}
