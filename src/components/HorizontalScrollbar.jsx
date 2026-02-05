import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box, IconButton } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import ExerciseCard from "./ExerciseCard";
import BodyPart from "./BodyPart";
import EquipmentFilter from "./EquipmentFilter";
import TargetFilter from "./TargetFilter";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <IconButton
      onClick={() => scrollPrev()}
      sx={{
        position: "absolute",
        left: 8,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: 1,
        "&:hover": { bgcolor: "primary.main", color: "white", borderColor: "primary.main" },
        "&.MuiIconButton-root": { width: 40, height: 40 },
      }}
      aria-label="Scroll left"
    >
      <ChevronLeftIcon />
    </IconButton>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <IconButton
      onClick={() => scrollNext()}
      sx={{
        position: "absolute",
        right: 8,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: 1,
        "&:hover": { bgcolor: "primary.main", color: "white", borderColor: "primary.main" },
        "&.MuiIconButton-root": { width: 40, height: 40 },
      }}
      aria-label="Scroll right"
    >
      <ChevronRightIcon />
    </IconButton>
  );
};

const SmallLeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <IconButton
      onClick={() => scrollPrev()}
      size="small"
      sx={{
        position: "absolute",
        left: 4,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        "&:hover": { bgcolor: "primary.main", color: "white", borderColor: "primary.main" },
        "&.MuiIconButton-root": { width: 32, height: 32 },
      }}
      aria-label="Scroll left"
    >
      <ChevronLeftIcon sx={{ fontSize: 18 }} />
    </IconButton>
  );
};

const SmallRightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <IconButton
      onClick={() => scrollNext()}
      size="small"
      sx={{
        position: "absolute",
        right: 4,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        "&:hover": { bgcolor: "primary.main", color: "white", borderColor: "primary.main" },
        "&.MuiIconButton-root": { width: 32, height: 32 },
      }}
      aria-label="Scroll right"
    >
      <ChevronRightIcon sx={{ fontSize: 18 }} />
    </IconButton>
  );
};

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart, type, setTarget, target, compact = false, filter = false }) => {
  const isExerciseCard = !type && !bodyParts;
  const itemWidth = compact && isExerciseCard ? 280 : undefined;
  const isFilter = filter || bodyParts || type === "equipment" || type === "target";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        px: compact ? 0 : isFilter ? 3 : { xs: 4, sm: 6 },
      }}
    >
      <ScrollMenu
        LeftArrow={isFilter ? SmallLeftArrow : LeftArrow}
        RightArrow={isFilter ? SmallRightArrow : RightArrow}
      >
        {(data || []).map((item) => (
          <Box
            key={item?.id ?? item}
            itemID={String(item?.id ?? item)}
            title={String(item?.id ?? item)}
            sx={{
              mx: isFilter ? 0.5 : compact ? 1 : 0.75,
              flexShrink: 0,
              ...(itemWidth && { width: itemWidth }),
            }}
          >
            {type === "equipment" ? (
              <EquipmentFilter
                item={item}
                setEquipment={setBodyPart}
                equipment={bodyPart}
              />
            ) : type === "target" ? (
              <TargetFilter item={item} setTarget={setTarget} target={target} />
            ) : bodyParts ? (
              <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
            ) : (
              <ExerciseCard exercise={item} compact={compact} />
            )}
          </Box>
        ))}
      </ScrollMenu>
    </Box>
  );
};

export default HorizontalScrollbar;
