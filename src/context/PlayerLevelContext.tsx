// src/context/PlayerLevelContext.tsx
"use client";

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PlayerLevelContextType {
  playerLevel: number;
  setPlayerLevel: Dispatch<SetStateAction<number>>;
}

const PlayerLevelContext = createContext<PlayerLevelContextType | undefined>(undefined);

export const PlayerLevelProvider = ({ children }: { children: ReactNode }) => {
  const [playerLevel, setPlayerLevel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const storedLevel = localStorage.getItem('playerLevel');
      return storedLevel ? parseInt(storedLevel, 10) : 1;
    }
    return 1;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('playerLevel', playerLevel.toString());
    }
  }, [playerLevel]);

  return (
    <PlayerLevelContext.Provider value={{ playerLevel, setPlayerLevel }}>
      {children}
    </PlayerLevelContext.Provider>
  );
};

export const usePlayerLevel = (): PlayerLevelContextType => {
  const context = useContext(PlayerLevelContext);
  if (context === undefined) {
    throw new Error('usePlayerLevel must be used within a PlayerLevelProvider');
  }
  return context;
};
