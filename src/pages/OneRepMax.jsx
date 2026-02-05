import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button, Stack, TextField } from "@mui/material";
import { CalculateIcon } from "../components/Icons";

const OneRepMax = () => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = Number(weight);
    const r = Number(reps);
    if (!w || !r || r < 1 || r > 12) return;
    const oneRM = Math.round(w * (1 + r / 30));
    const percentages = [90, 85, 80, 75, 70].map((p) => ({
      pct: p,
      weight: Math.round((oneRM * p) / 100),
    }));
    setResult({ oneRM, percentages });
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" fontWeight={800} textAlign="center" mb={1} sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
        One Rep Max (1RM)
      </Typography>
      <Typography color="text.secondary" textAlign="center" mb={4} sx={{ maxWidth: 560, mx: "auto" }}>
        Estimate your one-rep max from a set of multiple reps. Use weight (kg) and reps performed.
      </Typography>

      <Card sx={{ maxWidth: 420, mx: "auto", borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Weight (kg)"
              type="number"
              size="small"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              inputProps={{ min: 1, max: 500 }}
            />
            <TextField
              label="Reps performed"
              type="number"
              size="small"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              inputProps={{ min: 1, max: 12 }}
              helperText="Best with 2–10 reps"
            />
            <Button
              variant="contained"
              size="large"
              startIcon={<CalculateIcon />}
              onClick={calculate}
              sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: "none" }}
            >
              Estimate 1RM
            </Button>

            {result && (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: "action.hover", textAlign: "center" }}>
                <Typography variant="overline" color="text.secondary">Estimated 1RM</Typography>
                <Typography variant="h4" fontWeight={800} color="primary.main">{result.oneRM} kg</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>Training weights</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center" sx={{ mt: 0.5 }}>
                  {result.percentages.map(({ pct, weight: w }) => (
                    <Typography key={pct} variant="body2">
                      {pct}%: <strong>{w} kg</strong>
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OneRepMax;
