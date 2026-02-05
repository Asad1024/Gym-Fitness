import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { fetchData, exerciseOptions, EXERCISEDB_BASE } from "../utils/fetchData";
import { FALLBACK_EXERCISES } from "../utils/fallbackData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const WOD_COUNT = 6;

const getSeedForDay = () => {
  const d = new Date();
  return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
};

const shuffleWithSeed = (arr, seed) => {
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const WorkoutOfTheDay = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchData(`${EXERCISEDB_BASE}/exercises?limit=80`, exerciseOptions);
        const list = Array.isArray(data) ? data : [];
        const shuffled = shuffleWithSeed(list.length >= WOD_COUNT ? list : FALLBACK_EXERCISES, getSeedForDay());
        if (!cancelled) setExercises(shuffled.slice(0, WOD_COUNT));
      } catch {
        if (!cancelled) {
          const shuffled = shuffleWithSeed(FALLBACK_EXERCISES, getSeedForDay());
          setExercises(shuffled.slice(0, WOD_COUNT));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 0.5 }}>
          Daily inspiration
        </Typography>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, fontSize: "1.1rem" }}>
          Workout of the day
        </Typography>
        <Box sx={{ display: "flex", gap: 2, overflow: "hidden" }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="rounded" width={220} height={200} sx={{ flexShrink: 0 }} />
          ))}
        </Box>
      </Box>
    );
  }

  if (!exercises.length) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 0.5 }}>
        Daily inspiration
      </Typography>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, fontSize: "1.1rem" }}>
        Workout of the day
      </Typography>
      <HorizontalScrollbar data={exercises} compact />
    </Box>
  );
};

export default WorkoutOfTheDay;
