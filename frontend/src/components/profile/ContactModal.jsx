import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import { X, Mail, Phone, Copy, Check } from "lucide-react";
import { createProfileStyles } from "../../styles/profileStyles";
import { useState } from "react";

export const ContactModal = ({ open, onClose, user }) => {
  const theme = useTheme();
  const styles = createProfileStyles(theme);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = async () => {
    if (user?.email) {
      await navigator.clipboard.writeText(user.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = async () => {
    if (user?.phone) {
      await navigator.clipboard.writeText(user.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: styles.modalPaper,
      }}
    >
      <DialogContent sx={styles.modalContent}>
        <Box sx={styles.modalHeader}>
          <Typography variant="h5" sx={styles.modalTitle}>
            Contact Information
          </Typography>
          <IconButton onClick={onClose} sx={styles.closeButton}>
            <X size={24} />
          </IconButton>
        </Box>

        <Box>
          <Box sx={styles.contactItem}>
            <Mail size={24} style={styles.contactIcon} />
            <Box sx={styles.contactText}>
              <Typography sx={styles.contactLabel}>Email</Typography>
              <Typography sx={styles.contactValue}>{user.email}</Typography>
            </Box>
            <IconButton onClick={handleCopyEmail} sx={styles.copyButton}>
              {copiedEmail ? <Check size={20} /> : <Copy size={20} />}
            </IconButton>
          </Box>

          {user.phone && (
            <Box sx={styles.contactItem}>
              <Phone size={24} style={styles.contactIcon} />
              <Box sx={styles.contactText}>
                <Typography sx={styles.contactLabel}>Phone</Typography>
                <Typography sx={styles.contactValue}>{user.phone}</Typography>
              </Box>
              <IconButton onClick={handleCopyPhone} sx={styles.copyButton}>
                {copiedPhone ? <Check size={20} /> : <Copy size={20} />}
              </IconButton>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
