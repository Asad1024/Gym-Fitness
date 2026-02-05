import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import { PlayCircleOutlineIcon } from "./Icons";

const RAPIDAPI_YOUTUBE_SEARCH =
  "https://rapidapi.com/hub?q=YouTube%20Search";

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos?.length) {
    return (
      <Box sx={{ mt: 6 }}>
        <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5 }}>
          Videos
        </Typography>
        <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5, mb: 1.5, fontSize: "1.15rem" }}>
          Watch {name} tutorials
        </Typography>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: "divider", bgcolor: "grey.50" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Related videos are fetched via a <strong>YouTube search</strong> API on RapidAPI. The app only shows links to videos on YouTube—nothing is downloaded.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            <strong>To enable videos:</strong> Open{" "}
            <Box component="a" href={RAPIDAPI_YOUTUBE_SEARCH} target="_blank" rel="noreferrer" sx={{ color: "primary.main", fontWeight: 600, textDecoration: "underline" }}>
              RapidAPI Hub
            </Box>
            , search for <strong>YouTube Search</strong>, subscribe to the API with host <code>youtube-search-and-download.p.rapidapi.com</code>, then add your key in <code>.env</code> and restart the app.
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div" sx={{ mb: 1.5 }}>
            In <code>.env</code> add: <code>REACT_APP_RAPIDAPI_KEY=your_key</code> then run <code>npm start</code>.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Meanwhile, search YouTube for “{name} exercise” for tutorials.
        </Typography>
        </Paper>
      </Box>
    );
  }

  const videos = exerciseVideos.slice(0, 8);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 1.5 }}>
        Videos
      </Typography>
      <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5, mb: 2, fontSize: "1.15rem" }}>
        Watch {name} tutorials
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {videos.map((item, index) => (
          <a
            key={item.video?.videoId ?? index}
            className="exercise-video-card"
            href={`https://www.youtube.com/watch?v=${item.video?.videoId}`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "inherit", position: "relative" }}
          >
            <Box sx={{ position: "relative" }}>
              <img
                src={item.video?.thumbnails?.[0]?.url}
                alt={item.video?.title}
                loading="lazy"
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
              />
              <Box className="play-overlay">
                <PlayCircleOutlineIcon sx={{ fontSize: 48, color: "#fff" }} />
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} sx={{ lineHeight: 1.4, fontSize: "0.9rem" }}>
                {item.video?.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                {item.video?.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Box>
    </Box>
  );
};

export default ExerciseVideos;
