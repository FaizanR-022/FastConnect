import { Box, Button, IconButton, useTheme } from "@mui/material";
import { createHeaderStyles } from "../../../styles/headerStyles";

export const NavLinksDesktop = ({ navItems, onNavigate }) => {
  const theme = useTheme();
  const styles = createHeaderStyles(theme);

  return (
    <Box sx={styles.navLinksDesktop}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.label}
            startIcon={<Icon size={18} />}
            onClick={() => onNavigate(item.path)}
            sx={styles.navButton}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
};

export const NavLinksMobile = ({ navItems, onNavigate }) => {
  const theme = useTheme();
  const styles = createHeaderStyles(theme);

  return (
    <Box sx={styles.navLinksMobile}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <IconButton
            key={item.label}
            onClick={() => onNavigate(item.path)}
            sx={styles.navIconButton}
            aria-label={item.label}
          >
            <Icon size={20} />
          </IconButton>
        );
      })}
    </Box>
  );
};
