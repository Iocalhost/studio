import { config } from 'dotenv';
config();

import '@/ai/flows/recommend-training.ts';
import '@/ai/flows/re-rank-recommendations.ts';