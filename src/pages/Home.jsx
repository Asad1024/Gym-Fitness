import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Paper, Alert, AlertTitle, IconButton, Collapse } from "@mui/material";
import { CloseIcon } from "../components/Icons";
import HeroBanner from "../components/HeroBanner";
import RecentlyViewed from "../components/RecentlyViewed";
import WorkoutOfTheDay from "../components/WorkoutOfTheDay";
import SearchExercises from "../components/SearchExercises";
import Exercises from "../components/Exercises";
import { fetchData, exerciseOptions, EXERCISEDB_BASE } from "../utils/fetchData";

const Home = () => {
  const location = useLocation();
  const [bodyPart, setBodyPart] = useState("all");
  const [equipment, setEquipment] = useState("all");
  const [target, setTarget] = useState("all");
  const [exercises, setExercises] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [bannerOpen, setBannerOpen] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchData(`${EXERCISEDB_BASE}/exercises/bodyPartList`, exerciseOptions)
      .then(() => { if (!cancelled) setApiError(null); })
      .catch((err) => {
        if (!cancelled) setApiError(err?.message || String(err));
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <HeroBanner />
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          mt: { xs: -4, sm: -6 },
          position: "relative",
          zIndex: 3,
          px: { xs: 2, sm: 3 },
        }}
      >
        <RecentlyViewed key={location.key} />
        <WorkoutOfTheDay />
        <Collapse in={Boolean(apiError) && bannerOpen}>
          <Alert
            severity={apiError && String(apiError).toLowerCase().includes("too many requests") ? "warning" : "info"}
            action={
              <IconButton size="small" onClick={() => setBannerOpen(false)} aria-label="close">
                <CloseIcon />
              </IconButton>
            }
            sx={{
              mb: 2,
              borderRadius: 3,
              border: "2px solid",
              borderColor: apiError && String(apiError).toLowerCase().includes("too many requests") ? "warning.main" : "primary.light",
            }}
          >
            <AlertTitle>
              {apiError && String(apiError).toLowerCase().includes("too many requests")
                ? "Rate limit reached"
                : "Using demo exercises"}
            </AlertTitle>
            {apiError && String(apiError).toLowerCase().includes("too many requests")
              ? "The free ExerciseDB API has a limited number of requests per day. Requests are cached for 5 minutes to reduce usage. Try again later or subscribe to a higher tier on RapidAPI for more quota."
              : "You are not subscribed to the ExerciseDB API (or the API is unavailable). "}
            {(!apiError || !String(apiError).toLowerCase().includes("too many requests")) && (
              <>
                <strong>
                  <a href="https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                    Subscribe on RapidAPI
                  </a>
                </strong>{" "}
                and add <code>REACT_APP_RAPIDAPI_KEY</code> to your <code>.env</code>.
              </>
            )}
          </Alert>
        </Collapse>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            p: { xs: 3, md: 4.5 },
            bgcolor: "background.paper",
            border: "2px solid",
            borderColor: "divider",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <SearchExercises
            setExercises={setExercises}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            equipment={equipment}
            setEquipment={setEquipment}
            target={target}
            setTarget={setTarget}
          />
        </Paper>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Exercises
          setExercises={setExercises}
          bodyPart={bodyPart}
          equipment={equipment}
          target={target}
          exercises={exercises}
        />
      </Box>
    </Box>
  );
};

export default Home;
