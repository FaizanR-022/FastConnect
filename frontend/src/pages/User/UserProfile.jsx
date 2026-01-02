import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Alert, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { createProfileStyles } from "../../styles/profileStyles";
import { useUserProfile } from "../../hooks/useUserProfile";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileDetails } from "../../components/profile/ProfileDetails";
import { UserPosts } from "../../components/profile/UserPosts";
import { ContactModal } from "../../components/profile/ContactModal";
import useAuthStore from "../../store/authStore";
import { usePosts } from "../../hooks/usePosts";
import { usePost } from "../../hooks/usePost";
import { RepliesModal } from "../../components/replies/RepliesModal";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";

export default function UserProfile() {
  const theme = useTheme();
  const styles = createProfileStyles(theme);
  const { userId } = useParams();
  const { user: currentUser } = useAuthStore();

  const {
    user,
    posts,
    isOwnProfile,
    loading,
    postsLoading,
    error,
    postsError,
  } = useUserProfile(userId);

  const { likePost, unlikePost, deletePost } = usePosts();

  const [contactModalOpen, setContactModalOpen] = useState(false);
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

  const handleContactClick = () => {
    setContactModalOpen(true);
  };

  const handleRepliesClick = (postId) => {
    setSelectedPostId(postId);
    setRepliesModalOpen(true);
  };

  const handleCloseRepliesModal = () => {
    setRepliesModalOpen(false);
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
      // Optionally refresh posts here
    } catch (err) {
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

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.pageContainer}>
        <Box sx={{ pt: 8, px: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={styles.pageContainer}>
        <Box sx={styles.emptyState}>
          <Typography variant="h5" sx={styles.emptyStateTitle}>
            User Not Found
          </Typography>
          <Typography variant="body1" sx={styles.emptyStateText}>
            The user you're looking for doesn't exist.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={styles.pageContainer}>
      <ProfileHeader
        user={user}
        isOwnProfile={isOwnProfile}
        onContactClick={handleContactClick}
      />

      <ProfileDetails user={user} isOwnProfile={isOwnProfile} />

      <UserPosts
        posts={posts}
        loading={postsLoading}
        error={postsError}
        user={user}
        currentUserId={currentUser?.id}
        onRepliesClick={handleRepliesClick}
        onLike={handleLike}
        onDelete={handleDeleteClick}
      />

      <ContactModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        user={user}
      />

      <RepliesModal
        open={repliesModalOpen}
        onClose={handleCloseRepliesModal}
        post={selectedPost}
        replies={replies}
        repliesLoading={repliesLoading}
        repliesError={repliesError}
        currentUser={currentUser}
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
    </Box>
  );
}
