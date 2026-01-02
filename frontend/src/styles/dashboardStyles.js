export const createDashboardStyles = (theme) => ({
  // Page Container
  pageContainer: {
    minHeight: "100vh",
    bgcolor: theme.palette.background.default,
    pb: 6,
  },

  // Welcome Section
  welcomeSection: {
    mb: 4,
  },

  welcomeHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
    flexWrap: "wrap",
    gap: 2,
  },

  welcomeText: {
    display: "flex",
    alignItems: "baseline",
    gap: 1.5,
  },

  welcomeTitle: {
    fontSize: { xs: "1.75rem", md: "2rem" },
    fontWeight: 700,
    color: theme.palette.text.primary,
  },

  welcomeWave: {
    fontSize: { xs: "1.5rem", md: "1.75rem" },
  },

  newPostButton: {
    background: theme.palette.gradients.primary,
    textTransform: "none",
    px: 3,
    py: 1.25,
    borderRadius: 2,
    fontWeight: 600,
    fontSize: { xs: "0.875rem", md: "1rem" },
    boxShadow: "0 2px 8px rgba(5, 150, 105, 0.2)",
    "&:hover": {
      background: theme.palette.gradients.primaryHover,
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
    },
    transition: theme.custom.animations.transition.normal,
  },

  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    flexWrap: "wrap",
  },

  roleBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
    px: 2,
    py: 0.75,
    background: "linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)",
    color: theme.palette.primary.main,
    borderRadius: 2,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    fontWeight: 600,
    border: "1px solid rgba(5, 150, 105, 0.2)",
  },

  metaText: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.875rem", md: "1rem" },
  },

  metaDivider: {
    color: theme.palette.grey[300],
  },

  // Dashboard Grid
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 340px" },
    gap: 3,
    alignItems: "start",
  },

  // Main Content
  mainContent: {
    minHeight: "400px",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2.5,
    pb: 1.5,
    borderBottom: `2px solid ${theme.palette.grey[200]}`,
  },

  sectionTitle: {
    fontSize: { xs: "1.125rem", md: "1.25rem" },
    fontWeight: 700,
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    gap: 1,
  },

  postCount: {
    background: theme.palette.grey[100],
    color: theme.palette.text.secondary,
    padding: "2px 10px",
    borderRadius: 10,
    fontSize: { xs: "0.75rem", md: "0.813rem" },
    fontWeight: 600,
  },

  postsList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  // Empty State
  emptyState: {
    background: "white",
    border: `2px dashed ${theme.palette.grey[300]}`,
    borderRadius: 3,
    padding: { xs: "60px 30px", md: "80px 40px" },
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: { xs: "48px", md: "56px" },
    mb: 2,
    opacity: 0.4,
  },

  emptyTitle: {
    fontSize: { xs: "1.125rem", md: "1.25rem" },
    fontWeight: 600,
    color: theme.palette.text.primary,
    mb: 1,
  },

  emptyText: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.875rem", md: "1rem" },
    mb: 3,
    maxWidth: "400px",
    mx: "auto",
    lineHeight: 1.6,
  },

  emptyCta: {
    background: theme.palette.gradients.primary,
    textTransform: "none",
    px: 3,
    py: 1.5,
    borderRadius: 2,
    fontWeight: 600,
    fontSize: { xs: "0.875rem", md: "1rem" },
    "&:hover": {
      background: theme.palette.gradients.primaryHover,
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
    },
    transition: theme.custom.animations.transition.normal,
  },

  // Sidebar
  sidebar: {
    position: { xs: "static", md: "sticky" },
    top: { md: 24 },
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
  },

  sidebarCard: {
    background: "white",
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 3,
    padding: { xs: 2.5, md: 3 },
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },

  // User Info Card
  userInfo: {
    textAlign: "center",
  },

  userAvatar: {
    width: { xs: 64, md: 72 },
    height: { xs: 64, md: 72 },
    margin: "0 auto 16px",
    background: theme.palette.gradients.primary,
    border: `3px solid ${theme.palette.primary.light}20`,
    fontSize: { xs: "1.5rem", md: "1.75rem" },
    fontWeight: 700,
  },

  userName: {
    fontSize: { xs: "1rem", md: "1.125rem" },
    fontWeight: 700,
    color: theme.palette.text.primary,
    mb: 1.5,
  },

  userDetailsList: {
    display: "flex",
    flexDirection: "column",
    gap: 0.75,
  },

  userDetailItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
  },

  detailIcon: {
    fontSize: { xs: "0.875rem", md: "1rem" },
  },

  // Replies Sidebar
  sidebarTitle: {
    fontSize: { xs: "0.938rem", md: "1rem" },
    fontWeight: 700,
    color: theme.palette.text.primary,
    mb: 2,
    pb: 1.25,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },

  replyList: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },

  replyItem: {
    padding: 1.75,
    background: theme.palette.grey[50],
    borderRadius: 2,
    cursor: "pointer",
    transition: theme.custom.animations.transition.fast,
    border: `1px solid transparent`,
    "&:hover": {
      background: theme.palette.grey[100],
      borderColor: theme.palette.grey[300],
    },
  },

  replyText: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    lineHeight: 1.5,
    mb: 1,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  replyMeta: {
    display: "flex",
    alignItems: "center",
    gap: 0.75,
    fontSize: { xs: "0.75rem", md: "0.813rem" },
  },

  replyLabel: {
    color: theme.palette.text.disabled,
  },

  replyPostTitle: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  viewAllButton: {
    width: "100%",
    mt: 1.5,
    py: 1.25,
    background: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 2,
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    textTransform: "none",
    transition: theme.custom.animations.transition.fast,
    "&:hover": {
      background: theme.palette.grey[100],
      borderColor: theme.palette.grey[300],
    },
  },

  repliesEmpty: {
    textAlign: "center",
    padding: { xs: "30px 20px", md: "40px 20px" },
    color: theme.palette.text.disabled,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    lineHeight: 1.6,
  },

  // Loading
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
  },
});
