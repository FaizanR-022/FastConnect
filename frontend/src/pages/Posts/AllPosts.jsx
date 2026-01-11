import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { Button } from "../../components/ui/button";
import { PostList } from "../../components/posts/PostList";
import { CreatePost } from "../../components/posts/CreatePost";
import { ConfirmDialog } from "../../components/common/ConfirmDialog";
import { PageContainer, PageHeader } from "../../components/layout";

import { usePosts } from "../../hooks/usePosts";
import useAuthStore from "../../store/authStore";
import { ROUTES } from "../../constants/constants";
import { toast } from "sonner";

export default function AllPosts() {
  const navigate = useNavigate();
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleCreatePost = async (data) => {
    await createPost(data);
    setCreateModalOpen(false);
  };

  // Navigate to single post page
  const handleRepliesClick = (postId) => {
    navigate(`${ROUTES.ALL_POSTS}/${postId}`);
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
      toast.success("Post deleted successfully!");
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

  const handleLike = async (postId, isLiked) => {
    if (isLiked) {
      await unlikePost(postId);
    } else {
      await likePost(postId);
    }
  };

  return (
    <PageContainer childrenClassName="max-w-5xl">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <PageHeader
          title="Q&A Forum"
          subtitle="Ask questions, share knowledge, and connect with the community"
          className="mb-0 py-8"
        />
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="gap-2 shrink-0 my-10"
        >
          <Plus className="w-4 h-4" />
          Ask a Question
        </Button>
      </div>

      {/* Posts List */}
      <PostList
        posts={posts}
        loading={loading}
        error={error}
        currentUserId={user?.id}
        onRepliesClick={handleRepliesClick}
        onLike={handleLike}
        onDelete={handleDeleteClick}
      />

      {/* Create Post Modal */}
      <CreatePost
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />

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
    </PageContainer>
  );
}
