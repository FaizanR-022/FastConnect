import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { X, Send } from "lucide-react";
import { createPostStyles } from "../../styles/postStyles";
import { createPostSchema } from "../../utils/postValidationSchemas";

export const CreatePost = ({ open, onClose, onSubmit, loading }) => {
  const theme = useTheme();
  const styles = createPostStyles(theme);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const handleClose = () => {
    reset();
    setError("");
    onClose();
  };

  const handleFormSubmit = async (data) => {
    try {
      setError("");
      await onSubmit(data);
      reset();
      handleClose();
    } catch (err) {
      setError(err.message || "Failed to create post");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: styles.modalPaper,
      }}
    >
      <DialogContent sx={styles.modalContent}>
        <Box sx={styles.modalHeader}>
          <Typography variant="h5" sx={styles.modalTitle}>
            Create New Post
          </Typography>
          <IconButton onClick={handleClose} sx={styles.closeButton}>
            <X size={24} />
          </IconButton>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Post Title"
                  variant="outlined"
                  fullWidth
                  placeholder="Ask a question or share your thoughts..."
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  sx={styles.formField}
                />
              )}
            />

            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Post Content"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={8}
                  placeholder="Provide details about your question or topic..."
                  error={!!errors.body}
                  helperText={
                    errors.body?.message ||
                    `${field.value.length}/5000 characters`
                  }
                  sx={styles.formField}
                />
              )}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="text"
                onClick={handleClose}
                sx={styles.cancelButton}
                disabled={isSubmitting || loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={isSubmitting || loading ? null : <Send size={18} />}
                sx={styles.submitButton}
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Post"
                )}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
