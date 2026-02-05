import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { ArrowBackIcon } from "../components/Icons";
import { exerciseOptions, fetchData, fetchExerciseVideos, EXERCISEDB_BASE } from "../utils/fetchData";
import { FALLBACK_EXERCISES } from "../utils/fallbackData";
import { addRecentlyViewed } from "../utils/recentlyViewed";
import Details from "../components/Details";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import Loader from "../components/Loader";

const isFallbackId = (exerciseId) =>
  typeof exerciseId === "string" && exerciseId.startsWith("fallback-");

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const exerciseFromState = location.state?.exercise;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchExercisesData = async () => {
      if (isFallbackId(id)) {
        const detail = FALLBACK_EXERCISES.find((ex) => ex.id === id);
        if (cancelled) return;
        if (detail) {
          setExerciseDetail(detail);
          setExerciseVideos([]);
          const byTarget = FALLBACK_EXERCISES.filter(
            (ex) => ex.target === detail.target && ex.id !== id
          );
          const byEquipment = FALLBACK_EXERCISES.filter(
            (ex) => ex.equipment === detail.equipment && ex.id !== id
          );
          setTargetMuscleExercises(byTarget.slice(0, 12));
          setEquipmentExercises(byEquipment.slice(0, 12));
        } else {
          setError("Exercise not found.");
        }
        setLoading(false);
        return;
      }

      if (exerciseFromState && exerciseFromState.id === id) {
        setExerciseDetail(exerciseFromState);
        setLoading(false);
        setExerciseVideos([]);
        setTargetMuscleExercises([]);
        setEquipmentExercises([]);
        try {
          const [videosRes, targetRes, equipmentRes] = await Promise.allSettled([
            fetchExerciseVideos(exerciseFromState?.name),
            exerciseFromState?.target
              ? fetchData(
                  `${EXERCISEDB_BASE}/exercises/target/${exerciseFromState.target}`,
                  exerciseOptions
                ).then((d) => d || [])
              : [],
            exerciseFromState?.equipment
              ? fetchData(
                  `${EXERCISEDB_BASE}/exercises/equipment/${exerciseFromState.equipment}`,
                  exerciseOptions
                ).then((d) => d || [])
              : [],
          ]);
          if (!cancelled) {
            setExerciseVideos(videosRes.status === "fulfilled" && Array.isArray(videosRes.value) ? videosRes.value : []);
            setTargetMuscleExercises(targetRes.status === "fulfilled" && Array.isArray(targetRes.value) ? targetRes.value : []);
            setEquipmentExercises(equipmentRes.status === "fulfilled" && Array.isArray(equipmentRes.value) ? equipmentRes.value : []);
          }
        } catch (_) {}
        return;
      }

      try {
        const detail = await fetchData(
          `${EXERCISEDB_BASE}/exercises/exercise/${id}`,
          exerciseOptions
        );
        if (cancelled) return;
        setExerciseDetail(detail);

        const [videosData, targetData, equipmentData] = await Promise.all([
          fetchExerciseVideos(detail?.name),
          detail?.target
            ? fetchData(
                `${EXERCISEDB_BASE}/exercises/target/${detail.target}`,
                exerciseOptions
              ).then((d) => d || [])
            : [],
          detail?.equipment
            ? fetchData(
                `${EXERCISEDB_BASE}/exercises/equipment/${detail.equipment}`,
                exerciseOptions
              ).then((d) => d || [])
            : [],
        ]);

        if (cancelled) return;
        setExerciseVideos(Array.isArray(videosData) ? videosData : []);
        setTargetMuscleExercises(targetData || []);
        setEquipmentExercises(equipmentData || []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load exercise");
          setExerciseDetail(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchExercisesData();
    return () => { cancelled = true; };
  }, [id, exerciseFromState]);

  useEffect(() => {
    if (exerciseDetail?.id && exerciseDetail?.name) {
      addRecentlyViewed({ id: exerciseDetail.id, name: exerciseDetail.name });
    }
  }, [exerciseDetail?.id, exerciseDetail?.name]);

  if (loading) return <Loader />;

  if (error || !exerciseDetail) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 12, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
            {error || "Exercise not found."}
          </Typography>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            variant="contained"
            sx={{ borderRadius: 2, fontWeight: 600, textTransform: "none" }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Button
          component={Link}
          to="/"
          variant="text"
          size="small"
          startIcon={<ArrowBackIcon sx={{ fontSize: 20 }} />}
          sx={{
            mb: 3,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "text.secondary",
            bgcolor: "transparent",
            px: 0,
            minHeight: 0,
            "&:hover": {
              color: "primary.main",
              bgcolor: "transparent",
            },
          }}
        >
          Back to exercises
        </Button>

        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Details exerciseDetail={exerciseDetail} />
        </Box>

        <Box sx={{ mt: 8 }}>
          <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
        </Box>

        <SimilarExercises
          targetMuscleExercises={targetMuscleExercises}
          equipmentExercises={equipmentExercises}
        />
      </Container>
    </Box>
  );
};

export default ExerciseDetail;
