import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Container, Stack, Paper } from "@mui/material";
import { TimerIcon } from "../components/Icons";

const PRESETS = [30, 60, 90, 120];

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const RestTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          if (typeof window !== "undefined" && window.AudioContext) {
            try {
              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              oscillator.frequency.value = 800;
              gainNode.gain.value = 0.3;
              oscillator.start();
              setTimeout(() => oscillator.stop(), 200);
            } catch (_) {}
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, secondsLeft]);

  const start = (sec) => {
    setSecondsLeft(sec);
    setIsRunning(true);
  };

  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(0);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, minHeight: "60vh" }}>
      <Container maxWidth="sm">
        <Typography
          variant="overline"
          sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 0.5 }}
        >
          Rest between sets
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3, fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
          Rest Timer
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: "2px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              fontSize: { xs: "4rem", sm: "5rem" },
              fontFamily: "monospace",
              color: secondsLeft > 0 ? "primary.main" : "text.secondary",
              mb: 3,
            }}
          >
            {formatTime(secondsLeft)}
          </Typography>
          <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" sx={{ mb: 3, gap: 1.5 }}>
            {PRESETS.map((sec) => (
              <Button
                key={sec}
                variant={secondsLeft === sec && isRunning ? "contained" : "outlined"}
                size="medium"
                onClick={() => start(sec)}
                disabled={isRunning && secondsLeft !== sec}
                sx={{ minWidth: 64 }}
              >
                {sec}s
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" sx={{ gap: 1.5 }}>
            {isRunning ? (
              <Button variant="outlined" color="primary" onClick={pause}>
                Pause
              </Button>
            ) : (
              secondsLeft > 0 && (
                <Button variant="outlined" color="primary" onClick={() => setIsRunning(true)}>
                  Resume
                </Button>
              )
            )}
            <Button variant="outlined" color="inherit" onClick={reset}>
              Reset
            </Button>
          </Stack>
        </Paper>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
          Pick a duration, then start. You’ll hear a beep when time’s up.
        </Typography>
      </Container>
    </Box>
  );
};

export default RestTimer;
