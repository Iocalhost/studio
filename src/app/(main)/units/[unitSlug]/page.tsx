// src/app/(main)/units/[unitSlug]/page.tsx
import { getUnitBySlug, MOCK_UNITS } from '@/lib/game-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, ShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface UnitPageParams {
  params: {
    unitSlug: string;
  };
}

// Statically generate routes for known units
export async function generateStaticParams() {
  return MOCK_UNITS.map(unit => ({
    unitSlug: unit.slug,
  }));
}

export default function UnitPage({ params }: UnitPageParams) {
  const unit = getUnitBySlug(params.unitSlug);

  if (!unit) {
    notFound();
  }
  
  const defaultImageUrl = `https://picsum.photos/seed/${unit.slug}/800/400`;

  return (
    <div className="space-y-6">
      <Button asChild variant="outline" size="sm" className="mb-4">
        <Link href="/units">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Units
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="relative p-0">
          <Image
            src={unit.imageUrl || defaultImageUrl}
            alt={unit.name}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover"
            priority // Prioritize loading image for LCP
            data-ai-hint="battle scene unit"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-4xl font-bold text-white shadow-text">{unit.name}</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="text-sm">{unit.type}</Badge>
              <Badge variant="secondary" className="text-sm">{unit.era} Era</Badge>
              <Badge variant="destructive" className="text-sm">Unlock Lvl: {unit.unlockLevel}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Unit Overview</h2>
            <CardDescription className="text-lg leading-relaxed text-foreground/80">
              {unit.description}
            </CardDescription>
          </div>

          <Separator />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" /> Strengths
              </h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                {unit.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <XCircle className="mr-2 h-5 w-5 text-red-500" /> Weaknesses
              </h3>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                {unit.weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <Separator />

          <div>
             <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ShieldQuestion className="mr-2 h-5 w-5 text-blue-500" /> Tactical Notes
              </h3>
              <Card className="bg-secondary/30 p-4">
                <CardContent className="p-0">
                  <p className="text-sm text-foreground/90">
                    When deploying {unit.name}, consider its role as {unit.type.toLowerCase()}. 
                    It excels in the {unit.era.toLowerCase()} era due to its specific advantages. 
                    Capitalize on its strengths against vulnerable enemy formations and be mindful of its weaknesses.
                    Effective use of this unit can turn the tide of battle, especially when unlocked at level {unit.unlockLevel}.
                  </p>
                </CardContent>
              </Card>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
