const PLAN_KEY = "gym-diet-plan";

export const getSavedPlan = () => {
  try {
    const raw = localStorage.getItem(PLAN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveGeneratedPlan = (plan) => {
  try {
    localStorage.setItem(PLAN_KEY, JSON.stringify({
      ...plan,
      savedAt: new Date().toISOString(),
    }));
  } catch (_) {}
};

export const clearSavedPlan = () => {
  try {
    localStorage.removeItem(PLAN_KEY);
  } catch (_) {}
};
