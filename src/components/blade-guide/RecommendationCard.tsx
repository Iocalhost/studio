// src/components/blade-guide/RecommendationCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import type { GameUnit } from '@/types';

interface RecommendationCardProps {
  unit: Pick<GameUnit, 'name' | 'slug' | 'description' | 'imageUrl' | 'type'> & { reason?: string };
}

export function RecommendationCard({ unit }: RecommendationCardProps) {
  const defaultImageUrl = `https://picsum.photos/seed/${unit.slug}/400/200`;
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Image
          src={unit.imageUrl || defaultImageUrl}
          alt={unit.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
          data-ai-hint="medieval battle"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold mb-1">{unit.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-1">{unit.type}</CardDescription>
        <p className="text-sm mb-2 line-clamp-2">{unit.description}</p>
        {unit.reason && <p className="text-xs text-accent-foreground bg-accent/20 p-2 rounded-md mb-3"><em>Reason: {unit.reason}</em></p>}
        <Button asChild variant="outline" size="sm" className="w-full group">
          <Link href={`/units/${unit.slug}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
