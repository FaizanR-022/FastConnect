import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Stack,
  useTheme,
  Chip,
} from "@mui/material";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { createPostStyles } from "../../styles/postStyles";
import { formatDistanceToNow } from "../../utils/dateHelpers";
import { ROUTES } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

export const PostCard = ({
  post,
  onRepliesClick,
  onLike,
  onDelete,
  currentUser,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const styles = createPostStyles(theme);
  const [isExpanded, setIsExpanded] = useState(false);

  console.log(post.author);
  const isOwnPost = currentUser?.id === post.author.id;
  const isLiked = post.isLikedByCurrentUser;

  const isTruncated = post.body.length > 200;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLike(post.id, isLiked);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(post.id);
  };

  const handleRepliesClick = (e) => {
    e.stopPropagation();
    onRepliesClick(post.id);
  };

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate(ROUTES.USER_PROFILE.replace(":userId", post.author.id));
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <Card sx={styles.postCard}>
      <CardContent sx={styles.postCardContent}>
        <Box sx={styles.postHeader}>
          <Avatar
            onClick={handleAuthorClick}
            sx={styles.postAvatar}
            src={post.author?.profilePicture}
          >
            {getInitials(post.author.firstName, post.author.lastName)}
          </Avatar>
          <Box sx={styles.postAuthorInfo}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="body1"
                sx={styles.postAuthorName}
                onClick={handleAuthorClick}
              >
                {post.author.firstName} {post.author.lastName}
              </Typography>
              <Chip
                label={post.author.role}
                size="small"
                sx={
                  post.author.role === "student"
                    ? { ...styles.roleBadge, ...styles.studentBadge }
                    : { ...styles.roleBadge, ...styles.alumniBadge }
                }
              />
            </Stack>
            <Typography variant="caption" sx={styles.postTimestamp}>
              {formatDistanceToNow(post.createdAt)}
            </Typography>
          </Box>
        </Box>

        {/* Post Content */}
        <Typography variant="h6" sx={styles.postTitle}>
          {post.title}
        </Typography>

        <Box>
          <Typography
            variant="body2"
            sx={isExpanded ? styles.postBodyFull : styles.postBody}
          >
            {post.body}
          </Typography>

          {isTruncated && (
            <Typography
              variant="body2"
              onClick={toggleExpand}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                cursor: "pointer",
                mt: 0.5,
                display: "inline-block",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {isExpanded ? "See less" : "See more..."}
            </Typography>
          )}
        </Box>

        <Box sx={styles.postFooter}>
          <Box sx={styles.postActions}>
            <Box
              sx={{
                ...styles.likeButton,
                ...(isLiked && styles.likeButtonActive),
              }}
              onClick={handleLikeClick}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              <Typography component="span" sx={styles.actionCount}>
                {post.likesCount}
              </Typography>
            </Box>

            <Box sx={styles.actionButton} onClick={handleRepliesClick}>
              <MessageCircle size={18} />
              <Typography component="span" sx={styles.actionCount}>
                {post.repliesCount}{" "}
                {post.repliesCount === 1 ? "reply" : "replies"}
              </Typography>
            </Box>
          </Box>

          {isOwnPost && (
            <Box sx={styles.deleteButton} onClick={handleDeleteClick}>
              <Trash2 size={16} />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
