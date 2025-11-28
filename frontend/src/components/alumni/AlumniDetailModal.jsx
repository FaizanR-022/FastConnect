// components/Alumni/AlumniDetailModal.jsx
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Building2,
  Linkedin,
} from "lucide-react";
import { createAlumniModalStyles } from "../../styles/alumniModalStyles";

export const AlumniDetailModal = ({ alumni, open, onClose }) => {
  const theme = useTheme();
  const styles = createAlumniModalStyles(theme);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!alumni) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: styles.dialogPaper,
      }}
    >
      <DialogContent sx={styles.dialogContent}>
        {/* Close Button */}
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <X size={24} />
        </IconButton>

        {/* Header Section */}
        <Box sx={styles.header}>
          <Avatar sx={styles.avatar}>{alumni.avatar}</Avatar>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="h4" sx={styles.name}>
              {alumni.name}
            </Typography>
            <Typography variant="body1" sx={styles.graduationYear}>
              Class of {alumni.graduationYear} ({alumni.campus}) •{" "}
              {alumni.department}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Current Position */}
        <Box sx={styles.section}>
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box sx={styles.iconBox}>
              <Briefcase size={20} color={theme.palette.primary.main} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={styles.sectionLabel}>
                Current Position
              </Typography>
              <Typography variant="h6" sx={styles.sectionValue}>
                {alumni.currentPosition}
              </Typography>
              <Typography variant="body2" sx={styles.companyName}>
                {alumni.company}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Previous Companies */}
        {alumni.previousCompanies.length > 0 && (
          <Box sx={styles.section}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Box sx={styles.iconBox}>
                <Building2 size={20} color={theme.palette.primary.main} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={styles.sectionLabel}>
                  Previous Experience
                </Typography>
                <Stack spacing={1.5} sx={{ mt: 1 }}>
                  {alumni.previousCompanies.map((pc, index) => (
                    <Box key={index} sx={styles.prevCompanyItem}>
                      <Typography variant="body1" sx={styles.prevCompanyName}>
                        {pc.companyName}
                      </Typography>
                      <Typography variant="body2" sx={styles.prevCompanyRole}>
                        {pc.role}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={styles.prevCompanyDuration}
                      >
                        {pc.duration.from} - {pc.duration.to}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>
        )}

        {/* Location */}
        <Box sx={styles.section}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={styles.iconBox}>
              <MapPin size={20} color={theme.palette.primary.main} />
            </Box>
            <Box>
              <Typography variant="body2" sx={styles.sectionLabel}>
                Location
              </Typography>
              <Typography variant="body1" sx={styles.sectionValue}>
                {alumni.location}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Expertise */}
        <Box sx={styles.section}>
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box sx={styles.iconBox}>
              <GraduationCap size={20} color={theme.palette.primary.main} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={styles.sectionLabel}>
                Areas of Expertise
              </Typography>
              <Box sx={styles.expertiseContainer}>
                {alumni.expertise.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={styles.expertiseChip}
                  />
                ))}
              </Box>
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Contact Information */}
        <Box sx={styles.contactSection}>
          <Typography variant="h6" sx={styles.contactTitle}>
            Contact Information
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {/* Email */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={styles.contactIconBox}>
                <Mail size={18} />
              </Box>
              <Box>
                <Typography variant="body2" sx={styles.contactLabel}>
                  Email
                </Typography>
                <Typography variant="body1" sx={styles.contactValue}>
                  {alumni.email}
                </Typography>
              </Box>
            </Stack>

            {/* Phone */}
            {alumni.phone && (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={styles.contactIconBox}>
                  <Phone size={18} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={styles.contactLabel}>
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={styles.contactValue}>
                    {alumni.phone}
                  </Typography>
                </Box>
              </Stack>
            )}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Mail size={18} />}
            sx={styles.connectButton}
            href={`mailto:${alumni.email}`}
          >
            Send Email
          </Button>
          <Button
            variant="outlined"
            startIcon={<Linkedin size={18} />}
            sx={styles.linkedinButton}
          >
            LinkedIn
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
