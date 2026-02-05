import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { FavoriteIcon } from "../components/Icons";
import { useApp } from "../context/AppContext";
import ExerciseCard from "../components/ExerciseCard";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Favorites = () => {
  const { favorites } = useApp();

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
      <Stack direction="row" alignItems="center" gap={1} mb={3} justifyContent="center">
        <FavoriteIcon sx={{ fontSize: 36, color: "primary.main" }} />
        <Typography variant="h4" fontWeight={800} sx={{ fontSize: { xs: "1.75rem", md: "2rem" } }}>
          My Favorites
        </Typography>
      </Stack>

      {favorites.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 2,
            borderRadius: 3,
            bgcolor: "action.hover",
          }}
        >
          <FavoriteIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
          <Typography color="text.secondary" variant="h6" gutterBottom>
            No saved exercises yet
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 400, mx: "auto", mb: 2 }}>
            Browse exercises and click the heart icon to save them here for quick access.
          </Typography>
          <Button component={Link} to="/" variant="contained" size="large">
            Explore Exercises
          </Button>
        </Box>
      ) : (
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={3}
          sx={{ "& > a": { width: { xs: "100%", sm: 320 }, maxWidth: 380 } }}
        >
          {favorites.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} showFavorite />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Favorites;
