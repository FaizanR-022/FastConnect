// components/Alumni/AlumniCard.jsx
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import { MapPin, Briefcase, GraduationCap, Mail, Linkedin } from "lucide-react";
import { createAlumniStyles } from "../../styles/alumniStyles";

export const AlumniCard = ({ alumni }) => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  // Show only first 3 expertise tags, rest as "+X"
  // const maxVisibleTags = 3;
  // const visibleExpertise = alumni.expertise.slice(0, maxVisibleTags);
  // const remainingCount = alumni.expertise.length - maxVisibleTags;

  return (
    <Card sx={styles.alumniCard}>
      <CardContent sx={styles.cardContent}>
        {/* Header Section */}
        <Stack direction="row" spacing={1.5} sx={{ mb: { xs: 2, md: 3 } }}>
          <Avatar sx={styles.avatar}>{alumni.avatar}</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={styles.alumniName}>
              {alumni.name}
            </Typography>
            <Typography variant="body2" sx={styles.graduationYear}>
              Class of {alumni.graduationYear}
            </Typography>
          </Box>
        </Stack>

        {/* Info Section */}
        <Stack spacing={1} sx={{ mb: { xs: 2, md: 3 } }}>
          {/* Position & Company */}
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Box sx={{ mt: 0.25, flexShrink: 0 }}>
              <Briefcase size={16} color={theme.palette.primary.main} />
            </Box>
            <Box>
              <Typography variant="body2" sx={styles.infoLabel}>
                {alumni.currentPosition}
              </Typography>
              <Typography variant="body2" sx={styles.infoText}>
                {alumni.company}
              </Typography>
            </Box>
          </Stack>

          {/* Department */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ flexShrink: 0 }}>
              <GraduationCap size={16} color={theme.palette.primary.main} />
            </Box>
            <Typography variant="body2" sx={styles.infoText}>
              {alumni.department}
            </Typography>
          </Stack>

          {/* Location */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ flexShrink: 0 }}>
              <MapPin size={16} color={theme.palette.primary.main} />
            </Box>
            <Typography variant="body2" sx={styles.infoText}>
              {alumni.location}
            </Typography>
          </Stack>
        </Stack>

        {/* Expertise Section */}
        <Box sx={{ mb: { xs: 2, md: 3 } }}>
          <Typography variant="body2" sx={styles.expertiseLabel}>
            Expertise:
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
            {/* {remainingCount > 0 && (
              <Chip
                label={`+${remainingCount}`}
                size="small"
                sx={styles.expertiseMoreChip}
              />
            )} */}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={{ xs: 0.75, md: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Mail size={16} />}
            sx={styles.connectButton}
          >
            Connect
          </Button>
          <Button variant="text" size="small" sx={styles.linkedinButton}>
            <Linkedin size={18} />
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
