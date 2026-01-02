import { useState } from "react";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material";
import { createDashboardStyles } from "../../styles/dashboardStyles";
import { WelcomeSection } from "../../components/dashboard/WelcomeSection";
import { MyPosts } from "../../components/dashboard/MyPosts";
import { UserInfoCard } from "../../components/dashboard/UserInfoCard";
import { RepliesSidebar } from "../../components/dashboard/RepliesSidebar";
import { CreatePost } from "../../components/posts/CreatePost";
import { RepliesModal } from "../../components/replies/RepliesModal";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { useDashboard } from "../../hooks/useDashboard";
import { usePosts } from "../../hooks/usePosts";
import { usePost } from "../../hooks/usePost";
import useAuthStore from "../../store/authStore";

export default function Dashboard() {
  const theme = useTheme();
  const styles = createDashboardStyles(theme);
  const { user } = useAuthStore();

  const {
    posts,
    replies,
    postsLoading,
    repliesLoading,
    postsError,
    createPost,
    removePost,
    updatePostLikes,
  } = useDashboard();

  const { likePost, unlikePost, deletePost } = usePosts();

  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [repliesModalOpen, setRepliesModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const {
    post: selectedPost,
    replies: postReplies,
    repliesLoading: postRepliesLoading,
    repliesError,
    createReply,
    deleteReply,
  } = usePost(selectedPostId);

  const handleOpenCreatePost = () => {
    setCreatePostOpen(true);
  };

  const handleCloseCreatePost = () => {
    setCreatePostOpen(false);
  };

  const handleCreatePost = async (data) => {
    const result = await createPost(data);
    if (result.success) {
      setCreatePostOpen(false);
    }
  };
  const handleRepliesClick = (postId) => {
    setSelectedPostId(postId);
    setRepliesModalOpen(true);
  };

  const handleCloseRepliesModal = () => {
    setRepliesModalOpen(false);
    setTimeout(() => setSelectedPostId(null), 200);
  };

  const handleReplyClick = (postId) => {
    handleRepliesClick(postId);
  };

  const handleLike = async (postId, isLiked) => {
    if (isLiked) {
      await unlikePost(postId);
      updatePostLikes(postId, false);
    } else {
      await likePost(postId);
      updatePostLikes(postId, true);
    }
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
      removePost(postToDelete);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
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

  // View All Replies (for future implementation)
  const handleViewAllReplies = () => {
    // Navigate to a dedicated replies page or open modal with all replies
    console.log("View all replies");
  };

  return (
    <Box sx={styles.pageContainer}>
      <WelcomeSection onNewPostClick={handleOpenCreatePost} />

      <Container>
        <Box sx={styles.dashboardGrid}>
          <MyPosts
            posts={posts}
            loading={postsLoading}
            currentUserId={user?.id}
            onRepliesClick={handleRepliesClick}
            onLike={handleLike}
            onDelete={handleDeleteClick}
            onNewPostClick={handleOpenCreatePost}
          />

          {/* Sidebar */}
          <Box sx={styles.sidebar}>
            <Box sx={styles.sidebarCard}>
              <UserInfoCard />
            </Box>

            {user?.role === "alumni" && (
              <RepliesSidebar
                replies={replies}
                loading={repliesLoading}
                onReplyClick={handleReplyClick}
                onViewAll={handleViewAllReplies}
              />
            )}
          </Box>
        </Box>
      </Container>

      <CreatePost
        open={createPostOpen}
        onClose={handleCloseCreatePost}
        onSubmit={handleCreatePost}
      />

      <RepliesModal
        open={repliesModalOpen}
        onClose={handleCloseRepliesModal}
        post={selectedPost}
        replies={postReplies}
        repliesLoading={postRepliesLoading}
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
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
      />
    </Box>
  );
}
