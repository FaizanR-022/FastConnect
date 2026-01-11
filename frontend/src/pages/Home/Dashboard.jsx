import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { WelcomeSection } from "../../components/dashboard/WelcomeSection";
import { MyPosts } from "../../components/dashboard/MyPosts";
import { UserInfoCard } from "../../components/dashboard/UserInfoCard";
import { RepliesSidebar } from "../../components/dashboard/RepliesSidebar";
import { CreatePost } from "../../components/posts/CreatePost";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import NotificationWidget from "../../components/notifications/NotificationWidget";
import { PageContainer, TwoColumnLayout } from "../../components/layout";

import { useDashboard } from "../..//hooks/useDashboard";
import { usePosts } from "../../hooks/usePosts";
import useAuthStore from "../../store/authStore";
import { ROUTES } from "../../constants/constants";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const {
    posts,
    replies,
    postsLoading,
    repliesLoading,
    createPost,
    removePost,
    updatePostLikes,
  } = useDashboard();

  const { likePost, unlikePost, deletePost } = usePosts();

  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

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

  // Navigate to single post page (for replies)
  const handleRepliesClick = (postId) => {
    navigate(`${ROUTES.ALL_POSTS}/${postId}`);
  };

  const handleReplyClick = (postId) => {
    navigate(`${ROUTES.ALL_POSTS}/${postId}`);
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
      console.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  // View All Replies - navigate to all posts
  const handleViewAllReplies = () => {
    navigate(ROUTES.ALL_POSTS);
  };

  return (
    <PageContainer>
      <WelcomeSection />

      <TwoColumnLayout
        main={
          <MyPosts
            posts={posts}
            loading={postsLoading}
            currentUserId={user?.id}
            onRepliesClick={handleRepliesClick}
            onLike={handleLike}
            onDelete={handleDeleteClick}
            onNewPostClick={handleOpenCreatePost}
          />
        }
        sidebar={
          <>
            <UserInfoCard />
            <NotificationWidget />
            {user?.role === "alumni" && (
              <RepliesSidebar
                replies={replies}
                loading={repliesLoading}
                onReplyClick={handleReplyClick}
                onViewAll={handleViewAllReplies}
              />
            )}
          </>
        }
      />

      {/* Create Post Modal */}
      <CreatePost
        open={createPostOpen}
        onClose={handleCloseCreatePost}
        onSubmit={handleCreatePost}
      />

      {/* Delete Confirmation Dialog */}
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
    </PageContainer>
  );
}
