import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Stack, Typography } from "@mui/material";

const links = [
  { to: "/", label: "Home" },
  { to: "/#exercises", label: "Exercises" },
  { to: "/timer", label: "Rest Timer" },
  { to: "/diet", label: "Diet" },
  { to: "/bmi", label: "BMI" },
  { to: "/calories", label: "Calories" },
  { to: "/1rm", label: "1RM" },
  { to: "/favorites", label: "Favorites" },
];

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: "auto",
      py: 4,
      borderTop: "1px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
    }}
  >
    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Gym Fitness
        </Typography>
        <Stack direction="row" spacing={2.5}>
          {links.map((item) => (
            <Typography
              key={item.to}
              component={Link}
              to={item.to}
              variant="body2"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": { color: "primary.main" },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Stack>
      </Stack>
      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ display: "block", textAlign: "center", mt: 1.5 }}
      >
        Find exercises · Plan workouts · Train smarter
      </Typography>
    </Container>
  </Box>
);

export default Footer;
