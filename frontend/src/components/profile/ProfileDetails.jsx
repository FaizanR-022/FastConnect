import { Box, Container, Typography, Chip, Divider } from "@mui/material";
import {
  User,
  Mail,
  GraduationCap,
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  Linkedin,
  Award,
} from "lucide-react";
import { useTheme } from "@mui/material";
import { createProfileStyles } from "../../styles/profileStyles";

export const ProfileDetails = ({ user, isOwnProfile }) => {
  const theme = useTheme();
  const styles = createProfileStyles(theme);

  if (!user) return null;

  const DetailItem = ({ icon: Icon, label, value }) => {
    if (!value) return null;

    return (
      <Box sx={styles.detailItem}>
        <Icon size={20} style={styles.detailIcon} />
        <Typography sx={styles.detailLabel}>{label}:</Typography>
        <Typography sx={styles.detailValue}>{value}</Typography>
      </Box>
    );
  };

  const ExperienceItem = ({ experience }) => (
    <Box sx={styles.experienceItem}>
      <Box sx={styles.experienceHeader}>
        <Briefcase size={18} style={styles.detailIcon} />
        <Typography sx={styles.experiencePosition}>
          {experience.position}
        </Typography>
      </Box>
      <Typography sx={styles.experienceCompany}>
        {experience.company}
      </Typography>
      <Typography sx={styles.experienceYear}>
        <Calendar size={14} />
        {experience.from} - {experience.to}
      </Typography>
    </Box>
  );

  return (
    <Container sx={styles.detailsSection}>
      <Box sx={styles.detailsCard}>
        <Typography sx={styles.sectionTitle}>
          <User size={22} />
          Profile Information
        </Typography>

        {user.role === "student" && (
          <>
            <DetailItem icon={User} label="Full Name" value={user.fullName} />
            {isOwnProfile && (
              <DetailItem icon={Mail} label="Email" value={user.email} />
            )}
            <DetailItem
              icon={GraduationCap}
              label="Department"
              value={user.department}
            />
            <DetailItem icon={Building2} label="Campus" value={user.campus} />
            <DetailItem icon={Calendar} label="Batch Year" value={user.batch} />
          </>
        )}

        {user.role === "alumni" && (
          <>
            <DetailItem icon={User} label="Full Name" value={user.fullName} />
            <DetailItem
              icon={GraduationCap}
              label="Department"
              value={user.department}
            />
            <DetailItem icon={Building2} label="Campus" value={user.campus} />
            <DetailItem
              icon={Calendar}
              label="Graduation Year"
              value={user.graduationYear}
            />

            <Divider sx={{ my: 3 }} />

            <Typography sx={styles.sectionTitle}>
              <Briefcase size={22} />
              Professional Information
            </Typography>

            <DetailItem
              icon={Building2}
              label="Current Company"
              value={user.currentCompany}
            />
            <DetailItem
              icon={Briefcase}
              label="Current Position"
              value={user.currentPosition}
            />
            <DetailItem
              icon={MapPin}
              label="Location"
              value={
                user.currentCity && user.currentCountry
                  ? `${user.currentCity}, ${user.currentCountry}`
                  : user.currentCity || user.currentCountry
              }
            />
            {user.linkedin && (
              <DetailItem
                icon={Linkedin}
                label="LinkedIn"
                value={
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                    }}
                  >
                    View Profile
                  </a>
                }
              />
            )}

            {user.previousExperiences &&
              user.previousExperiences.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography sx={styles.sectionTitle}>
                    <Award size={22} />
                    Previous Experience
                  </Typography>
                  {user.previousExperiences.map((exp, index) => (
                    <ExperienceItem key={index} experience={exp} />
                  ))}
                </>
              )}

            {user.skills && user.skills.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography sx={styles.sectionTitle}>
                  <Award size={22} />
                  Skills & Expertise
                </Typography>
                <Box sx={styles.skillsContainer}>
                  {user.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill.name}
                      sx={styles.skillChip}
                    />
                  ))}
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};
