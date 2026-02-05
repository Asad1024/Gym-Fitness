import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography, IconButton, Chip } from "@mui/material";
import { FavoriteIcon, FavoriteBorderIcon } from "./Icons";
import { useApp } from "../context/AppContext";
import { useExerciseImage } from "../hooks/useExerciseImage";

const PLACEHOLDER_IMG = "https://placehold.co/400x260/6366f1/fff?text=Exercise&font=plus-jakarta-sans";

const ExerciseCard = ({ exercise, showFavorite = false, compact = false }) => {
  const { isFavorite, toggleFavorite } = useApp();
  const isFav = showFavorite && isFavorite(exercise.id);
  const isFallback = typeof exercise.id === "string" && exercise.id.startsWith("fallback-");
  const [apiImageUrl, apiImageLoading] = useExerciseImage(!isFallback && exercise.id ? exercise.id : null);
  const imgSrc = exercise.gifUrl || apiImageUrl || PLACEHOLDER_IMG;

  return (
    <Box
      className={compact ? "exercise-card exercise-card--compact" : "exercise-card"}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {showFavorite && (
        <IconButton
          size="small"
          onClick={() => toggleFavorite(exercise)}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            bgcolor: "background.paper",
            boxShadow: 2,
            border: "2px solid",
            borderColor: "divider",
            "&:hover": { bgcolor: "background.paper", borderColor: "primary.main" },
            "& .MuiSvgIcon-root": { color: isFav ? "error.main" : "text.secondary" },
          }}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      )}

      <Link
        to={`/exercise/${exercise.id}`}
        state={{ exercise }}
        style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Box className="card-media-wrap" sx={{ position: "relative", overflow: "hidden" }}>
          <img
            src={imgSrc}
            alt={exercise.name}
            loading="lazy"
            onError={(e) => {
              e.target.src = PLACEHOLDER_IMG;
            }}
            style={{
              opacity: apiImageLoading ? 0.7 : 1,
              height: compact ? 180 : undefined,
            }}
          />
          {!compact && (
            <Box
              className="card-hover-overlay"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ color: "#fff", textTransform: "capitalize", fontSize: "0.95rem" }}
              >
                View details →
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ p: compact ? 1.5 : 2, flex: 1, display: "flex", flexDirection: "column" }}>
          <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mb: compact ? 0.75 : 1.25 }}>
            <Chip
              label={exercise.bodyPart}
              size="small"
              sx={{
                textTransform: "capitalize",
                fontWeight: 700,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                borderRadius: 1.5,
                fontSize: compact ? "0.7rem" : "0.72rem",
                height: compact ? 22 : undefined,
              }}
            />
            <Chip
              label={exercise.target}
              size="small"
              sx={{
                textTransform: "capitalize",
                fontWeight: 700,
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
                borderRadius: 1.5,
                fontSize: compact ? "0.7rem" : "0.72rem",
                height: compact ? 22 : undefined,
              }}
            />
          </Stack>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{
              fontSize: compact ? "0.95rem" : { xs: "1.05rem", md: "1.1rem" },
              lineHeight: 1.35,
              textTransform: "capitalize",
              letterSpacing: "-0.01em",
            }}
          >
            {exercise.name}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default ExerciseCard;
