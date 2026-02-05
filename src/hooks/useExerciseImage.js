import { useState, useEffect } from "react";
import { fetchExerciseImage } from "../utils/fetchData";

/**
 * Fetches exercise GIF via API using headers (x-rapidapi-host, x-rapidapi-key).
 * Returns [blobUrl, loading]. Use placeholder when loading or when url is null.
 */
export const useExerciseImage = (exerciseId) => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(!!exerciseId);

  useEffect(() => {
    if (!exerciseId) {
      setLoading(false);
      setUrl(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setUrl(null);
    fetchExerciseImage(exerciseId)
      .then((blobUrl) => {
        if (!cancelled) setUrl(blobUrl);
      })
      .catch(() => {
        if (!cancelled) setUrl(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [exerciseId]);

  return [url, loading];
};
