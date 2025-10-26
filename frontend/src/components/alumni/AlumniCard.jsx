import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import { MapPin, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { createAlumniStyles } from "../../styles/alumniStyles";

export const AlumniCard = ({ alumni, onClick }) => {
  const theme = useTheme();
  const styles = createAlumniStyles(theme);

  // Get previous companies display
  const maxVisiblePrevCompanies = 2;
  const visiblePrevCompanies = alumni.previousCompanies.slice(
    0,
    maxVisiblePrevCompanies
  );
  const remainingPrevCompanies =
    alumni.previousCompanies.length - maxVisiblePrevCompanies;

  return (
    <Card sx={styles.alumniCard} onClick={() => onClick(alumni)}>
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
        <Stack
          spacing={1}
          sx={{ mb: { xs: 2, md: 3 }, minHeight: { md: "165px" } }}
        >
          {/* Current Position & Company */}
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

          {/* Previous Companies */}
          {alumni.previousCompanies.length > 0 && (
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <Box sx={{ mt: 0.25, flexShrink: 0 }}>
                <Building2 size={16} color={theme.palette.text.secondary} />
              </Box>
              <Box>
                <Typography variant="body2" sx={styles.prevCompaniesLabel}>
                  Previously at:
                </Typography>
                <Typography variant="body2" sx={styles.prevCompaniesText}>
                  {visiblePrevCompanies.map((pc) => pc.companyName).join(", ")}
                  {remainingPrevCompanies > 0 &&
                    ` +${remainingPrevCompanies} more`}
                </Typography>
              </Box>
            </Stack>
          )}

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
          </Box>
        </Box>

        {/* Click to view hint */}
        {/* <Typography variant="caption" sx={styles.clickHint}>
          Click to view full profile
        </Typography> */}
      </CardContent>
    </Card>
  );
};
