import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { X } from "lucide-react";
import { createReplyStyles } from "../../styles/replyStyles";
import { ReplyList } from "./ReplyList";
import { CreateReply } from "./CreateReply";

export const RepliesModal = ({
  open,
  onClose,
  post,
  replies,
  repliesLoading,
  repliesError,
  currentUser,
  onCreateReply,
  onDeleteReply,
}) => {
  const theme = useTheme();
  const styles = createReplyStyles(theme);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, md: 3 },
          maxHeight: { xs: "100vh", md: "90vh" },
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ flex: 1, pr: 2 }}>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              {post?.title || "Post Replies"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
            >
              {post && (
                <>
                  by {post.author.firstName} {post.author.lastName}
                </>
              )}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
          >
            <X size={24} />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Check if it looks good at top, else shift it to bottom */}

        <CreateReply currentUser={currentUser} onSubmit={onCreateReply} />

        {repliesLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress size={40} />
          </Box>
        ) : (
          <ReplyList
            replies={replies}
            loading={false}
            error={repliesError}
            currentUser={currentUser}
            onDelete={onDeleteReply}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
