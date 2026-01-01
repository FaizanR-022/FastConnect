import {
  Box,
  Paper,
  Typography,
  Avatar,
  Stack,
  IconButton,
  Chip,
  useTheme,
  Button,
} from "@mui/material";
import { Heart, Trash2 } from "lucide-react";
import { createPostStyles } from "../../styles/postStyles";
import { formatDistanceToNow } from "../../utils/dateHelpers";

export const PostDetailView = ({ post, onLike, onDelete, showDelete }) => {
  const theme = useTheme();
  const styles = createPostStyles(theme);

  if (!post) return null;

  const { author, title, body, likesCount, isLikedByCurrentUser, createdAt } =
    post;

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <Paper elevation={0} sx={styles.postCard}>
      <Box sx={styles.postContent}>
        {/* Author Info */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-start"
          sx={{ mb: 3 }}
        >
          <Avatar
            sx={{
              ...styles.postAvatar,
              width: 56,
              height: 56,
              fontSize: "1.25rem",
            }}
          >
            {getInitials(author.firstName, author.lastName)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" sx={styles.postAuthorName}>
                {author.firstName} {author.lastName}
              </Typography>
              <Chip
                label={author.role.toUpperCase()}
                size="small"
                sx={
                  author.role === "alumni"
                    ? styles.alumniRoleBadge
                    : styles.studentRoleBadge
                }
              />
            </Stack>
            <Typography variant="caption" sx={styles.postTimestamp}>
              {formatDistanceToNow(createdAt)}
            </Typography>
          </Box>

          {/* Delete Button (for own posts) */}
          {showDelete && (
            <IconButton
              onClick={onDelete}
              sx={styles.deleteButton}
              size="small"
            >
              <Trash2 size={18} />
            </IconButton>
          )}
        </Stack>

        {/* Post Title */}
        <Typography
          variant="h5"
          sx={{
            ...styles.postTitle,
            mb: 2,
            fontSize: { xs: "1.25rem", md: "1.5rem" },
          }}
        >
          {title}
        </Typography>

        {/* Post Body - Full text, no truncation */}
        <Typography
          variant="body1"
          sx={{
            ...styles.postBody,
            color: theme.palette.text.primary,
            lineHeight: 1.7,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {body}
        </Typography>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          {/* Like Button */}
          <Button
            onClick={onLike}
            startIcon={
              <Heart
                size={18}
                fill={isLikedByCurrentUser ? theme.palette.error.main : "none"}
                color={
                  isLikedByCurrentUser
                    ? theme.palette.error.main
                    : theme.palette.text.secondary
                }
              />
            }
            sx={{
              ...styles.likeButton,
              color: isLikedByCurrentUser
                ? theme.palette.error.main
                : theme.palette.text.secondary,
            }}
          >
            {likesCount} {likesCount === 1 ? "Like" : "Likes"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
