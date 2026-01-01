import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AlertTriangle } from "lucide-react";

/**
 * Reusable confirmation dialog for destructive actions
 *
 * @param {boolean} open - Whether dialog is open
 * @param {function} onClose - Handler for closing dialog
 * @param {function} onConfirm - Handler for confirming action
 * @param {string} title - Dialog title
 * @param {string} message - Confirmation message
 * @param {string} confirmText - Text for confirm button (default: "Delete")
 * @param {string} cancelText - Text for cancel button (default: "Cancel")
 * @param {boolean} loading - Whether action is in progress
 */
export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          color: theme.palette.error.main,
          fontWeight: 600,
        }}
      >
        <AlertTriangle size={24} />
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          sx={{
            color: theme.palette.text.primary,
            fontSize: "0.95rem",
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            textTransform: "none",
            color: theme.palette.text.secondary,
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: theme.palette.error.main,
            "&:hover": {
              bgcolor: theme.palette.error.dark,
            },
          }}
        >
          {loading ? "Deleting..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
