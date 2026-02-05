import React from "react";
import { Typography, Stack, Box, Chip } from "@mui/material";
import { useExerciseImage } from "../hooks/useExerciseImage";

const PLACEHOLDER_IMG = "https://placehold.co/560x560/6366f1/fff?text=Exercise&font=plus-jakarta-sans";

const Details = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment, id } = exerciseDetail;
  const isFallback = typeof id === "string" && id.startsWith("fallback-");
  const [apiImageUrl, apiImageLoading] = useExerciseImage(!isFallback && id ? id : null);
  const imgSrc = gifUrl || apiImageUrl || PLACEHOLDER_IMG;

  const tags = [
    { value: bodyPart, color: "primary" },
    { value: target, color: "secondary" },
    { value: equipment, color: "default" },
  ];

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      gap={0}
      alignItems="stretch"
      sx={{ p: 0 }}
    >
      <Box
        sx={{
          position: "relative",
          flexShrink: 0,
          minHeight: { xs: 280, sm: 360 },
          width: { lg: "48%" },
          bgcolor: "grey.100",
          overflow: "hidden",
          borderRight: { lg: "1px solid" },
          borderColor: { lg: "divider" },
        }}
      >
        <Box
          component="img"
          src={imgSrc}
          alt={name}
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
          sx={{
            width: "100%",
            height: "100%",
            minHeight: { xs: 280, sm: 360 },
            maxHeight: { lg: 420 },
            objectFit: "cover",
            opacity: apiImageLoading ? 0.7 : 1,
            transition: "opacity 0.3s ease",
            display: "block",
          }}
        />
        {apiImageLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.200",
            }}
          >
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Loading...
            </Typography>
          </Box>
        )}
      </Box>

      <Stack
        spacing={2}
        sx={{
          p: { xs: 2.5, sm: 3.5, lg: 4 },
          flex: 1,
          justifyContent: "center",
          width: { lg: "52%" },
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            letterSpacing: 1.5,
            fontSize: "0.7rem",
          }}
        >
          Exercise
        </Typography>
        <Typography
          variant="h4"
          fontWeight={700}
          textTransform="capitalize"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
          <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
            {name}
          </Box>{" "}
          targets your {target}. It helps build strength and improve form. Use it as part of your {bodyPart} and {equipment} training.
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ pt: 0.5 }}>
          {tags.map((item) => (
            <Chip
              key={item.value}
              label={item.value}
              size="small"
              color={item.color}
              variant="filled"
              sx={{
                textTransform: "capitalize",
                fontWeight: 600,
                fontSize: "0.8rem",
                height: 32,
                borderRadius: 2,
                opacity: 0.92,
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Details;
