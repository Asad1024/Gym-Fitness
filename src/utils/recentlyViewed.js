const STORAGE_KEY = "gym-recent";
const MAX_RECENT = 6;

export const getRecentlyViewed = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
};

export const addRecentlyViewed = ({ id, name }) => {
  if (!id || !name) return;
  try {
    let list = getRecentlyViewed();
    list = [{ id, name }, ...list.filter((item) => item.id !== id)].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
};
