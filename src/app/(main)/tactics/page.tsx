// src/app/(main)/tactics/page.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain } from 'lucide-react';

export default function TacticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Battle Tactics</h1>
        <p className="text-muted-foreground">
          Master the art of war with these strategies and tactical insights.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Brain className="mr-2 h-6 w-6 text-primary" />
            Tactics Section Under Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">
            This section will soon be filled with valuable battle tactics, formations, and strategic advice
            to help you conquer your foes in Conqueror's Blade. Stay tuned for updates!
          </CardDescription>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Siege Warfare", description: "Learn how to effectively attack and defend objectives during sieges.", hint: "castle siege" },
              { title: "Open Field Battles", description: "Strategies for cavalry charges, infantry formations, and ranged unit positioning.", hint: "medieval battlefield" },
              { title: "Unit Synergies", description: "Discover powerful unit combinations and how to counter them.", hint: "knight army" },
              { title: "Map-Specific Tactics", description: "Tips and tricks for various maps and game modes.", hint: "fantasy map" },
            ].map((item, index) => (
              <Card key={index} className="bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-md">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={`https://picsum.photos/seed/${item.hint.replace(" ","-")}/300/150`} alt={item.title} className="rounded-md mb-2 w-full h-32 object-cover" data-ai-hint={item.hint} />
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
