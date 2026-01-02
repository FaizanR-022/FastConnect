export const createFooterStyles = (theme) => ({
  footer: {
    background: theme.palette.gradients.primary,
    color: "white",
    py: { xs: 2, md: 2 },
    mt: "auto",
  },

  footerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 2,
  },

  leftSection: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },

  copyrightText: {
    fontSize: { xs: "0.875rem", md: "1rem" },
    fontWeight: 500,
    opacity: 0.95,
  },

  developerText: {
    fontSize: { xs: "0.813rem", md: "0.875rem" },
    opacity: 0.85,
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },

  socialIcon: {
    color: "white",
    transition: theme.custom.animations.transition.fast,
    padding: 1,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transform: "translateY(-3px)",
    },
  },
});
