import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PostDetailView } from "../../components/posts/PostDetailView";
import { CreateReply } from "../../components/replies/CreateReply";
import { ReplyList } from "../../components/replies/ReplyList";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import {
  PageContainer,
  PageContent,
  BackButton,
  LoadingSpinner,
  ErrorMessage,
} from "../../components/layout";

import { usePost } from "../../hooks/usePost";
import useAuthStore from "../../store/authStore";
import { ROUTES } from "../../constants/constants";
import { toast } from "sonner";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      navigate(ROUTES.ALL_POSTS);
      toast.success("Post deleted successfully!");
    } catch (err) {
      console.error("Delete failed");
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

  // Loading State
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Error State
  if (error) {
    return (
      <PageContainer>
        <PageContent maxWidth="4xl">
          <ErrorMessage>{error}</ErrorMessage>
          <BackButton label="Back to Forum" onClick={handleBack} />
        </PageContent>
      </PageContainer>
    );
  }

  // Not Found State
  if (!post) {
    return (
      <PageContainer>
        <PageContent maxWidth="4xl">
          <h2 className="text-lg font-medium text-muted-foreground mb-4">
            Post not found
          </h2>
          <BackButton label="Back to Forum" onClick={handleBack} />
        </PageContent>
      </PageContainer>
    );
  }

  const isOwnPost = post.author.id === user?.id;

  return (
    <PageContainer>
      <PageContent maxWidth="4xl">
        <BackButton
          label="Back to Forum"
          onClick={handleBack}
          className="mb-6"
        />

        {/* Post Detail */}
        <PostDetailView
          post={post}
          onLike={handleLike}
          onDelete={handleDeleteClick}
          showDelete={isOwnPost}
        />

        {/* Replies List */}
        <div className="mt-6">
          <ReplyList
            replies={replies}
            loading={repliesLoading}
            error={repliesError}
            currentUser={user}
            onDelete={deleteReply}
          />
        </div>

        {/* Create Reply Section */}
        <div className="mt-6">
          <CreateReply onSubmit={createReply} currentUser={user} />
        </div>

        {/* Delete Confirmation Dialog */}
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
      </PageContent>
    </PageContainer>
  );
}
