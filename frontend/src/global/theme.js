// theme/theme.js
import { createTheme } from "@mui/material/styles";

// ==================== COLOR PALETTE ====================
const colors = {
  // Primary Colors (Green/Teal)
  primary: {
    main: "#059669", // Emerald 600
    light: "#10b981", // Emerald 500
    dark: "#047857", // Emerald 700
    contrastText: "#ffffff",
  },

  secondary: {
    main: "#14b8a6", // Teal 500
    light: "#5eead4", // Teal 300
    dark: "#0d9488", // Teal 600
    contrastText: "#ffffff",
  },

  // Background Colors
  background: {
    default: "#f9fafb", // Gray 50
    paper: "#ffffff",
    gradient: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)",
  },

  // Text Colors
  text: {
    primary: "#111827", // Gray 900
    secondary: "#6b7280", // Gray 500
    disabled: "#9ca3af", // Gray 400
  },

  // Decorative Colors (for blobs and backgrounds)
  decorative: {
    blob1: "#a7f3d0", // Emerald 200
    blob2: "#99f6e4", // Teal 200
    blob3: "#a5f3fc", // Cyan 200
  },

  // Gradient Variations
  gradients: {
    primary: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    primaryHover: "linear-gradient(135deg, #047857 0%, #0f766e 100%)",
    icon: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
    underline: "linear-gradient(to right, #10b981, #14b8a6)",
    info1: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #059669 100%)",
    info2: "linear-gradient(135deg, #059669 0%, #0d9488 50%, #14b8a6 100%)",
    info3: "linear-gradient(135deg, #0d9488 0%, #059669 50%, #047857 100%)",
    student: "linear-gradient(135deg, #059669 0%, #14b8a6 100%)",
    alumni: "linear-gradient(135deg, #0d9488 0%, #047857 100%)",
  },

  // Status Colors
  success: {
    main: "#10b981",
    light: "#34d399",
    dark: "#059669",
  },

  error: {
    main: "#ef4444",
    light: "#f87171",
    dark: "#dc2626",
  },

  warning: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
  },

  info: {
    main: "#3b82f6",
    light: "#60a5fa",
    dark: "#2563eb",
  },
};

// ==================== TYPOGRAPHY ====================
const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },

  h2: {
    fontSize: "2rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
  },

  h3: {
    fontSize: "1.75rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.3,
  },

  h4: {
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.4,
  },

  h5: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.5,
  },

  h6: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.5,
  },

  body1: {
    fontSize: "1rem",
    lineHeight: 1.7,
  },

  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
  },

  button: {
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: "none",
    letterSpacing: "0.02em",
  },

  caption: {
    fontSize: "0.75rem",
    lineHeight: 1.5,
  },
};

// ==================== SPACING ====================
const spacing = 8; // Base spacing unit (8px)

// ==================== BREAKPOINTS ====================
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// ==================== SHADOWS ====================
const shadows = [
  "none",
  "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  "0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)",
  "0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)",
  "0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)",
  "0 20px 40px rgba(0, 0, 0, 0.2)",
  // Custom auth shadows
  "0 8px 20px rgba(5, 150, 105, 0.3)", // Button shadow
  "0 12px 24px rgba(5, 150, 105, 0.4)", // Button hover shadow
  "0 20px 60px rgba(5, 150, 105, 0.15)", // Paper shadow
  "0 8px 32px rgba(0, 0, 0, 0.1)", // Feature box shadow
  ...Array(15).fill("none"), // Fill remaining array slots
];

// ==================== BORDER RADIUS ====================
const shape = {
  borderRadius: 3,
};

// ==================== COMPONENT OVERRIDES ====================
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: "10px 24px",
        fontSize: "1rem",
        fontWeight: 500,
        textTransform: "none",
        boxShadow: "none",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "none",
        },
      },
      contained: {
        "&:hover": {
          transform: "translateY(-2px)",
        },
      },
      containedPrimary: {
        background: colors.gradients.primary,
        "&:hover": {
          background: colors.gradients.primaryHover,
        },
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
          "&:hover fieldset": {
            borderColor: colors.primary.light,
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.primary.main,
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: colors.primary.main,
        },
      },
    },
  },

  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.primary.light,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.primary.main,
        },
      },
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: colors.primary.main,
        "&.Mui-checked": {
          color: colors.primary.main,
        },
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
      elevation0: {
        boxShadow: shadows[8],
      },
    },
  },

  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: 16,
        paddingRight: 16,
        "@media (min-width: 600px)": {
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
  },

  MuiFormControlLabel: {
    styleOverrides: {
      label: {
        fontSize: "0.875rem",
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        fontSize: "0.75rem",
        marginTop: 4,
      },
    },
  },
};

// ==================== CUSTOM THEME VALUES ====================
// These are custom values you can access via theme.custom
const custom = {
  auth: {
    pageMinHeight: {
      xs: "auto",
      md: "calc(100vh - 64px - 200px)",
    },
    blobAnimation: {
      duration: "7s",
      timing: "infinite",
    },
    iconBoxSize: {
      xs: 6, // 48px
      md: 8, // 64px
    },
    decorativeCircleSizes: {
      large: 128,
      medium: 96,
      small: 64,
    },
    featureBoxStyles: {
      backgroundColor: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    },
  },

  animations: {
    transition: {
      fast: "all 0.2s ease",
      normal: "all 0.3s ease",
      slow: "all 0.5s ease",
    },
  },
};

// ==================== CREATE THEME ====================
const theme = createTheme({
  palette: {
    ...colors,
    mode: "light",
  },
  typography,
  spacing,
  breakpoints,
  shadows,
  shape,
  components,
  custom, // Custom values
});

export default theme;

// ==================== HELPER EXPORTS ====================
// Export individual parts for direct access
export {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  shape,
  components,
  custom,
};
