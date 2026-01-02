export const createProfileStyles = (theme) => ({
  pageContainer: {
    minHeight: "100vh",
    bgcolor: theme.palette.grey[50],
    pb: 6,
  },

  headerSection: {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    pt: 4,
    pb: 8,
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
      pointerEvents: "none",
    },
  },

  headerContent: {
    position: "relative",
    zIndex: 1,
  },

  profilePictureContainer: {
    display: "flex",
    justifyContent: "center",
    mb: 3,
  },

  profilePicture: {
    width: { xs: 120, md: 150 },
    height: { xs: 120, md: 150 },
    border: `4px solid white`,
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  },

  userName: {
    color: "white",
    fontWeight: 700,
    textAlign: "center",
    fontSize: { xs: "1.75rem", md: "2.25rem" },
    mb: 1,
  },

  userMeta: {
    color: "rgba(255,255,255,0.95)",
    textAlign: "center",
    fontSize: { xs: "0.95rem", md: "1.05rem" },
    mb: 3,
  },

  editButton: {
    display: "flex",
    justifyContent: "center",
    mt: 2,
  },

  editButtonStyle: {
    color: theme.palette.primary.main,
    bgcolor: "white",
    px: 4,
    py: 1,
    fontWeight: 600,
    borderRadius: 2,
    textTransform: "none",
    "&:hover": {
      bgcolor: theme.palette.grey[100],
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    transition: "all 0.3s ease",
  },

  contactButton: {
    color: "white",
    borderColor: "rgba(255,255,255,0.5)",
    px: 4,
    py: 1,
    fontWeight: 600,
    borderRadius: 2,
    textTransform: "none",
    "&:hover": {
      borderColor: "white",
      bgcolor: "rgba(255,255,255,0.1)",
      transform: "translateY(-2px)",
    },
    transition: "all 0.3s ease",
  },

  detailsSection: {
    mt: -5,
    position: "relative",
    zIndex: 2,
  },

  detailsCard: {
    bgcolor: "white",
    borderRadius: 3,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    p: { xs: 3, md: 4 },
    mb: 3,
  },

  sectionTitle: {
    fontSize: { xs: "1.1rem", md: "1.25rem" },
    fontWeight: 700,
    color: theme.palette.text.primary,
    mb: 3,
    display: "flex",
    alignItems: "center",
    gap: 1,
  },

  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 2,
    mb: 2,
    "&:last-child": {
      mb: 0,
    },
  },

  detailIcon: {
    color: theme.palette.primary.main,
    mt: 0.3,
  },

  detailLabel: {
    fontWeight: 600,
    color: theme.palette.text.secondary,
    minWidth: { xs: 100, md: 140 },
    fontSize: { xs: "0.9rem", md: "0.95rem" },
  },

  detailValue: {
    color: theme.palette.text.primary,
    flex: 1,
    fontSize: { xs: "0.9rem", md: "0.95rem" },
  },

  experienceItem: {
    mb: 2.5,
    pb: 2.5,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    "&:last-child": {
      mb: 0,
      pb: 0,
      borderBottom: "none",
    },
  },

  experienceHeader: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    mb: 1,
  },

  experiencePosition: {
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: { xs: "0.95rem", md: "1rem" },
  },

  experienceCompany: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.875rem", md: "0.9rem" },
  },

  experienceYear: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.8rem", md: "0.85rem" },
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },

  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },

  skillChip: {
    bgcolor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    fontWeight: 500,
    fontSize: { xs: "0.8rem", md: "0.85rem" },
  },

  postsSection: {
    mt: 3,
  },

  postsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
    flexWrap: "wrap",
    gap: 2,
  },

  postsTitle: {
    fontSize: { xs: "1.25rem", md: "1.5rem" },
    fontWeight: 700,
    color: theme.palette.text.primary,
  },

  postsCount: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.9rem", md: "1rem" },
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
  },

  emptyState: {
    textAlign: "center",
    py: 8,
    px: 3,
  },

  emptyStateIcon: {
    fontSize: { xs: 60, md: 80 },
    color: theme.palette.text.disabled,
    mb: 2,
  },

  emptyStateTitle: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    mb: 1,
  },

  emptyStateText: {
    color: theme.palette.text.secondary,
  },

  // Contact Modal
  modalPaper: {
    borderRadius: 3,
    maxWidth: "500px",
  },

  modalContent: {
    p: { xs: 3, md: 4 },
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },

  modalTitle: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    fontSize: { xs: "1.25rem", md: "1.5rem" },
  },

  closeButton: {
    color: theme.palette.text.secondary,
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    p: 2,
    borderRadius: 2,
    bgcolor: theme.palette.grey[50],
    mb: 2,
    "&:last-child": {
      mb: 0,
    },
  },

  contactIcon: {
    color: theme.palette.primary.main,
  },

  contactText: {
    flex: 1,
  },

  contactLabel: {
    fontSize: "0.85rem",
    color: theme.palette.text.secondary,
    mb: 0.5,
  },

  contactValue: {
    fontSize: "1rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
  },

  copyButton: {
    minWidth: "auto",
    color: theme.palette.primary.main,
  },
});
