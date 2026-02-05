import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";
import BMICalculator from "./pages/BMICalculator";
import CalorieCalculator from "./pages/CalorieCalculator";
import OneRepMax from "./pages/OneRepMax";
import Favorites from "./pages/Favorites";
import RestTimer from "./pages/RestTimer";
import Diet from "./pages/Diet";

const AppContent = () => {
  const { darkMode } = useApp();
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          width: "100%",
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/calories" element={<CalorieCalculator />} />
          <Route path="/1rm" element={<OneRepMax />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/timer" element={<RestTimer />} />
          <Route path="/diet" element={<Diet />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
