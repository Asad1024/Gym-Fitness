import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
} from "@mui/material";
import { getSavedPlan, saveGeneratedPlan, clearSavedPlan } from "../utils/dietStorage";

const GOALS = [
  { value: "lose", label: "Lose weight" },
  { value: "maintain", label: "Maintain weight" },
  { value: "gain", label: "Gain muscle" },
];

const ACTIVITY_LEVELS = [
  { value: 1.2, label: "Sedentary (little exercise)" },
  { value: 1.375, label: "Light (1–3 days/week)" },
  { value: 1.55, label: "Moderate (3–5 days/week)" },
  { value: 1.725, label: "Very active (6–7 days/week)" },
  { value: 1.9, label: "Extra active" },
];

const BREAKFAST_SUGGESTIONS = ["Oatmeal with fruit", "Eggs & whole grain toast", "Greek yogurt & nuts", "Smoothie with protein"];
const LUNCH_SUGGESTIONS = ["Grilled chicken salad", "Quinoa bowl with vegetables", "Turkey wrap with veggies", "Lentil soup with bread"];
const DINNER_SUGGESTIONS = ["Baked fish with rice", "Lean beef with sweet potato", "Tofu stir-fry", "Chicken & broccoli"];
const SNACK_SUGGESTIONS = ["Apple with peanut butter", "Handful of almonds", "Protein bar", "Cottage cheese"];

const VEG_BREAKFAST = ["Oatmeal with banana", "Chia pudding", "Avocado toast", "Smoothie bowl"];
const VEG_LUNCH = ["Chickpea salad", "Veggie wrap", "Dal with rice", "Hummus & vegetables"];
const VEG_DINNER = ["Lentil curry", "Bean chili", "Vegetable stir-fry", "Pasta with vegetables"];
const VEG_SNACK = ["Fruit & nuts", "Rice cakes", "Trail mix", "Yogurt"];

const pick = (arr, seed) => arr[seed % arr.length];

const generatePlan = (inputs) => {
  const { goal, weight, height, age, gender, activity, mealsPerDay, vegetarian } = inputs;
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const tdee = Math.round(bmr * activity);
  let dailyCal;
  if (goal === "lose") dailyCal = Math.max(1200, tdee - 500);
  else if (goal === "gain") dailyCal = tdee + 300;
  else dailyCal = tdee;

  const proteinG = Math.round((dailyCal * 0.3) / 4);
  const fatG = Math.round((dailyCal * 0.25) / 9);
  const carbG = Math.round((dailyCal * 0.45) / 4);

  const mealPercents = mealsPerDay === 3
    ? [{ type: "breakfast", pct: 0.3 }, { type: "lunch", pct: 0.35 }, { type: "dinner", pct: 0.35 }]
    : mealsPerDay === 4
    ? [{ type: "breakfast", pct: 0.25 }, { type: "lunch", pct: 0.35 }, { type: "dinner", pct: 0.3 }, { type: "snack", pct: 0.1 }]
    : [
        { type: "breakfast", pct: 0.25 },
        { type: "snack", pct: 0.1 },
        { type: "lunch", pct: 0.3 },
        { type: "snack", pct: 0.1 },
        { type: "dinner", pct: 0.25 },
      ];

  const getSuggestions = (type) => {
    if (vegetarian) {
      if (type === "breakfast") return VEG_BREAKFAST;
      if (type === "lunch") return VEG_LUNCH;
      if (type === "dinner") return VEG_DINNER;
      return VEG_SNACK;
    }
    if (type === "breakfast") return BREAKFAST_SUGGESTIONS;
    if (type === "lunch") return LUNCH_SUGGESTIONS;
    if (type === "dinner") return DINNER_SUGGESTIONS;
    return SNACK_SUGGESTIONS;
  };

  const meals = mealPercents.map((m, i) => {
    const cal = Math.round(dailyCal * m.pct);
    const options = getSuggestions(m.type);
    const suggestion = pick(options, age + i * 3);
    return { type: m.type, calories: cal, suggestion };
  });

  return {
    goal,
    dailyCalories: dailyCal,
    tdee,
    bmr: Math.round(bmr),
    macros: { protein: proteinG, carbs: carbG, fat: fatG },
    meals,
    mealsPerDay,
    vegetarian: !!vegetarian,
  };
};

const Diet = () => {
  const [savedPlan, setSavedPlan] = useState(null);
  const [goal, setGoal] = useState("maintain");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState(1.375);
  const [mealsPerDay, setMealsPerDay] = useState(4);
  const [vegetarian, setVegetarian] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  useEffect(() => {
    setSavedPlan(getSavedPlan());
  }, []);

  const handleGenerate = (e) => {
    e.preventDefault();
    const plan = generatePlan({
      goal,
      weight,
      height,
      age,
      gender,
      activity,
      mealsPerDay,
      vegetarian,
    });
    setGeneratedPlan(plan);
  };

  const handleSavePlan = () => {
    if (!generatedPlan) return;
    saveGeneratedPlan(generatedPlan);
    setSavedPlan(getSavedPlan());
  };

  const handleClearSaved = () => {
    clearSavedPlan();
    setSavedPlan(null);
  };

  const displayPlan = generatedPlan || savedPlan;

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" fontWeight={800} textAlign="center" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
        Diet Plan Generator
      </Typography>
      <Typography color="text.secondary" textAlign="center" sx={{ maxWidth: 560, mx: "auto", mt: 1, mb: 4 }}>
        Answer a few questions and we’ll generate a daily diet plan. You can save it to use later.
      </Typography>

      <Stack spacing={4} maxWidth={600} mx="auto">
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, borderColor: "divider" }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
            Your details
          </Typography>
          <Stack component="form" onSubmit={handleGenerate} spacing={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Goal</InputLabel>
              <Select value={goal} label="Goal" onChange={(e) => setGoal(e.target.value)}>
                {GOALS.map((g) => (
                  <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction="row" spacing={2}>
              <TextField type="number" label="Weight (kg)" size="small" value={weight} onChange={(e) => setWeight(Number(e.target.value))} inputProps={{ min: 30, max: 200 }} fullWidth />
              <TextField type="number" label="Height (cm)" size="small" value={height} onChange={(e) => setHeight(Number(e.target.value))} inputProps={{ min: 120, max: 220 }} fullWidth />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField type="number" label="Age" size="small" value={age} onChange={(e) => setAge(Number(e.target.value))} inputProps={{ min: 15, max: 80 }} sx={{ width: 120 }} />
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel>Gender</InputLabel>
                <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value)}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Box>
              <Typography variant="body2" fontWeight={600} gutterBottom>Activity level</Typography>
              <FormControl fullWidth size="small">
                <Select value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
                  {ACTIVITY_LEVELS.map((a) => (
                    <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={600} gutterBottom>Meals per day: {mealsPerDay}</Typography>
              <Slider value={mealsPerDay} onChange={(_, v) => setMealsPerDay(v)} min={3} max={5} step={1} valueLabelDisplay="auto" sx={{ color: "primary.main" }} />
            </Box>
            <FormControl fullWidth size="small">
              <InputLabel>Diet type</InputLabel>
              <Select value={vegetarian ? "veg" : "any"} label="Diet type" onChange={(e) => setVegetarian(e.target.value === "veg")}>
                <MenuItem value="any">No preference</MenuItem>
                <MenuItem value="veg">Vegetarian</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" size="large" fullWidth>
              Generate diet plan
            </Button>
          </Stack>
        </Paper>

        {savedPlan && !generatedPlan && (
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: "primary.light", bgcolor: "action.hover" }}>
            <Typography variant="subtitle2" fontWeight={700} color="primary.main" gutterBottom>
              Saved plan
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Daily: {savedPlan.dailyCalories} cal · Protein: {savedPlan.macros?.protein}g · Carbs: {savedPlan.macros?.carbs}g · Fat: {savedPlan.macros?.fat}g
            </Typography>
            <Button size="small" onClick={handleClearSaved} color="inherit">
              Clear saved plan
            </Button>
          </Paper>
        )}

        {displayPlan && (
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, borderColor: "divider" }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Your generated plan
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
                <Chip label={`${displayPlan.dailyCalories} cal/day`} color="primary" size="small" />
                <Chip label={`Protein ${displayPlan.macros?.protein}g`} variant="outlined" size="small" />
                <Chip label={`Carbs ${displayPlan.macros?.carbs}g`} variant="outlined" size="small" />
                <Chip label={`Fat ${displayPlan.macros?.fat}g`} variant="outlined" size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Based on TDEE ~{displayPlan.tdee} cal (goal: {displayPlan.goal}).
              </Typography>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 1 }}>
                Daily meal breakdown
              </Typography>
              <Stack spacing={1}>
                {displayPlan.meals?.map((m, i) => (
                  <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 0.75, borderBottom: "1px solid", borderColor: "divider" }}>
                    <Typography variant="body2" sx={{ textTransform: "capitalize", fontWeight: 600 }}>{m.type}</Typography>
                    <Typography variant="body2" color="text.secondary">{m.calories} cal</Typography>
                  </Box>
                ))}
              </Stack>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 1 }}>
                Meal suggestions
              </Typography>
              <Stack spacing={0.75}>
                {displayPlan.meals?.map((m, i) => (
                  <Typography key={i} variant="body2" sx={{ textTransform: "capitalize" }}>
                    <strong>{m.type}:</strong> {m.suggestion} ({m.calories} cal)
                  </Typography>
                ))}
              </Stack>
              {generatedPlan && (
                <Button variant="contained" onClick={handleSavePlan} sx={{ mt: 1 }} fullWidth>
                  Save plan to device
                </Button>
              )}
            </Stack>
          </Paper>
        )}

        <Typography variant="body2" color="text.secondary" textAlign="center">
          For a precise calorie estimate, use the{" "}
          <Link to="/calories" style={{ color: "inherit", fontWeight: 600 }}>Calorie Calculator</Link> first.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Diet;
