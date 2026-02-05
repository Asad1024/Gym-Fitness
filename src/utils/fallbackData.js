/**
 * Fallback exercise data when the API is unavailable (e.g. key expired, CORS, rate limit).
 * Uses placeholder images so the app always shows content.
 */
const PLACEHOLDER_IMG = (id) =>
  `https://placehold.co/400x400/6366f1/fff?text=Exercise&font=source-sans-pro`;

const bodyParts = [
  "back", "cardio", "chest", "lower arms", "lower legs", "neck",
  "shoulders", "upper arms", "upper legs", "waist"
];
const equipmentList = [
  "assisted", "band", "barbell", "body weight", "cable", "dumbbell",
  "ez barbell", "kettlebell", "machine", "wobble board"
];
const targets = [
  "biceps", "cardiovascular system", "delts", "forearms", "glutes",
  "hamstrings", "lats", "levator scapulae", "pectorals", "quads",
  "serratus anterior", "spine", "traps", "triceps", "upper back"
];

const names = [
  "2 leg donkey kick", "45° side bend", "air bike", "all fours squad stretch",
  "alternate heel touchers", "alternate lateral pulldown", "arm circles",
  "barbell curl", "barbell full squat", "barbell lying close grip tricep",
  "bent over row", "cable chest press", "cable crossover", "cable lateral raise",
  "cable pulldown", "calf stretch", "chest dip", "dumbbell bench press",
  "dumbbell fly", "dumbbell incline row", "dumbbell lunge", "dumbbell one arm row",
  "dumbbell shoulder press", "dumbbell shrug", "front plank", "incline push up",
  "jump rope", "kettlebell two arm clean", "lat pulldown", "leg extension",
  "leg press", "lying leg raise", "machine chest press", "medicine ball slam",
  "mountain climber", "pull up", "push up", "reverse grip machine lat pulldown",
  "romanian deadlift", "running", "seated calf raise", "side lateral raise",
  "sit up", "squat", "standing calf raise", "standing hip flexor stretch",
  "stretch band walk", "t bar row", "tricep pushdown", "wrist roller"
];

export const FALLBACK_BODY_PARTS = ["all", ...bodyParts];
export const FALLBACK_EQUIPMENT = ["all", ...equipmentList];
export const FALLBACK_TARGETS = ["all", ...targets];

const buildFallbackExercises = () => {
  const list = [];
  let id = 1;
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const bodyPart = bodyParts[i % bodyParts.length];
    const equipment = equipmentList[i % equipmentList.length];
    const target = targets[i % targets.length];
    list.push({
      id: `fallback-${id}`,
      name,
      bodyPart,
      equipment,
      target,
      gifUrl: PLACEHOLDER_IMG(id),
    });
    id += 1;
  }
  return list;
};

export const FALLBACK_EXERCISES = buildFallbackExercises();
