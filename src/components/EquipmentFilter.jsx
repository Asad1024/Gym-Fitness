import React from "react";
import { Chip } from "@mui/material";

const EquipmentFilter = ({ item, setEquipment, equipment }) => {
  const isSelected = equipment === item;

  const handleClick = () => {
    setEquipment(item);
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
        borderColor: isSelected ? "secondary.main" : "divider",
        bgcolor: isSelected ? "secondary.main" : "transparent",
        color: isSelected ? "secondary.contrastText" : "text.primary",
        "&:hover": {
          borderColor: "secondary.main",
          bgcolor: isSelected ? "secondary.dark" : "action.hover",
        },
      }}
    />
  );
};

export default EquipmentFilter;
