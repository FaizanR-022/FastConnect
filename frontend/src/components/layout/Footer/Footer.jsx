import { Box, Container, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import { LinkedIn, GitHub, Instagram, WhatsApp } from "@mui/icons-material";
import { createFooterStyles } from "../../../styles/footerStyles";
import { SOCIAL_LINKS } from "../../../constants/constants";

export const Footer = () => {
  const theme = useTheme();
  const styles = createFooterStyles(theme);

  // YOUR SOCIAL MEDIA LINKS - UPDATE THESE WITH YOUR ACTUAL LINKS

  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={styles.footer}>
      <Container sx={styles.footerContainer}>
        {/* Left Section */}
        <Box sx={styles.leftSection}>
          <Typography sx={styles.copyrightText}>
            © {currentYear} FastConnect. All rights reserved.
          </Typography>
          <Typography sx={styles.developerText}>
            Developed by Faizan Raza from FAST Karachi
          </Typography>
        </Box>

        {/* Right Section - Social Icons */}
        <Box sx={styles.rightSection}>
          <IconButton
            component="a"
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            sx={styles.socialIcon}
            aria-label="LinkedIn"
          >
            <LinkedIn />
          </IconButton>

          <IconButton
            component="a"
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            sx={styles.socialIcon}
            aria-label="WhatsApp"
          >
            <WhatsApp />
          </IconButton>

          <IconButton
            component="a"
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            sx={styles.socialIcon}
            aria-label="GitHub"
          >
            <GitHub />
          </IconButton>

          <IconButton
            component="a"
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            sx={styles.socialIcon}
            aria-label="Instagram"
          >
            <Instagram />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};
