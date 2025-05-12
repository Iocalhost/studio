export interface GameUnit {
  id: string;
  slug: string;
  name: string;
  era: string;
  type: string;
  description: string;
  imageUrl?: string; // Using picsum for placeholders
  strengths: string[];
  weaknesses: string[];
  unlockLevel: number;
}

export interface AITrainingRecommendation {
  recommendedUnits: { name: string; reason?: string }[];
  battleTactics: string;
  confidenceScore: number;
}

export interface DisplayRecommendationUnit extends GameUnit {
  reason?: string;
}
