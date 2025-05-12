// src/components/blade-guide/LevelInput.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePlayerLevel } from '@/context/PlayerLevelContext';
import { UserCog } from 'lucide-react';

// Debounce function
const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};


export function LevelInput() {
  const { playerLevel, setPlayerLevel } = usePlayerLevel();
  const [inputValue, setInputValue] = useState<string>(playerLevel.toString());

  useEffect(() => {
    setInputValue(playerLevel.toString());
  }, [playerLevel]);

  const debouncedSetPlayerLevel = useCallback(
    debounce((level: number) => {
      setPlayerLevel(level);
    }, 500),
    [setPlayerLevel]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue > 0) {
      debouncedSetPlayerLevel(numericValue);
    } else if (value === '') {
       // Allow clearing the input, maybe set to default or handle as invalid
       debouncedSetPlayerLevel(1); // Or some default / last valid
    }
  };

  return (
    <div className="flex items-center gap-2">
      <UserCog className="h-5 w-5 text-muted-foreground" />
      <Label htmlFor="player-level" className="text-sm font-medium whitespace-nowrap">
        Player Level:
      </Label>
      <Input
        id="player-level"
        type="number"
        min="1"
        value={inputValue}
        onChange={handleChange}
        className="h-9 w-20 text-sm rounded-md shadow-sm"
        aria-label="Player Level Input"
      />
    </div>
  );
}
