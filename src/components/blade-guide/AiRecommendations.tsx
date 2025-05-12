// src/components/blade-guide/AiRecommendations.tsx
"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { recommendTraining, RecommendTrainingInput, RecommendTrainingOutput } from '@/ai/flows/recommend-training';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle, Wand2, Info, CheckCircle } from 'lucide-react';
import { RecommendationCard } from './RecommendationCard';
import { MOCK_UNITS, generateSlug } from '@/lib/game-data';
import type { DisplayRecommendationUnit } from '@/types';
import { Progress } from "@/components/ui/progress";

interface AiRecommendationsProps {
  playerLevel: number;
}

export function AiRecommendations({ playerLevel }: AiRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendTrainingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false); // State to track client mount

  const [displayUnits, setDisplayUnits] = useState<DisplayRecommendationUnit[]>([]);

  // Inject animation styles and set mounted state only on the client-side
  useEffect(() => {
    const styleId = 'fade-in-animation-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `;
      document.head.appendChild(style);
    }
    setIsMounted(true); // Set mounted state to true after initial client render
  }, []); // Empty dependency array ensures this runs only once on mount

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    setDisplayUnits([]);

    try {
      const input: RecommendTrainingInput = { playerLevel };
      const result = await recommendTraining(input);
      
      startTransition(() => {
        setRecommendations(result);
        if (result && result.recommendedUnits) {
          const mappedUnits = result.recommendedUnits.map(unitName => {
            const foundUnit = MOCK_UNITS.find(mock => mock.name.toLowerCase() === unitName.toLowerCase());
            if (foundUnit) {
              return { ...foundUnit, reason: "AI Recommended" };
            }
            // Fallback for units not in MOCK_UNITS
            return {
              id: generateSlug(unitName),
              slug: generateSlug(unitName),
              name: unitName,
              era: "Unknown",
              type: "Unknown",
              description: "AI Recommended unit. Details may not be available in the local database.",
              strengths: [],
              weaknesses: [],
              unlockLevel: playerLevel, // Assume unlockable if recommended
              reason: "AI Recommended"
            };
          });
          setDisplayUnits(mappedUnits);
        }
      });
    } catch (e) {
      console.error("Failed to fetch recommendations:", e);
      setError("Failed to load recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch recommendations when playerLevel changes (but only after mounting)
  useEffect(() => {
    if (isMounted) {
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerLevel, isMounted]);

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          <Wand2 className="mr-2 h-7 w-7 text-accent" />
          AI Training Recommendations
        </CardTitle>
        {/* Conditionally render the description content based on mount state */}
        <CardDescription>
          {isMounted
            ? `Personalized unit and tactic suggestions based on your level: ${playerLevel}.`
            : 'Loading level specific recommendations...'}
          <br /> {/* Maintain structure */}
          Click "Get Fresh Advice" to re-generate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button onClick={fetchRecommendations} disabled={!isMounted || isLoading || isPending} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          {(isLoading || isPending) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          Get Fresh Advice
        </Button>

        {(isLoading || isPending) && (
          <div className="flex flex-col items-center justify-center space-y-2 pt-4">
            <Loader2 className="h-12 w-12 animate-spin text-accent" />
            <p className="text-muted-foreground">Generating your personalized advice...</p>
            <Progress value={undefined} className="w-full h-2 mt-2 animate-pulse" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Only show recommendations if mounted and not loading */}
        {isMounted && recommendations && !isLoading && !isPending && (
          <div className="space-y-6 mt-4 animate-fadeIn">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <CheckCircle className="mr-2 h-6 w-6 text-green-500" /> Recommended Units
              </h3>
              {displayUnits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayUnits.map((unit) => (
                    <RecommendationCard key={unit.id} unit={unit} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No specific units recommended at this level, or unable to map recommendations.</p>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Info className="mr-2 h-6 w-6 text-blue-500" /> Battle Tactics
              </h3>
              <Card className="bg-secondary/50 p-4">
                <CardContent className="p-0">
                  <p className="text-foreground leading-relaxed">{recommendations.battleTactics}</p>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Confidence Score</h3>
              <div className="flex items-center space-x-2">
                <Progress value={recommendations.confidenceScore * 100} className="w-full h-3 [&>div]:bg-accent" />
                <span className="font-mono text-sm text-accent">{ (recommendations.confidenceScore * 100).toFixed(0) }%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This score indicates the AI's confidence in these recommendations for your current level.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Recommendations are AI-generated and should be used as a guide. Game balance updates may affect unit effectiveness.
        </p>
      </CardFooter>
    </Card>
  );
}
