import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Send, AlertCircle } from "lucide-react";
import { createReplyStyles } from "../../styles/replyStyles";
import { createReplySchema } from "../../utils/postValidationSchemas";

export const CreateReply = ({ currentUser, onSubmit, loading }) => {
  const theme = useTheme();
  const styles = createReplyStyles(theme);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createReplySchema),
    defaultValues: {
      body: "",
    },
  });

  const isAlumni = currentUser?.role === "alumni";

  const handleFormSubmit = async (data) => {
    try {
      setError("");
      await onSubmit(data);
      reset();
    } catch (err) {
      setError(err.message || "Failed to post reply");
    }
  };

  if (!isAlumni) {
    return (
      <Box sx={styles.alumniOnlyMessage}>
        <AlertCircle size={24} style={{ color: "#d97706", flexShrink: 0 }} />
        <Typography variant="body2" sx={styles.alumniOnlyText}>
          Only alumni can reply to posts. As a student, you can ask questions by
          creating your own posts!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.createReplyContainer}>
      <Typography variant="h6" sx={styles.createReplyTitle}>
        Share Your Insights
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="body"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Your Reply"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                placeholder="Share your experience and advice..."
                error={!!errors.body}
                helperText={
                  errors.body?.message ||
                  `${field.value.length}/5000 characters`
                }
                sx={styles.replyTextField}
              />
            )}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="text"
              onClick={() => reset()}
              sx={styles.cancelReplyButton}
              disabled={isSubmitting || loading}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={isSubmitting || loading ? null : <Send size={18} />}
              sx={styles.submitReplyButton}
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Post Reply"
              )}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
