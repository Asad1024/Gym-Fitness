import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { ArrowForwardIcon } from "./Icons";

const HERO_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c149e?w=1920&q=80",
];

const ROTATE_INTERVAL_MS = 5000;

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    HERO_BACKGROUNDS.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        minHeight: { xs: "85vh", md: "90vh" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#0f0f0f",
      }}
    >
      {HERO_BACKGROUNDS.map((url, i) => (
        <Box
          key={url}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: activeIndex === i ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: 0,
          }}
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          px: 2,
          py: 6,
          maxWidth: 720,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "rgba(255,255,255,0.9)",
            fontWeight: 700,
            letterSpacing: 3,
            fontSize: "0.85rem",
          }}
        >
          Fitness Club
        </Typography>
        <Typography
          variant="h1"
          fontWeight={800}
          sx={{
            color: "#fff",
            fontSize: { xs: "2.6rem", sm: "3.5rem", md: "4rem" },
            lineHeight: 1.1,
            mt: 1.5,
            mb: 2,
            letterSpacing: "-0.03em",
            textShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          Sweat, Smile <br /> and Repeat
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.92)",
            fontSize: "1.1rem",
            mb: 3.5,
            lineHeight: 1.65,
            maxWidth: 500,
            mx: "auto",
          }}
        >
          Find the best exercises by body part, equipment, or target muscle. Start your journey today.
        </Typography>
        <Button
          href="#exercises"
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderRadius: 3,
            py: 1.75,
            px: 4,
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1.05rem",
            boxShadow: "0 8px 28px rgba(99, 102, 241, 0.45)",
            "&:hover": {
              boxShadow: "0 12px 36px rgba(99, 102, 241, 0.5)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.25s ease",
          }}
        >
          Explore Exercises
        </Button>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1.25,
          zIndex: 2,
        }}
      >
        {HERO_BACKGROUNDS.map((_, i) => (
          <Box
            key={i}
            sx={{
              width: activeIndex === i ? 24 : 8,
              height: 8,
              borderRadius: 1,
              bgcolor: activeIndex === i ? "primary.main" : "rgba(255,255,255,0.4)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroBanner;
