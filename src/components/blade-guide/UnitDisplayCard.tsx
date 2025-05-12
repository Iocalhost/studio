// src/components/blade-guide/UnitDisplayCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from 'lucide-react';
import type { GameUnit } from '@/types';
import { Badge } from "@/components/ui/badge";

interface UnitDisplayCardProps {
  unit: GameUnit;
}

export function UnitDisplayCard({ unit }: UnitDisplayCardProps) {
  const defaultImageUrl = `https://picsum.photos/seed/${unit.slug}/300/180`;
  return (
    <Card className="group flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={unit.imageUrl || defaultImageUrl}
          alt={unit.name}
          width={300}
          height={180}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="medieval unit"
        />
        <div className="absolute top-2 right-2">
           <Badge variant="default" className="bg-accent text-accent-foreground">{unit.era}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
          {unit.name}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground mb-2">{unit.type}</CardDescription>
        <p className="text-sm text-foreground/80 mb-3 line-clamp-3 flex-grow">{unit.description}</p>
        <div className="mt-auto">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={`/units/${unit.slug}`} className="flex items-center justify-center">
              Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
