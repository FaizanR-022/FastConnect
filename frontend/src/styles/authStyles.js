// styles/authStyles.js
import { keyframes } from "@mui/material";

// Blob animation
export const blob = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

// Create styles function that receives theme
export const createAuthStyles = (theme) => ({
  pageContainer: {
    minHeight: theme.custom.auth.pageMinHeight,
    position: "relative",
    background: theme.palette.background.gradient,
  },

  decorativeBlob: (delay = "0s") => ({
    position: "absolute",
    width: "288px",
    height: "288px",
    borderRadius: "50%",
    mixBlendMode: "multiply",
    filter: "blur(40px)",
    opacity: 0.3,
    animation: `${blob} ${theme.custom.auth.blobAnimation.duration} ${theme.custom.auth.blobAnimation.timing}`,
    animationDelay: delay,
  }),

  paper: {
    borderRadius: {
      xs: theme.shape.borderRadius,
      md: theme.shape.borderRadius * 2,
    },
    overflow: "hidden",
    boxShadow: theme.shadows[8],
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },

  formSection: {
    p: { xs: 3, md: 6 },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    bgcolor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(4px)",
  },

  iconBox: {
    p: { xs: 0.75, md: 1 },
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.gradients.icon,
  },

  title: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.h4.fontWeight,
    letterSpacing: theme.typography.h4.letterSpacing,
    fontSize: theme.typography.h4.fontSize,
  },

  underline: {
    height: "4px",
    width: { xs: "60px", md: "80px" },
    background: theme.palette.gradients.underline,
    borderRadius: "9999px",
    mt: 0.5,
  },

  subtitle: {
    color: theme.palette.text.secondary,
    mb: { xs: 3, md: 4 },
    fontSize: {
      xs: theme.typography.body2.fontSize,
      md: theme.typography.body1.fontSize,
    },
  },

  submitButton: {
    background: theme.palette.gradients.primary,
    textTransform: "none",
    py: 1.5,
    mt: 2,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[6],
    transition: theme.custom.animations.transition.normal,
    "&:hover": {
      background: theme.palette.gradients.primaryHover,
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
    },
  },

  infoSection: {
    position: "relative",
    p: { xs: 3, md: 6 },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
    minHeight: { xs: "300px", md: "auto" },
  },

  decorativeCircle: (size, position) => ({
    position: "absolute",
    ...position,
    width: size,
    height: size,
    border: "4px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
  }),

  featureBox: {
    ...theme.custom.auth.featureBoxStyles,
    p: { xs: 2, md: 3 },
    borderRadius: theme.shape.borderRadius * 1.5,
    mb: { xs: 3, md: 4 },
  },

  link: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontWeight: 500,
    transition: theme.custom.animations.transition.fast,
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.primary.dark,
    },
  },

  // Signup Choice specific styles
  signupCard: {
    p: 4,
    cursor: "pointer",
    transition: theme.custom.animations.transition.normal,
    border: `2px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius * 2,
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 24px rgba(5, 150, 105, 0.2)",
      borderColor: theme.palette.primary.main,
    },
  },

  signupIconBox: (gradient) => ({
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: gradient,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: "auto",
    mb: 3,
  }),

  // Info section text styles
  infoTitle: {
    color: "white",
    fontWeight: 700,
    mb: { xs: 2, md: 3 },
    letterSpacing: "-0.02em",
    fontSize: { xs: "1.5rem", md: "2rem" },
  },

  infoDescription: {
    color: "rgba(255,255,255,0.95)",
    mb: { xs: 3, md: 4 },
    lineHeight: 1.7,
    fontSize: {
      xs: theme.typography.body2.fontSize,
      md: theme.typography.body1.fontSize,
    },
  },

  featureTitle: {
    color: "white",
    mb: 2,
    fontWeight: 600,
    fontSize: {
      xs: theme.typography.body2.fontSize,
      md: theme.typography.body1.fontSize,
    },
  },

  featureItem: {
    color: "rgba(255,255,255,0.95)",
    fontSize: theme.typography.body2.fontSize,
  },

  featureBullet: {
    width: "6px",
    height: "6px",
    bgcolor: "white",
    borderRadius: "50%",
  },

  infoFooter: {
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    pt: 2,
  },

  infoFooterText: {
    color: "rgba(255,255,255,0.85)",
    fontStyle: "italic",
  },
});

// Export a default version for components that don't have access to theme
// (Components should use useTheme hook instead)
export const authStyles = {
  // Add any non-theme-dependent styles here if needed
};
