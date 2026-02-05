import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import Loader from "./Loader";
import { fetchData, exerciseOptions, EXERCISEDB_BASE } from "../utils/fetchData";
import { FALLBACK_EXERCISES } from "../utils/fallbackData";
import ExerciseCard from "./ExerciseCard";

const filterFallback = (bodyPart, equipment, target) => {
  return FALLBACK_EXERCISES.filter((ex) => {
    const matchBody = bodyPart === "all" || ex.bodyPart === bodyPart;
    const matchEquip = equipment === "all" || ex.equipment === equipment;
    const matchTarget = target === "all" || ex.target === target;
    return matchBody && matchEquip && matchTarget;
  });
};

const Exercises = ({ exercises, setExercises, bodyPart, equipment, target }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const exercisesPerPage = 9;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const fetchExercisesData = async () => {
      try {
        let data = [];
        if (bodyPart === "all" && equipment === "all" && target === "all") {
          data = await fetchData(`${EXERCISEDB_BASE}/exercises?limit=0`, exerciseOptions);
        } else {
          if (bodyPart !== "all") {
            data = await fetchData(`${EXERCISEDB_BASE}/exercises/bodyPart/${bodyPart}`, exerciseOptions);
          } else if (equipment !== "all") {
            data = await fetchData(`${EXERCISEDB_BASE}/exercises/equipment/${equipment}`, exerciseOptions);
          } else {
            data = await fetchData(`${EXERCISEDB_BASE}/exercises/target/${target}`, exerciseOptions);
          }
          data = Array.isArray(data) ? data : [];
          if (equipment !== "all") {
            data = data.filter((ex) => ex.equipment?.toLowerCase() === equipment?.toLowerCase());
          }
          if (target !== "all") {
            data = data.filter((ex) => ex.target?.toLowerCase() === target?.toLowerCase());
          }
        }
        const list = Array.isArray(data) ? data : [];
        if (!cancelled) {
          setExercises(list);
          setUsingFallback(false);
        }
      } catch (err) {
        if (!cancelled) {
          const fallback = filterFallback(bodyPart, equipment, target);
          setExercises(fallback);
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchExercisesData();
    return () => { cancelled = true; };
  }, [bodyPart, equipment, target, setExercises]);

  const exercisesList = Array.isArray(exercises) ? exercises : [];
  const indexOfLast = currentPage * exercisesPerPage;
  const indexOfFirst = indexOfLast - exercisesPerPage;
  const currentExercises = exercisesList.slice(indexOfFirst, indexOfLast);
  const pageCount = Math.ceil(exercisesList.length / exercisesPerPage) || 1;

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    const el = document.getElementById("exercises");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) return <Loader />;
  if (!currentExercises?.length)
    return (
      <Box id="exercises" sx={{ py: 12, textAlign: "center", px: 2 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, mb: 1.5 }}
        >
          No exercises match this filter
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: "auto" }}>
          Try another body part, equipment, or target muscle.
        </Typography>
      </Box>
    );

  return (
    <Box id="exercises" sx={{ py: { xs: 6, md: 8 }, px: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
        sx={{ mb: 4 }}
      >
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ fontSize: { xs: "1.35rem", md: "1.6rem" }, letterSpacing: "-0.02em" }}
        >
          {exercisesList.length} exercise{exercisesList.length !== 1 ? "s" : ""}
        </Typography>
        {usingFallback && (
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
            Demo data (API unavailable)
          </Typography>
        )}
      </Stack>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        sx={{ "& > a": { width: { xs: "100%", sm: 300 }, maxWidth: 360 } }}
      >
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} showFavorite />
        ))}
      </Stack>
      {pageCount > 1 && (
        <Stack alignItems="center" sx={{ mt: 6 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 600,
                borderRadius: 2,
              },
            }}
          />
        </Stack>
      )}
    </Box>
  );
};

export default Exercises;
