// src/app/(main)/units/page.tsx
"use client"; // For potential client-side filtering in future

import React, { useState, useMemo } from 'react';
import { MOCK_UNITS } from '@/lib/game-data';
import { UnitDisplayCard } from '@/components/blade-guide/UnitDisplayCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlayerLevel } from '@/context/PlayerLevelContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function UnitsPage() {
  const { playerLevel } = usePlayerLevel();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEra, setSelectedEra] = useState<string | 'all'>('all');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);

  const eras = useMemo(() => ['all', ...new Set(MOCK_UNITS.map(unit => unit.era))], []);

  const filteredUnits = useMemo(() => {
    return MOCK_UNITS.filter(unit => {
      const matchesSearchTerm = unit.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEra = selectedEra === 'all' || unit.era === selectedEra;
      const matchesUnlockLevel = !showOnlyUnlocked || unit.unlockLevel <= playerLevel;
      return matchesSearchTerm && matchesEra && matchesUnlockLevel;
    });
  }, [searchTerm, selectedEra, playerLevel, showOnlyUnlocked]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Unit Roster</h1>
        <p className="text-muted-foreground">
          Explore all available units in Conqueror's Blade. Filter by name, era, or unlock status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-card rounded-lg shadow">
        <Input
          type="text"
          placeholder="Search units by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="lg:col-span-1"
        />
        <Select value={selectedEra} onValueChange={setSelectedEra}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by Era" />
          </SelectTrigger>
          <SelectContent>
            {eras.map(era => (
              <SelectItem key={era} value={era}>
                {era === 'all' ? 'All Eras' : era}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2 justify-center md:justify-start lg:col-span-1">
          <Switch
            id="unlock-filter"
            checked={showOnlyUnlocked}
            onCheckedChange={setShowOnlyUnlocked}
          />
          <Label htmlFor="unlock-filter" className="text-sm">Show only units unlocked at Level {playerLevel}</Label>
        </div>
      </div>

      {filteredUnits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUnits.map((unit) => (
            <UnitDisplayCard key={unit.id} unit={unit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No units match your criteria.</p>
        </div>
      )}
    </div>
  );
}
