// pages/Posts/PostsFeed.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
  Stack,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Divider,
  useTheme,
} from "@mui/material";
import { Plus, ThumbsUp, MessageSquare, Trash2, Send, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import api from "../../services/api";

export default function PostsFeed() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Create Post Dialog
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  // Reply Dialog
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyBody, setReplyBody] = useState("");
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [submittingReply, setSubmittingReply] = useState(false);

  const observerTarget = useRef(null);

  // Fetch posts with pagination
  const fetchPosts = async (offsetValue = 0) => {
    try {
      if (offsetValue === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError("");

      const response = await api.get("/posts", {
        params: {
          limit: 20,
          offset: offsetValue,
        },
      });

      const newPosts = response.data.data.posts;
      const pagination = response.data.data.pagination;

      if (offsetValue === 0) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setHasMore(pagination.hasMore);
      setOffset(offsetValue + 20);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          fetchPosts(offset);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loadingMore, offset]);

  // Create Post
  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) {
      setCreateError("Please fill in all fields");
      return;
    }

    try {
      setCreating(true);
      setCreateError("");

      const response = await api.post("/posts", {
        title: newPostTitle,
        body: newPostBody,
      });

      const newPost = response.data.data.post;
      setPosts([newPost, ...posts]);
      setCreateDialogOpen(false);
      setNewPostTitle("");
      setNewPostBody("");
    } catch (err) {
      setCreateError(err.response?.data?.message || "Failed to create post");
    } finally {
      setCreating(false);
    }
  };

  // Like/Unlike Post
  const handleLikeToggle = async (postId, isLiked) => {
    try {
      if (isLiked) {
        await api.delete(`/posts/${postId}/like`);
      } else {
        await api.post(`/posts/${postId}/like`);
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLikedByCurrentUser: !isLiked,
                likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
              }
            : post
        )
      );
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  // Delete Post
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  // Open Reply Dialog
  const handleOpenReplies = async (post) => {
    setSelectedPost(post);
    setReplyDialogOpen(true);
    setLoadingReplies(true);

    try {
      const response = await api.get(`/posts/${post.id}/replies`);
      setReplies(response.data.data.replies);
    } catch (err) {
      console.error("Failed to fetch replies:", err);
    } finally {
      setLoadingReplies(false);
    }
  };

  // Submit Reply
  const handleSubmitReply = async () => {
    if (!replyBody.trim()) return;

    try {
      setSubmittingReply(true);

      const response = await api.post(`/posts/${selectedPost.id}/replies`, {
        body: replyBody,
      });

      const newReply = response.data.data.reply;
      setReplies([...replies, newReply]);
      setReplyBody("");

      // Update replies count in posts list
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, repliesCount: post.repliesCount + 1 }
            : post
        )
      );
    } catch (err) {
      console.error("Failed to submit reply:", err);
    } finally {
      setSubmittingReply(false);
    }
  };

  // Delete Reply
  const handleDeleteReply = async (replyId) => {
    if (!window.confirm("Are you sure you want to delete this reply?")) return;

    try {
      await api.delete(`/replies/${replyId}`);
      setReplies((prevReplies) =>
        prevReplies.filter((reply) => reply.id !== replyId)
      );

      // Update replies count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, repliesCount: post.repliesCount - 1 }
            : post
        )
      );
    } catch (err) {
      console.error("Failed to delete reply:", err);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 200px)",
        background: "linear-gradient(to bottom, #f0fdf4 0%, #ffffff 100%)",
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", md: "2.3rem" },
                }}
              >
                Community Q&A
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: "0.85rem", md: "1.02rem" },
                }}
              >
                Ask questions and get answers from our alumni community
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => setCreateDialogOpen(true)}
              sx={{
                background: theme.palette.gradients.primary,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  background: theme.palette.gradients.primaryHover,
                  transform: "translateY(-2px)",
                },
              }}
            >
              New Post
            </Button>
          </Stack>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Posts List */}
        <Stack spacing={2}>
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                borderRadius: 3,
                border: "1px solid rgba(5, 150, 105, 0.1)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(5, 150, 105, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Post Header */}
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Avatar
                    sx={{
                      background: theme.palette.gradients.primary,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {post.author.firstName[0]}
                    {post.author.lastName[0]}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {post.author.firstName} {post.author.lastName}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={post.author.role}
                        size="small"
                        sx={{
                          background:
                            "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                          color: theme.palette.primary.dark,
                          fontWeight: 500,
                          fontSize: "0.7rem",
                          height: 20,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {new Date(post.createdAt).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Box>
                  {user.id === post.author.id && (
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePost(post.id)}
                      sx={{ color: theme.palette.error.main }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  )}
                </Stack>

                {/* Post Content */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1, fontSize: "1.1rem" }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {post.body}
                  </Typography>
                </Box>

                {/* Post Actions */}
                <Stack direction="row" spacing={2}>
                  <Button
                    size="small"
                    startIcon={<ThumbsUp size={16} />}
                    onClick={() =>
                      handleLikeToggle(post.id, post.isLikedByCurrentUser)
                    }
                    sx={{
                      textTransform: "none",
                      color: post.isLikedByCurrentUser
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      fontWeight: post.isLikedByCurrentUser ? 600 : 400,
                    }}
                  >
                    {post.likesCount} Likes
                  </Button>
                  <Button
                    size="small"
                    startIcon={<MessageSquare size={16} />}
                    onClick={() => handleOpenReplies(post)}
                    sx={{
                      textTransform: "none",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {post.repliesCount} Replies
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Loading More Indicator */}
        {loadingMore && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <CircularProgress size={40} />
          </Box>
        )}

        {/* Infinite Scroll Target */}
        <div ref={observerTarget} style={{ height: "20px" }} />

        {/* Empty State */}
        {posts.length === 0 && !loading && (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              background: "white",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
              No posts yet
            </Typography>
            <Typography variant="body2" sx={{ color: "text.disabled", mb: 3 }}>
              Be the first to ask a question!
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus size={20} />}
              onClick={() => setCreateDialogOpen(true)}
              sx={{
                background: theme.palette.gradients.primary,
                textTransform: "none",
              }}
            >
              Create Post
            </Button>
          </Paper>
        )}
      </Container>

      {/* Create Post Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Create New Post
            </Typography>
            <IconButton onClick={() => setCreateDialogOpen(false)} size="small">
              <X size={20} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {createError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {createError}
            </Alert>
          )}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="What's your question?"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={6}
              value={newPostBody}
              onChange={(e) => setNewPostBody(e.target.value)}
              placeholder="Provide more details about your question..."
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreatePost}
            disabled={creating}
            sx={{
              background: theme.palette.gradients.primary,
              textTransform: "none",
            }}
          >
            {creating ? "Creating..." : "Post"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog
        open={replyDialogOpen}
        onClose={() => setReplyDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Replies
            </Typography>
            <IconButton onClick={() => setReplyDialogOpen(false)} size="small">
              <X size={20} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedPost && (
            <>
              {/* Original Post */}
              <Paper
                sx={{
                  p: 2,
                  mb: 3,
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                  border: "1px solid rgba(5, 150, 105, 0.1)",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {selectedPost.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {selectedPost.body}
                </Typography>
              </Paper>

              <Divider sx={{ mb: 3 }} />

              {/* Replies List */}
              {loadingReplies ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : replies.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", py: 4, color: "text.secondary" }}
                >
                  No replies yet. Be the first to answer!
                </Typography>
              ) : (
                <Stack spacing={2} sx={{ mb: 3 }}>
                  {replies.map((reply) => (
                    <Paper
                      key={reply.id}
                      sx={{ p: 2, border: "1px solid #e0e0e0" }}
                    >
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{
                            background: theme.palette.gradients.primary,
                            width: 40,
                            height: 40,
                          }}
                        >
                          {reply.author.firstName[0]}
                          {reply.author.lastName[0]}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mb: 1 }}
                          >
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600 }}
                              >
                                {reply.author.firstName} {reply.author.lastName}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: theme.palette.text.secondary }}
                              >
                                {reply.author.currentPosition} at{" "}
                                {reply.author.currentCompany}
                              </Typography>
                            </Box>
                            {user.role === "alumni" && (
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteReply(reply.id)}
                                sx={{ color: theme.palette.error.main }}
                              >
                                <Trash2 size={16} />
                              </IconButton>
                            )}
                          </Stack>
                          <Typography
                            variant="body2"
                            sx={{ whiteSpace: "pre-wrap" }}
                          >
                            {reply.body}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: theme.palette.text.disabled, mt: 1 }}
                          >
                            {new Date(reply.createdAt).toLocaleString()}
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              )}

              {/* Reply Input (Alumni Only) */}
              {user.role === "alumni" && (
                <Box>
                  <Divider sx={{ mb: 2 }} />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Write your answer..."
                      value={replyBody}
                      onChange={(e) => setReplyBody(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      onClick={handleSubmitReply}
                      disabled={submittingReply || !replyBody.trim()}
                      sx={{
                        background: theme.palette.gradients.primary,
                        minWidth: "100px",
                      }}
                    >
                      <Send size={20} />
                    </Button>
                  </Stack>
                </Box>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
