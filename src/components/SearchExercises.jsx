import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SearchIcon } from "./Icons";
import { fetchData, exerciseOptions, EXERCISEDB_BASE } from "../utils/fetchData";
import { FALLBACK_BODY_PARTS, FALLBACK_EQUIPMENT, FALLBACK_TARGETS, FALLBACK_EXERCISES } from "../utils/fallbackData";

const scrollToExercises = () => {
  const el = document.getElementById("exercises");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const SearchExercises = ({ setExercises, bodyPart, setBodyPart, equipment, setEquipment, target, setTarget }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [targetList, setTargetList] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const safeArray = (x) => (Array.isArray(x) ? x : []);
      try {
        const [bodyPartsData, equipmentData, targetData] = await Promise.allSettled([
          fetchData(`${EXERCISEDB_BASE}/exercises/bodyPartList`, exerciseOptions),
          fetchData(`${EXERCISEDB_BASE}/exercises/equipmentList`, exerciseOptions),
          fetchData(`${EXERCISEDB_BASE}/exercises/targetList`, exerciseOptions),
        ]);
        const bodyPartsRes = bodyPartsData.status === "fulfilled" ? safeArray(bodyPartsData.value) : [];
        const equipmentRes = equipmentData.status === "fulfilled" ? safeArray(equipmentData.value) : [];
        const targetRes = targetData.status === "fulfilled" ? safeArray(targetData.value) : [];
        const defaultBodyParts = [
          "back", "cardio", "chest", "lower arms", "lower legs", "neck",
          "shoulders", "upper arms", "upper legs", "waist",
        ];
        const defaultEquipment = [
          "assisted", "band", "barbell", "body weight", "cable", "dumbbell",
          "ez barbell", "kettlebell", "machine", "wobble board",
        ];
        setBodyParts(["all", ...(bodyPartsRes.length ? bodyPartsRes : defaultBodyParts)]);
        setEquipmentList(["all", ...(equipmentRes.length ? equipmentRes : defaultEquipment)]);
        setTargetList(targetRes.length ? ["all", ...targetRes] : FALLBACK_TARGETS);
      } catch (err) {
        console.error(err);
        setBodyParts(FALLBACK_BODY_PARTS);
        setEquipmentList(FALLBACK_EQUIPMENT);
        setTargetList(FALLBACK_TARGETS);
      }
    };
    fetchLists();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const exercisesData = await fetchData(`${EXERCISEDB_BASE}/exercises?limit=0`, exerciseOptions);
      const searchLower = search.toLowerCase();
      const searched = (exercisesData || []).filter(
        (item) =>
          item.name?.toLowerCase().includes(searchLower) ||
          item.target?.toLowerCase().includes(searchLower) ||
          item.equipment?.toLowerCase().includes(searchLower) ||
          item.bodyPart?.toLowerCase().includes(searchLower)
      );
      setSearch("");
      setExercises(searched);
      scrollToExercises();
    } catch (err) {
      console.error(err);
      const searchLower = search.toLowerCase();
      const searched = FALLBACK_EXERCISES.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchLower) ||
          item.target?.toLowerCase().includes(searchLower) ||
          item.equipment?.toLowerCase().includes(searchLower) ||
          item.bodyPart?.toLowerCase().includes(searchLower)
      );
      setSearch("");
      setExercises(searched);
      scrollToExercises();
    }
  };

  const handleBodyPartChange = (e) => {
    setBodyPart(e.target.value);
    scrollToExercises();
  };
  const handleEquipmentChange = (e) => {
    setEquipment(e.target.value);
    scrollToExercises();
  };
  const handleTargetChange = (e) => {
    setTarget(e.target.value);
    scrollToExercises();
  };

  const selectSx = {
    borderRadius: 2,
    fontSize: "0.9rem",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
  };

  return (
    <Stack alignItems="center" sx={{ px: 0 }} spacing={2.5}>
      <Box textAlign="center" sx={{ width: "100%" }}>
        <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.2rem", mb: 0.5, color: "text.primary" }}>
          Find exercises
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: "auto" }}>
          Search or pick a filter below.
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1.5}
        alignItems="stretch"
        sx={{ width: "100%", maxWidth: 560 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "background.paper",
              fontSize: "0.95rem",
              "& fieldset": { borderColor: "divider" },
              "&:hover fieldset": { borderColor: "primary.main", borderWidth: 1 },
              "&.Mui-focused fieldset": { borderWidth: 2 },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 0.5 }}>
                <SearchIcon sx={{ fontSize: 22 }} color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="button"
          variant="contained"
          onClick={handleSearch}
          size="medium"
          startIcon={<SearchIcon sx={{ fontSize: 20 }} />}
          sx={{
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            px: 3,
            minWidth: 120,
            height: 40,
            boxShadow: 2,
            "&:hover": { boxShadow: 3 },
          }}
        >
          Search
        </Button>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: "100%", maxWidth: 560 }}>
        <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 140 }, ...selectSx }}>
          <InputLabel>Body part</InputLabel>
          <Select
            value={bodyPart}
            label="Body part"
            onChange={handleBodyPartChange}
            sx={{ textTransform: "capitalize" }}
          >
            {(bodyParts || []).map((item) => (
              <MenuItem key={item} value={item} sx={{ textTransform: "capitalize" }}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 140 }, ...selectSx }}>
          <InputLabel>Equipment</InputLabel>
          <Select
            value={equipment}
            label="Equipment"
            onChange={handleEquipmentChange}
            sx={{ textTransform: "capitalize" }}
          >
            {(equipmentList || []).map((item) => (
              <MenuItem key={item} value={item} sx={{ textTransform: "capitalize" }}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 160 }, ...selectSx }}>
          <InputLabel>Target muscle</InputLabel>
          <Select
            value={target}
            label="Target muscle"
            onChange={handleTargetChange}
            sx={{ textTransform: "capitalize" }}
          >
            {(targetList || []).map((item) => (
              <MenuItem key={item} value={item} sx={{ textTransform: "capitalize" }}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default SearchExercises;
