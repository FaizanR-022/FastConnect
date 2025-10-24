import { useState } from "react";
import { AppBar, Toolbar, Container, useTheme } from "@mui/material";
import { Home, Users, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { ROUTES } from "../../../constants/constants";
import { createHeaderStyles } from "../../../styles/headerStyles";
import { Logo } from "./Logo";
import { NavLinksDesktop, NavLinksMobile } from "./NavLinks";
import { ProfileButton, ProfileMenu } from "./ProfileMenu";
import { NAV_ITEMS } from "../../../constants/headerConstants";

const Header = () => {
  const theme = useTheme();
  const styles = createHeaderStyles(theme);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleNavigateProfile = () => {
    handleMenuClose();
    navigate(ROUTES.PROFILE);
  };

  return (
    <AppBar position="fixed" elevation={0} sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar sx={styles.toolbar}>
          {/* Logo */}
          <Logo onClick={() => handleNavigate(ROUTES.HOME)} />

          {/* Navigation Links - Desktop */}
          <NavLinksDesktop navItems={NAV_ITEMS} onNavigate={handleNavigate} />

          {/* Navigation Links - Mobile */}
          <NavLinksMobile navItems={NAV_ITEMS} onNavigate={handleNavigate} />

          {/* Profile Button */}
          <ProfileButton user={user} onClick={handleMenuOpen} />

          {/* Profile Menu */}
          <ProfileMenu
            user={user}
            anchorEl={anchorEl}
            isOpen={isMenuOpen}
            onClose={handleMenuClose}
            onNavigateProfile={handleNavigateProfile}
            onLogout={handleLogout}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
