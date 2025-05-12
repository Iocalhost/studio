// src/app/(main)/recommendations/page.tsx
"use client"; // This page uses client-side context

import { AiRecommendations } from '@/components/blade-guide/AiRecommendations';
import { usePlayerLevel } from '@/context/PlayerLevelContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function RecommendationsPage() {
  const { playerLevel } = usePlayerLevel();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Training Ground</h1>
        <p className="text-muted-foreground">
          Get AI-powered recommendations for units and tactics based on your current level.
        </p>
      </div>
      
      <Card className="bg-accent/10 border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center text-lg text-accent-foreground">
            <Info className="mr-2 h-5 w-5" /> How it Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-accent-foreground/80">
            Our AI analyzes game data to suggest optimal units to train and effective battle strategies
            tailored to your entered player level. Adjust your level in the top right corner to see updated advice.
            Recommendations may include units you haven't unlocked yet, serving as a roadmap for your progression.
          </CardDescription>
        </CardContent>
      </Card>

      <AiRecommendations playerLevel={playerLevel} />
    </div>
  );
}
