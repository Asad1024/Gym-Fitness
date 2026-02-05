import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";
import {
  MenuIcon,
  CloseIcon,
  DarkModeIcon,
  LightModeIcon,
} from "./Icons";
import { useApp } from "../context/AppContext";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/#exercises", label: "Exercises" },
  { to: "/timer", label: "Rest Timer" },
  { to: "/diet", label: "Diet" },
  { to: "/bmi", label: "BMI" },
  { to: "/calories", label: "Calories" },
  { to: "/1rm", label: "1RM" },
  { to: "/favorites", label: "Favorites" },
];

const Navbar = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const isActive = (path) => location.pathname === path;

  const drawer = (
    <Box sx={{ width: 280, pt: 3, px: 2 }} role="presentation">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton onClick={handleDrawerToggle} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <List disablePadding>
        {navItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={Link}
              to={item.to}
              onClick={handleDrawerToggle}
              sx={{
                py: 1.75,
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.dark" },
                },
              }}
              selected={isActive(item.to)}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600, fontSize: "1rem" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton onClick={() => { toggleDarkMode(); handleDrawerToggle(); }} sx={{ py: 1.75, borderRadius: 2 }}>
            {darkMode ? <LightModeIcon sx={{ mr: 1.5 }} /> : <DarkModeIcon sx={{ mr: 1.5 }} />}
            <ListItemText primary={darkMode ? "Light" : "Dark"} primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(15, 23, 42, 0.88)" : "rgba(255, 255, 255, 0.82)"),
          color: "text.primary",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid",
          borderColor: (theme) => (theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0, 0, 0, 0.06)"),
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: 56 }}>
          <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" }, p: 1 }}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Link
                to="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    fontSize: "1.1rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Gym Fitness
                </Typography>
              </Link>
            </Box>

            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 0.5 }}>
              {navItems.map((item) => (
                <Box
                  key={item.to}
                  component={Link}
                  to={item.to}
                  sx={{
                    px: 2,
                    py: 1.25,
                    borderRadius: 2,
                    textDecoration: "none",
                    color: isActive(item.to) ? "primary.main" : "text.secondary",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    transition: "color 0.2s",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  {item.label}
                </Box>
              ))}
              <Box
                component="button"
                onClick={toggleDarkMode}
                aria-label={darkMode ? "Light mode" : "Dark mode"}
                sx={{
                  ml: 1,
                  p: 1,
                  border: "none",
                  borderRadius: 2,
                  bgcolor: "transparent",
                  color: "text.secondary",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": { color: "primary.main", bgcolor: "action.hover" },
                }}
              >
                {darkMode ? <LightModeIcon sx={{ fontSize: 22 }} /> : <DarkModeIcon sx={{ fontSize: 22 }} />}
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            border: "none",
            boxShadow: "4px 0 24px rgba(0,0,0,0.08)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
