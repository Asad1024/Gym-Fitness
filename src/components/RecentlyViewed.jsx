import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { getRecentlyViewed } from "../utils/recentlyViewed";
import { ArrowForwardIcon } from "./Icons";

const RecentlyViewed = () => {
  const [recent, setRecent] = useState(() => getRecentlyViewed());

  const refresh = () => setRecent(getRecentlyViewed());

  useEffect(() => {
    refresh();
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  if (!recent.length) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5, display: "block", mb: 0.5 }}>
        Pick up where you left off
      </Typography>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5, fontSize: "1.1rem" }}>
        Recently viewed
      </Typography>
      <Stack direction="row" flexWrap="wrap" sx={{ gap: 1.5 }}>
        {recent.map((item) => (
          <Box
            key={item.id}
            component={Link}
            to={`/exercise/${item.id}`}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              px: 2,
              py: 1.25,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              color: "text.primary",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              textTransform: "capitalize",
              transition: "border-color 0.2s, background-color 0.2s",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "action.hover",
              },
            }}
          >
            <span>{item.name}</span>
            <ArrowForwardIcon sx={{ fontSize: 18, opacity: 0.7 }} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default RecentlyViewed;
