export const createHeaderStyles = (theme) => ({
  appBar: {
    background: theme.palette.gradients.primary,
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 0,
  },

  toolbar: {
    minHeight: { xs: 64, md: 70 },
    px: { xs: 0, sm: 2 },
  },

  logoContainer: {
    mr: 4,
    cursor: "pointer",
  },

  logoBox: {
    p: 1,
    borderRadius: 2,
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.custom.animations.transition.normal,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.25)",
      transform: "translateY(-2px)",
    },
  },

  logoText: {
    color: "white",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    display: { xs: "none", sm: "block" },
  },

  navLinksDesktop: {
    flexGrow: 1,
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    gap: 1,
  },

  navLinksMobile: {
    flexGrow: 1,
    display: { xs: "flex", md: "none" },
    justifyContent: "center",
    gap: 0.5,
  },

  navButton: {
    color: "white",
    textTransform: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
    px: 2.5,
    py: 1,
    borderRadius: 2,
    transition: theme.custom.animations.transition.normal,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.3)",
      transform: "translateY(-2px)",
    },
  },

  navIconButton: {
    color: "white",
    transition: theme.custom.animations.transition.normal,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)",
      transform: "translateY(-2px)",
    },
  },

  profileButton: {
    p: 0.5,
    transition: theme.custom.animations.transition.normal,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.3)",
      transform: "translateY(-2px)",
    },
  },

  avatar: {
    width: 40,
    height: 40,
    background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: "1rem",
    border: "2px solid rgba(255,255,255,0.3)",
  },

  menu: {
    mt: 1.5,
    minWidth: 200,
    borderRadius: 3,
    overflow: "visible",
    border: `1px solid ${theme.palette.primary.main}1A`, // 1A = 10% opacity
    boxShadow: "0 12px 24px rgba(5, 150, 105, 0.15)",
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
      border: `1px solid ${theme.palette.primary.main}1A`,
      borderRight: "none",
      borderBottom: "none",
    },
  },

  userInfoContainer: {
    px: 2,
    py: 1.5,
    mb: 1,
  },

  userName: {
    fontWeight: 600,
    color: theme.palette.text.primary,
    mb: 0.5,
  },

  userEmail: {
    color: theme.palette.text.secondary,
    display: "block",
  },

  roleBadge: {
    mt: 1,
    px: 1.5,
    py: 0.5,
    borderRadius: 1,
    background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    display: "inline-block",
  },

  roleText: {
    color: theme.palette.primary.dark,
    fontWeight: 600,
    fontSize: "0.7rem",
    textTransform: "capitalize",
  },

  menuItem: {
    py: 1.5,
    px: 2,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}14`, // 14 = 8% opacity
    },
  },

  logoutMenuItem: {
    py: 1.5,
    px: 2,
    "&:hover": {
      backgroundColor: `${theme.palette.error.main}14`,
    },
  },

  menuItemText: {
    fontSize: "0.9rem",
    fontWeight: 500,
  },

  logoutText: {
    fontSize: "0.9rem",
    fontWeight: 500,
    color: theme.palette.error.main,
  },
});
