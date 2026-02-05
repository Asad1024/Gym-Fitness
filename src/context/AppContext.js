import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext(null);

const FAVORITES_KEY = 'gym_favorites';

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gym_dark_mode') ?? 'false');
    } catch {
      return false;
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gym_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);

  const addFavorite = useCallback((exercise) => {
    setFavorites((prev) => {
      if (prev.some((e) => e.id === exercise.id)) return prev;
      return [...prev, exercise];
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((e) => e.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (exercise) => {
      if (isFavorite(exercise.id)) removeFavorite(exercise.id);
      else addFavorite(exercise);
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
