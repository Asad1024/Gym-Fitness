import React from "react";
import { Chip } from "@mui/material";

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const isSelected = bodyPart === item;

  const handleClick = () => {
    setBodyPart(item);
    const el = document.getElementById("exercises");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Chip
      label={item}
      onClick={handleClick}
      size="small"
      variant={isSelected ? "filled" : "outlined"}
      sx={{
        textTransform: "capitalize",
        fontWeight: 600,
        fontSize: "0.8rem",
        height: 32,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: isSelected ? "primary.main" : "divider",
        bgcolor: isSelected ? "primary.main" : "transparent",
        color: isSelected ? "primary.contrastText" : "text.primary",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: isSelected ? "primary.dark" : "action.hover",
        },
      }}
    />
  );
};

export default BodyPart;
