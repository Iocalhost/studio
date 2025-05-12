// src/ai/flows/recommend-training.ts
'use server';

/**
 * @fileOverview An AI agent that recommends the best units to train and battle tactics for the player's current level.
 *
 * - recommendTraining - A function that handles the recommendation process.
 * - RecommendTrainingInput - The input type for the recommendTraining function.
 * - RecommendTrainingOutput - The return type for the recommendTraining function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendTrainingInputSchema = z.object({
  playerLevel: z
    .number()
    .describe('The current level of the player.')
    .int()
    .positive()
});
export type RecommendTrainingInput = z.infer<typeof RecommendTrainingInputSchema>;

const RecommendTrainingOutputSchema = z.object({
  recommendedUnits: z
    .array(z.string())
    .describe('A list of recommended units to train for the player level.'),
  battleTactics: z
    .string()
    .describe('Recommended battle tactics for the player level.'),
  confidenceScore: z
    .number()
    .describe('A confidence score indicating the reliability of the recommendations. This score should be re-ranked whenever the game releases an update which includes balance changes.')
    .min(0)
    .max(1),
});
export type RecommendTrainingOutput = z.infer<typeof RecommendTrainingOutputSchema>;

export async function recommendTraining(input: RecommendTrainingInput): Promise<RecommendTrainingOutput> {
  return recommendTrainingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendTrainingPrompt',
  input: {schema: RecommendTrainingInputSchema},
  output: {schema: RecommendTrainingOutputSchema},
  prompt: `You are an expert Conqueror's Blade guide, skilled in recommending units and battle tactics to players based on their level.

  Given the player's current level, provide a list of recommended units to train and effective battle tactics.
  Also, provide a confidence score for your recommendation between 0 and 1.

  Player Level: {{{playerLevel}}}

  Format your answer as a JSON object with "recommendedUnits" (array of unit names), "battleTactics" (string), and "confidenceScore" (number between 0 and 1).
  `,
});

const recommendTrainingFlow = ai.defineFlow(
  {
    name: 'recommendTrainingFlow',
    inputSchema: RecommendTrainingInputSchema,
    outputSchema: RecommendTrainingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
