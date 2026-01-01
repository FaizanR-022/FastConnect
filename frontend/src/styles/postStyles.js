export const createPostStyles = (theme) => ({
  pageContainer: {
    position: "relative",
    background: "linear-gradient(to bottom, #f0fdf4 0%, #ffffff 100%)",
    minHeight: { xs: "auto", md: "calc(100vh - 64px - 200px)" },
  },

  pageHeader: {
    mb: { xs: 4, md: 6 },
  },

  pageTitle: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    mb: 1,
    letterSpacing: "0",
    fontSize: { xs: "1.5rem", md: "2.3rem" },
  },

  pageSubtitle: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.85rem", md: "1.02rem" },
  },

  createButton: {
    background: theme.palette.gradients.primary,
    textTransform: "none",
    px: 3,
    py: 1.25,
    borderRadius: 2,
    fontWeight: 600,
    boxShadow: theme.shadows[2],
    transition: theme.custom.animations.transition.normal,
    "&:hover": {
      background: theme.palette.gradients.primaryHover,
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[4],
    },
  },

  createPostButton: {
    background: theme.palette.gradients.primary,
    textTransform: "none",
    py: 1.5,
    px: 3,
    borderRadius: 2,
    fontWeight: 600,
    boxShadow: theme.shadows[6],
    transition: theme.custom.animations.transition.normal,
    "&:hover": {
      background: theme.palette.gradients.primaryHover,
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
    },
  },

  postCard: {
    cursor: "pointer",
    borderRadius: 3,
    border: "1px solid rgba(5, 150, 105, 0.1)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    mb: 2,
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "linear-gradient(90deg, #059669, #14b8a6)",
      opacity: 0,
      transition: "opacity 0.3s",
    },
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 24px rgba(5, 150, 105, 0.15)",
      border: "1px solid rgba(5, 150, 105, 0.2)",
      "&::before": {
        opacity: 1,
      },
    },
  },

  postCardContent: {
    p: { xs: 2.5, md: 3 },
  },

  postHeader: {
    display: "flex",
    alignItems: "center",
    mb: 2,
  },

  postAvatar: {
    background: theme.palette.gradients.primary,
    width: { xs: 40, md: 48 },
    height: { xs: 40, md: 48 },
    fontSize: { xs: "1rem", md: "1.125rem" },
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
  },

  postAuthorInfo: {
    ml: 1.5,
    flex: 1,
  },

  postAuthorName: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: { xs: "0.9rem", md: "1rem" },
  },

  postAuthorRole: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.75rem", md: "0.813rem" },
  },

  postTimestamp: {
    color: theme.palette.text.disabled,
    fontSize: { xs: "0.688rem", md: "0.75rem" },
  },

  postTitle: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    mb: 1,
    fontSize: { xs: "1.1rem", md: "1.25rem" },
    lineHeight: 1.4,
  },

  postBody: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.875rem", md: "0.938rem" },
    lineHeight: 1.7,
    mb: 2,
    // Limit to 3 lines in card view
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  postBodyFull: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.938rem", md: "1rem" },
    lineHeight: 1.8,
    mb: 3,
    whiteSpace: "pre-wrap",
  },

  // Post Footer (Actions)
  postFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    pt: 2,
    borderTop: "1px solid rgba(5, 150, 105, 0.1)",
  },

  postActions: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    fontWeight: 500,
    transition: theme.custom.animations.transition.fast,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },

  likeButton: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    fontWeight: 500,
    transition: theme.custom.animations.transition.fast,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.error.main,
    },
  },

  likeButtonActive: {
    color: theme.palette.error.main,
  },

  actionCount: {
    color: theme.palette.text.disabled,
    fontSize: { xs: "0.75rem", md: "0.813rem" },
    fontWeight: 500,
  },

  modalPaper: {
    borderRadius: { xs: 0, md: 3 },
    maxWidth: "700px",
    width: "100%",
  },

  modalContent: {
    p: { xs: 3, md: 4 },
  },

  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 3,
  },

  modalTitle: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: { xs: "1.25rem", md: "1.5rem" },
  },

  closeButton: {
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
  },

  formField: {
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

  submitButton: {
    background: theme.palette.gradients.primary,
    textTransform: "none",
    py: 1.5,
    px: 4,
    borderRadius: 2,
    fontWeight: 600,
    "&:hover": {
      background: theme.palette.gradients.primaryHover,
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
    },
  },

  cancelButton: {
    textTransform: "none",
    py: 1.5,
    px: 4,
    borderRadius: 2,
    fontWeight: 600,
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
  },

  emptyState: {
    textAlign: "center",
    py: 8,
  },

  emptyStateTitle: {
    color: theme.palette.text.secondary,
    mb: 1,
    fontSize: { xs: "1.125rem", md: "1.25rem" },
  },

  emptyStateText: {
    color: theme.palette.text.disabled,
    fontSize: { xs: "0.875rem", md: "1rem" },
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
  },

  // Delete Button (in post actions)
  deleteButton: {
    color: theme.palette.error.main,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    fontWeight: 500,
    cursor: "pointer",
    transition: theme.custom.animations.transition.fast,
    "&:hover": {
      color: theme.palette.error.dark,
    },
  },

  roleBadge: {
    px: 1,
    py: 0.25,
    borderRadius: 1,
    fontSize: "0.688rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  studentBadge: {
    background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    color: "#1e40af",
  },

  alumniBadge: {
    background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    color: theme.palette.primary.dark,
  },
});
