import React from "react";
import { Typography, Box } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  const hasTarget = targetMuscleExercises?.length > 0;
  const hasEquipment = equipmentExercises?.length > 0;

  if (!hasTarget && !hasEquipment) return null;

  return (
    <Box sx={{ mt: 6 }}>
      {hasTarget && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5 }}>
            Similar target muscle
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5, mb: 2, fontSize: "1.15rem" }}>
            More exercises for the same target
          </Typography>
          <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
            <HorizontalScrollbar data={targetMuscleExercises} compact />
          </Box>
        </Box>
      )}
      {hasEquipment && (
        <Box>
          <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 1.5 }}>
            Same equipment
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5, mb: 2, fontSize: "1.15rem" }}>
            More exercises with same equipment
          </Typography>
          <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
            <HorizontalScrollbar data={equipmentExercises} compact />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SimilarExercises;
