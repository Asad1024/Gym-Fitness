const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY || "";

export const EXERCISEDB_BASE = "https://exercisedb.p.rapidapi.com";

const exerciseHeaders = {
  "x-rapidapi-key": RAPIDAPI_KEY,
  "x-rapidapi-host": "exercisedb.p.rapidapi.com",
};

const imageBlobUrlCache = new Map();

// Cache ExerciseDB GET responses to reduce "Too many requests" on free tier (5 min TTL).
const CACHE_TTL_MS = 5 * 60 * 1000;
const apiCache = new Map();

const getCached = (url) => {
  const entry = apiCache.get(url);
  if (!entry) return null;
  if (Date.now() - entry.at > CACHE_TTL_MS) {
    apiCache.delete(url);
    return null;
  }
  return entry.data;
};

const setCached = (url, data) => {
  apiCache.set(url, { data, at: Date.now() });
};

/**
 * Fetch exercise GIF using headers (x-rapidapi-host, x-rapidapi-key). Returns blob URL.
 * resolution: 360 for larger/HD quality (API may support 180, 360, 480).
 */
export const fetchExerciseImage = async (exerciseId, resolution = "360") => {
  const cacheKey = `${exerciseId}-${resolution}`;
  const cached = imageBlobUrlCache.get(cacheKey);
  if (cached) return cached;
  const url = `${EXERCISEDB_BASE}/image?exerciseId=${encodeURIComponent(exerciseId)}&resolution=${resolution}`;
  const res = await fetch(url, { method: "GET", headers: exerciseHeaders });
  if (!res.ok) throw new Error(`Image ${res.status}`);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  imageBlobUrlCache.set(cacheKey, blobUrl);
  return blobUrl;
};

export const exerciseOptions = {
  method: "GET",
  headers: exerciseHeaders,
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": RAPIDAPI_KEY,
    "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
  },
};

const YOUTUBE_SEARCH_URL = "https://youtube-search-and-download.p.rapidapi.com/search";
const YOUTUBE_CHANNEL_SEARCH_URL = "https://youtube-search-and-download.p.rapidapi.com/channel/search";
const DEFAULT_YOUTUBE_CHANNEL_ID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID || "UChPvQ8hfrSW1EAbtBWjis0g";

const youtubePostHeaders = {
  "Content-Type": "application/json",
  "x-rapidapi-key": RAPIDAPI_KEY,
  "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
};

/** Normalize search/channel API response to { video: { videoId, title, thumbnails, channelName } }[] */
const normalizeVideoItems = (raw) => {
  const list = Array.isArray(raw?.contents) ? raw.contents : Array.isArray(raw?.videos) ? raw.videos : Array.isArray(raw) ? raw : [];
  return list.map((item) => {
    const v = item?.video ?? item;
    const videoId = v?.videoId ?? v?.id ?? null;
    const title = v?.title ?? "";
    const thumbnails = v?.thumbnails ?? (v?.thumbnail ? [{ url: v.thumbnail }] : []);
    const channelName = v?.channelName ?? v?.channelTitle ?? v?.channel?.title ?? "";
    return { video: { videoId, title, thumbnails, channelName } };
  }).filter((item) => item.video.videoId);
};

/** GET /search – search all YouTube by query. Returns normalized array. */
const fetchYouTubeSearch = async (query) => {
  const url = `${YOUTUBE_SEARCH_URL}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { method: "GET", headers: youtubeOptions.headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || `YouTube API ${res.status}`);
  return normalizeVideoItems(data);
};

/** POST channel/search – search within a channel. Returns normalized array. */
const fetchYouTubeChannelSearch = async (query, channelId = DEFAULT_YOUTUBE_CHANNEL_ID, next = "") => {
  const res = await fetch(YOUTUBE_CHANNEL_SEARCH_URL, {
    method: "POST",
    headers: youtubePostHeaders,
    body: JSON.stringify({ id: channelId, query, next }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || `YouTube API ${res.status}`);
  return normalizeVideoItems(data);
};

/**
 * Fetch related videos: try GET /search first, then POST channel/search if empty or fails.
 * Returns array of { video: { videoId, title, thumbnails, channelName } } for ExerciseVideos.
 */
export const fetchExerciseVideos = async (exerciseName) => {
  const query = `${(exerciseName || "").trim()} exercise`.trim() || "exercise";
  try {
    const list = await fetchYouTubeSearch(query);
    if (list.length > 0) return list;
  } catch (_) {}
  try {
    return await fetchYouTubeChannelSearch(query);
  } catch (_) {
    return [];
  }
};

export const fetchData = async (url, options) => {
  const { method = "GET", headers, body } = options || {};
  const isGet = (method || "GET").toUpperCase() === "GET";
  const isExerciseDb = url.startsWith(EXERCISEDB_BASE);

  if (isGet && isExerciseDb) {
    const cached = getCached(url);
    if (cached != null) return cached;
  }

  const res = await fetch(url, { method, headers, body });
  const data = await res.json().catch(() => ({}));

  if (res.status === 429) {
    if (isGet && isExerciseDb) {
      const stale = getCached(url);
      if (stale != null) return stale;
    }
    throw new Error(data?.message || "Too many requests. Try again in a few minutes.");
  }

  if (!res.ok) {
    throw new Error(data?.message || `API error ${res.status}`);
  }

  if (isGet && isExerciseDb) setCached(url, data);
  return data;
};
