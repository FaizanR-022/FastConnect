import { Box, Typography, Avatar, Stack, useTheme } from "@mui/material";
import { Trash2 } from "lucide-react";
import { createReplyStyles } from "../../styles/replyStyles";
import { formatDistanceToNow } from "../../utils/dateHelpers";

export const ReplyCard = ({ reply, currentUser, onDelete }) => {
  const theme = useTheme();
  const styles = createReplyStyles(theme);

  const isOwnReply =
    currentUser?.role === "alumni" && currentUser?.id === reply.author?.id;

  const handleDeleteClick = () => {
    onDelete(reply.id);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <Box sx={styles.replyCard}>
      <Box sx={styles.replyHeader}>
        <Avatar sx={styles.replyAvatar}>
          {getInitials(reply.author.firstName, reply.author.lastName)}
        </Avatar>

        <Box sx={styles.replyAuthorInfo}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="body1" sx={styles.replyAuthorName}>
              {reply.author.firstName} {reply.author.lastName}
            </Typography>
            <Box sx={styles.alumniRoleBadge}>Alumni</Box>
          </Stack>

          {reply.author.currentPosition && (
            <Typography variant="body2" sx={styles.replyAuthorPosition}>
              {reply.author.currentPosition}
              {reply.author.currentCompany &&
                ` at ${reply.author.currentCompany}`}
            </Typography>
          )}
        </Box>

        <Typography variant="caption" sx={styles.replyTimestamp}>
          {formatDistanceToNow(reply.createdAt)}
        </Typography>
      </Box>

      <Typography variant="body2" sx={styles.replyBody}>
        {reply.body}
      </Typography>

      {isOwnReply && (
        <Box sx={styles.replyActions}>
          <Box sx={styles.deleteReplyButton} onClick={handleDeleteClick}>
            <Trash2 size={14} />
            <Typography component="span">Delete</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
