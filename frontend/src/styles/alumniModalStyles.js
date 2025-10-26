export const createAlumniModalStyles = (theme) => ({
  dialogPaper: {
    borderRadius: { xs: 0, md: 4 },
    maxHeight: { xs: "100vh", md: "90vh" },
  },

  dialogContent: {
    p: { xs: 3, md: 4 },
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    top: { xs: 8, md: 16 },
    right: { xs: 8, md: 16 },
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
  },

  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: { xs: 2, md: 3 },
  },

  avatar: {
    background: theme.palette.gradients.primary,
    width: { xs: 80, md: 100 },
    height: { xs: 80, md: 100 },
    fontSize: { xs: "1.75rem", md: "2.25rem" },
    fontWeight: 700,
    boxShadow: "0 8px 24px rgba(5, 150, 105, 0.3)",
  },

  name: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: { xs: "1.5rem", md: "2rem" },
  },

  graduationYear: {
    color: theme.palette.text.secondary,
    mt: 0.5,
    fontSize: { xs: "0.875rem", md: "1rem" },
  },

  section: {
    mb: 3,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 2,
    background: "linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  sectionLabel: {
    color: theme.palette.text.secondary,
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    mb: 0.5,
  },

  sectionValue: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: { xs: "1rem", md: "1.125rem" },
  },

  companyName: {
    color: theme.palette.primary.main,
    fontSize: { xs: "0.875rem", md: "1rem" },
    fontWeight: 500,
    mt: 0.5,
  },

  prevCompanyItem: {
    p: 2,
    borderRadius: 2,
    backgroundColor: "#f9fafb",
    border: "1px solid rgba(5, 150, 105, 0.1)",
  },

  prevCompanyName: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: { xs: "0.9rem", md: "1rem" },
  },

  prevCompanyRole: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    mt: 0.25,
  },

  prevCompanyDuration: {
    color: theme.palette.text.disabled,
    fontSize: "0.75rem",
    mt: 0.5,
    display: "block",
  },

  expertiseContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    mt: 1.5,
  },

  expertiseChip: {
    background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    color: theme.palette.primary.dark,
    fontSize: "0.813rem",
    height: 28,
    fontWeight: 500,
    border: "1px solid rgba(5, 150, 105, 0.2)",
  },

  contactSection: {
    p: 3,
    borderRadius: 3,
    background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
    border: "1px solid rgba(5, 150, 105, 0.1)",
  },

  contactTitle: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: { xs: "1.125rem", md: "1.25rem" },
  },

  contactIconBox: {
    width: 36,
    height: 36,
    borderRadius: 2,
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    border: "1px solid rgba(5, 150, 105, 0.2)",
  },

  contactLabel: {
    color: theme.palette.text.secondary,
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  contactValue: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: { xs: "0.875rem", md: "1rem" },
    mt: 0.25,
    wordBreak: "break-all",
  },

  connectButton: {
    background: theme.palette.gradients.primary,
    textTransform: "none",
    py: 1.5,
    borderRadius: 2,
    fontWeight: 600,
    fontSize: { xs: "0.875rem", md: "1rem" },
    "&:hover": {
      background: theme.palette.gradients.primaryHover,
      transform: "translateY(-2px)",
      boxShadow: "0 8px 16px rgba(5, 150, 105, 0.3)",
    },
  },

  linkedinButton: {
    textTransform: "none",
    py: 1.5,
    borderRadius: 2,
    fontWeight: 600,
    fontSize: { xs: "0.875rem", md: "1rem" },
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    "&:hover": {
      borderColor: theme.palette.primary.dark,
      background: "linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)",
      transform: "translateY(-2px)",
    },
  },
});
