// styles/alumniStyles.js

export const createAlumniStyles = (theme) => ({
  pageContainer: {
    position: "relative",
    background: "linear-gradient(to bottom, #f0fdf4 0%, #ffffff 100%)",
    minHeight: { xs: "auto", md: "calc(100vh - 64px - 200px)" },
  },

  decorativeBackground: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },

  decorativeBlob: (position) => ({
    position: "absolute",
    ...position,
    width: "384px",
    height: "384px",
    borderRadius: "50%",
    mixBlendMode: "multiply",
    filter: "blur(96px)",
    opacity: 0.4,
  }),

  pageHeader: {
    mb: { xs: 4, md: 6 },
  },

  pageTitle: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    mb: 1,
    letterSpacing: "-0.02em",
    fontSize: { xs: "1.75rem", md: "2.5rem" },
  },

  pageSubtitle: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.9rem", md: "1.05rem" },
  },

  filtersContainer: {
    mb: { xs: 4, md: 5 },
  },

  searchField: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      borderRadius: 3,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      border: "2px solid transparent",
      transition: "all 0.3s",
      "&:hover": {
        borderColor: "rgba(5, 150, 105, 0.2)",
      },
      "&.Mui-focused": {
        borderColor: theme.palette.primary.main,
        boxShadow: "0 4px 16px rgba(5, 150, 105, 0.15)",
      },
    },
  },

  filterSelect: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      borderRadius: 3,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    },
  },

  resultsCounter: {
    mb: { xs: 3, md: 4 },
    p: { xs: 1, md: 1.5 },
    backgroundColor: "white",
    borderRadius: 3,
    display: "inline-block",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid rgba(5, 150, 105, 0.1)",
  },

  resultsCountText: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    fontSize: { xs: "0.775rem", md: "0.9rem" },
  },

  resultsCountNumber: {
    fontSize: { xs: "1rem", md: "1.1rem" },
  },

  alumniCard: {
    height: "100%",
    minHeight: { xs: "auto", sm: "420px" },
    maxHeight: { xs: "auto", sm: "420px" },
    minWidth: { xs: "340px", sm: "350px" },
    maxWidth: { xs: "340px", sm: "350px" },
    display: "flex",
    flexDirection: "column",
    borderRadius: 3,
    border: "1px solid rgba(5, 150, 105, 0.1)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
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
      transform: "translateY(-8px)",
      boxShadow: "0 16px 32px rgba(5, 150, 105, 0.15)",
      border: "1px solid rgba(5, 150, 105, 0.2)",
      "&::before": {
        opacity: 1,
      },
    },
  },

  cardContent: {
    flexGrow: 1,
    p: { xs: 2, md: 3 },
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  avatar: {
    background: theme.palette.gradients.primary,
    width: { xs: 50, md: 60 },
    height: { xs: 50, md: 60 },
    fontSize: { xs: "1rem", md: "1.25rem" },
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(5, 150, 105, 0.3)",
  },

  alumniName: {
    color: theme.palette.text.primary,
    fontWeight: 600,
    mb: 0.5,
    fontSize: { xs: "1rem", md: "1.25rem" },
  },

  graduationYear: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.75rem", md: "0.813rem" },
  },

  infoLabel: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: { xs: "0.875rem", md: "0.9rem" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
  },

  infoText: {
    color: theme.palette.text.secondary,
    fontSize: { xs: "0.75rem", md: "0.813rem" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  expertiseLabel: {
    color: theme.palette.text.secondary,
    mb: 1.5,
    fontSize: { xs: "0.75rem", md: "0.813rem" },
    fontWeight: 600,
  },

  expertiseChip: {
    background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    color: theme.palette.primary.dark,
    fontSize: "0.75rem",
    height: 26,
    fontWeight: 500,
    border: "1px solid rgba(5, 150, 105, 0.2)",
    transition: "all 0.2s",
    "&:hover": {
      background: theme.palette.gradients.primary,
      color: "white",
      transform: "translateY(-2px)",
    },
  },

  expertiseMoreChip: {
    background: "linear-gradient(135deg, #059669 0%, #14b8a6 100%)",
    color: "white",
    fontSize: "0.75rem",
    height: 26,
    fontWeight: 600,
    border: "1px solid rgba(5, 150, 105, 0.3)",
    cursor: "default",
  },

  expertiseContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    minHeight: "60px",
    maxHeight: "60px",
    overflow: "hidden",
  },

  connectButton: {
    textTransform: "none",
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderRadius: 2,
    px: { xs: 1.5, md: 2 },
    py: { xs: 0.5, md: 0.75 },
    fontWeight: 500,
    flex: 1,
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    transition: "all 0.3s",
    "&:hover": {
      borderColor: theme.palette.primary.dark,
      background: "linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(5, 150, 105, 0.2)",
    },
  },

  linkedinButton: {
    textTransform: "none",
    color: theme.palette.primary.main,
    borderRadius: 2,
    minWidth: "auto",
    px: { xs: 1.5, md: 2 },
    py: { xs: 0.5, md: 0.75 },
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "#f0fdf4",
      transform: "translateY(-2px)",
    },
  },

  emptyState: {
    textAlign: "center",
    py: 8,
  },

  emptyStateTitle: {
    color: theme.palette.text.secondary,
    mb: 1,
  },

  emptyStateText: {
    color: theme.palette.text.disabled,
  },
});
