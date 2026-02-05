import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Slider,
  Chip,
  useTheme,
} from "@mui/material";
import { CalculateIcon, HeightIcon, MonitorWeightIcon } from "../components/Icons";

const BMICalculator = () => {
  const theme = useTheme();
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState(null);

  const getCategory = (value) => {
    if (value < 18.5) return { label: "Underweight", color: "info" };
    if (value < 25) return { label: "Normal", color: "success" };
    if (value < 30) return { label: "Overweight", color: "warning" };
    return { label: "Obese", color: "error" };
  };

  const handleCalculate = () => {
    const h = height / 100;
    const value = Number((weight / (h * h)).toFixed(1));
    setBmi(value);
    setCategory(getCategory(value));
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h4"
        fontWeight={800}
        textAlign="center"
        mb={1}
        sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" } }}
      >
        BMI Calculator
      </Typography>
      <Typography
        color="text.secondary"
        textAlign="center"
        mb={4}
        sx={{ maxWidth: 560, mx: "auto" }}
      >
        Calculate your Body Mass Index to see if you're in a healthy range.
      </Typography>

      <Card
        sx={{
          maxWidth: 480,
          mx: "auto",
          borderRadius: 3,
          boxShadow: theme.shadows[4],
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Stack direction="row" alignItems="center" gap={1} mb={1}>
                <HeightIcon color="primary" />
                <Typography fontWeight={600}>Height (cm)</Typography>
              </Stack>
              <Slider
                value={height}
                onChange={(_, v) => setHeight(v)}
                min={100}
                max={220}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v} cm`}
                sx={{ color: "primary.main" }}
              />
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {height} cm
              </Typography>
            </Box>

            <Box>
              <Stack direction="row" alignItems="center" gap={1} mb={1}>
                <MonitorWeightIcon color="primary" />
                <Typography fontWeight={600}>Weight (kg)</Typography>
              </Stack>
              <Slider
                value={weight}
                onChange={(_, v) => setWeight(v)}
                min={30}
                max={200}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v} kg`}
                sx={{ color: "primary.main" }}
              />
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {weight} kg
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<CalculateIcon />}
              onClick={handleCalculate}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Calculate BMI
            </Button>

            {bmi !== null && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                  textAlign: "center",
                }}
              >
                <Typography variant="overline" color="text.secondary">
                  Your BMI
                </Typography>
                <Typography variant="h3" fontWeight={800} color="primary.main">
                  {bmi}
                </Typography>
                <Chip
                  label={category?.label}
                  color={category?.color || "default"}
                  sx={{ mt: 1, fontWeight: 600 }}
                />
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ maxWidth: 560, mx: "auto", mt: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          BMI ranges
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center">
          <Chip size="small" label="Under 18.5: Underweight" color="info" variant="outlined" />
          <Chip size="small" label="18.5–25: Normal" color="success" variant="outlined" />
          <Chip size="small" label="25–30: Overweight" color="warning" variant="outlined" />
          <Chip size="small" label="Over 30: Obese" color="error" variant="outlined" />
        </Stack>
      </Box>
    </Box>
  );
};

export default BMICalculator;
