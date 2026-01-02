// styles/replyStyles.js

export const createReplyStyles = (theme) => ({
  // Reply Section Container
  replySection: {
    mt: 4,
    pt: 4,
    borderTop: "2px solid rgba(5, 150, 105, 0.1)",
  },

  replySectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 3,
  },

  replySectionTitle: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: { xs: "1.125rem", md: "1.25rem" },
  },

  replyCount: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.875rem", md: "1rem" },
    fontWeight: 500,
  },

  // Reply Card
  replyCard: {
    p: { xs: 2, md: 2.5 },
    mb: 2,
    borderRadius: 2,
    backgroundColor: "#f9fafb",
    border: "1px solid rgba(5, 150, 105, 0.08)",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "#f0fdf4",
      border: "1px solid rgba(5, 150, 105, 0.15)",
    },
  },

  // Reply Header (Alumni Info)
  replyHeader: {
    display: "flex",
    alignItems: "flex-start",
    mb: 1.5,
  },

  replyAvatar: {
    background: theme.palette.gradients.primary,
    width: { xs: 36, md: 40 },
    height: { xs: 36, md: 40 },
    fontSize: { xs: "0.875rem", md: "1rem" },
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(5, 150, 105, 0.25)",
    cursor: "pointer",
    "&:hover": { opacity: 0.8 },
  },

  replyAuthorInfo: {
    ml: 1.5,
    flex: 1,
  },

  replyAuthorName: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: { xs: "0.875rem", md: "0.938rem" },
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  },

  replyAuthorPosition: {
    color: theme.palette.primary.main,
    fontSize: { xs: "0.75rem", md: "0.813rem" },
    fontWeight: 500,
    mt: 0.25,
  },

  replyAuthorCompany: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.688rem", md: "0.75rem" },
  },

  replyTimestamp: {
    color: theme.palette.text.disabled,
    fontSize: { xs: "0.688rem", md: "0.75rem" },
    textAlign: "right",
  },

  // Reply Content
  replyBody: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.875rem", md: "0.938rem" },
    lineHeight: 1.7,
    ml: { xs: 6, md: 7 },
    whiteSpace: "pre-wrap",
  },

  // Reply Actions (Delete)
  replyActions: {
    display: "flex",
    justifyContent: "flex-end",
    mt: 1,
    ml: { xs: 6, md: 7 },
  },

  deleteReplyButton: {
    color: theme.palette.error.main,
    fontSize: { xs: "0.75rem", md: "0.813rem" },
    fontWeight: 500,
    cursor: "pointer",
    transition: theme.custom.animations.transition.fast,
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    "&:hover": {
      color: theme.palette.error.dark,
    },
  },

  // Create Reply Form
  createReplyContainer: {
    mt: 3,
    p: { xs: 2.5, md: 3 },
    borderRadius: 3,
    background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
    border: "1px solid rgba(5, 150, 105, 0.1)",
  },

  createReplyTitle: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: { xs: "1rem", md: "1.125rem" },
    mb: 2,
  },

  replyTextField: {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      borderRadius: 2,
      "&:hover fieldset": {
        borderColor: theme.palette.primary.light,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },

  submitReplyButton: {
    background: theme.palette.gradients.primary,
    textTransform: "none",
    py: 1.25,
    px: 3,
    borderRadius: 2,
    fontWeight: 600,
    "&:hover": {
      background: theme.palette.gradients.primaryHover,
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[6],
    },
  },

  cancelReplyButton: {
    textTransform: "none",
    py: 1.25,
    px: 3,
    borderRadius: 2,
    fontWeight: 600,
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
  },

  // Alumni Only Message (for students)
  alumniOnlyMessage: {
    mt: 3,
    p: 3,
    borderRadius: 3,
    background: "linear-gradient(135dег, #fef3c7 0%, #fde68a 100%)",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  alumniOnlyIcon: {
    color: "#d97706",
    flexShrink: 0,
  },

  alumniOnlyText: {
    color: "#92400e",
    fontSize: { xs: "0.875rem", md: "0.938rem" },
    fontWeight: 500,
  },

  // Empty State for Replies
  replyEmptyState: {
    textAlign: "center",
    py: 6,
    px: 2,
  },

  replyEmptyStateIcon: {
    color: theme.palette.text.disabled,
    mb: 2,
  },

  replyEmptyStateTitle: {
    color: theme.palette.text.secondary,
    mb: 1,
    fontSize: { xs: "1rem", md: "1.125rem" },
  },

  replyEmptyStateText: {
    color: theme.palette.text.disabled,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
  },

  // Loading State
  replyLoadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
  },

  // Alumni Badge in Reply
  alumniRoleBadge: {
    px: 1,
    py: 0.25,
    borderRadius: 1,
    fontSize: "0.688rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    color: theme.palette.primary.dark,
    ml: 1,
    display: "inline-block",
  },
});
