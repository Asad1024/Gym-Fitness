import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CalculateIcon, MonitorWeightIcon, HeightIcon } from "../components/Icons";

const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentary (little or no exercise)" },
  { value: 1.375, label: "Light (1–3 days/week)" },
  { value: 1.55, label: "Moderate (3–5 days/week)" },
  { value: 1.725, label: "Very active (6–7 days/week)" },
  { value: 1.9, label: "Extra active (physical job + exercise)" },
];

const CalorieCalculator = () => {
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState(1.375);
  const [result, setResult] = useState(null);

  const calculate = () => {
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const tdee = Math.round(bmr * activity);
    setResult({ bmr: Math.round(bmr), tdee });
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" fontWeight={800} textAlign="center" mb={1} sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
        Calorie Calculator
      </Typography>
      <Typography color="text.secondary" textAlign="center" mb={4} sx={{ maxWidth: 560, mx: "auto" }}>
        Estimate your BMR (Basal Metabolic Rate) and TDEE (daily calories) based on your stats and activity.
      </Typography>

      <Card sx={{ maxWidth: 480, mx: "auto", borderRadius: 3, boxShadow: 4, overflow: "hidden" }}>
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography fontWeight={600} gutterBottom>Age</Typography>
              <Slider
                value={age}
                onChange={(_, v) => setAge(v)}
                min={15}
                max={80}
                valueLabelDisplay="auto"
                sx={{ color: "primary.main" }}
              />
              <Typography variant="body2" color="text.secondary" textAlign="center">{age} years</Typography>
            </Box>

            <Box>
              <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
                <HeightIcon color="primary" sx={{ fontSize: 20 }} />
                <Typography fontWeight={600}>Height (cm)</Typography>
              </Stack>
              <Slider
                value={height}
                onChange={(_, v) => setHeight(v)}
                min={120}
                max={220}
                valueLabelDisplay="auto"
                sx={{ color: "primary.main" }}
              />
              <Typography variant="body2" color="text.secondary" textAlign="center">{height} cm</Typography>
            </Box>

            <Box>
              <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
                <MonitorWeightIcon color="primary" sx={{ fontSize: 20 }} />
                <Typography fontWeight={600}>Weight (kg)</Typography>
              </Stack>
              <Slider
                value={weight}
                onChange={(_, v) => setWeight(v)}
                min={35}
                max={200}
                valueLabelDisplay="auto"
                sx={{ color: "primary.main" }}
              />
              <Typography variant="body2" color="text.secondary" textAlign="center">{weight} kg</Typography>
            </Box>

            <FormControl size="small" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value)}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Activity level</InputLabel>
              <Select value={activity} label="Activity level" onChange={(e) => setActivity(Number(e.target.value))}>
                {ACTIVITY_LEVELS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="large"
              startIcon={<CalculateIcon />}
              onClick={calculate}
              sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: "none" }}
            >
              Calculate
            </Button>

            {result && (
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: "action.hover", textAlign: "center" }}>
                <Typography variant="overline" color="text.secondary">BMR (at rest)</Typography>
                <Typography variant="h5" fontWeight={700} color="primary.main">{result.bmr} cal/day</Typography>
                <Typography variant="overline" color="text.secondary" sx={{ mt: 1, display: "block" }}>TDEE (daily)</Typography>
                <Typography variant="h5" fontWeight={700} color="secondary.main">{result.tdee} cal/day</Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CalorieCalculator;
