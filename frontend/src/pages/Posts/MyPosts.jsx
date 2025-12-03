// pages/Posts/MyPosts.jsx
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import { ThumbsUp, MessageSquare, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import api from "../../services/api";

export default function MyPosts() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user's posts
  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/posts/my-posts");
      setPosts(response.data.data.posts);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch your posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  // Delete Post
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
      setError("Failed to delete post");
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
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowLeft size={20} />}
            onClick={() => navigate(-1)}
            sx={{
              textTransform: "none",
              color: theme.palette.primary.main,
            }}
          >
            Back
          </Button>
        </Stack>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2.3rem" },
              mb: 1,
            }}
          >
            My Posts
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: "0.85rem", md: "1.02rem" },
            }}
          >
            Manage all your questions and posts
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Paper
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)",
              border: "1px solid rgba(5, 150, 105, 0.2)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {posts.length}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Total Posts
            </Typography>
          </Paper>
          <Paper
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)",
              border: "1px solid rgba(5, 150, 105, 0.2)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {posts.reduce((sum, post) => sum + post.likesCount, 0)}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Total Likes
            </Typography>
          </Paper>
          <Paper
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)",
              border: "1px solid rgba(5, 150, 105, 0.2)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {posts.reduce((sum, post) => sum + post.repliesCount, 0)}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Total Replies
            </Typography>
          </Paper>
        </Stack>

        {/* Posts List */}
        {posts.length === 0 ? (
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
              You haven't created any posts yet
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/posts")}
              sx={{
                background: theme.palette.gradients.primary,
                textTransform: "none",
              }}
            >
              Create Your First Post
            </Button>
          </Paper>
        ) : (
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
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          background: theme.palette.gradients.primary,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Stack>
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePost(post.id)}
                      sx={{ color: theme.palette.error.main }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
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

                  {/* Post Stats */}
                  <Stack direction="row" spacing={3}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <ThumbsUp size={16} color={theme.palette.primary.main} />
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {post.likesCount} Likes
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <MessageSquare
                        size={16}
                        color={theme.palette.primary.main}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {post.repliesCount} Replies
                      </Typography>
                    </Stack>
                    {post.isLikedByCurrentUser && (
                      <Chip
                        label="You liked this"
                        size="small"
                        sx={{
                          background:
                            "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                          color: theme.palette.primary.dark,
                          fontWeight: 500,
                          fontSize: "0.7rem",
                          height: 22,
                        }}
                      />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
