import type { GameUnit } from '@/types';

export const MOCK_UNITS: GameUnit[] = [
  {
    id: '1',
    slug: 'spear-militia',
    name: 'Spear Militia',
    era: 'Rustic',
    type: 'Melee Infantry',
    description: 'Basic spear infantry, effective against cavalry in early game.',
    imageUrl: 'https://picsum.photos/seed/spear-militia/300/200',
    strengths: ['Anti-cavalry', 'Cheap to deploy'],
    weaknesses: ['Low armor', 'Vulnerable to ranged'],
    unlockLevel: 1,
  },
  {
    id: '2',
    slug: 'ironcap-swordsmen',
    name: 'Ironcap Swordsmen',
    era: 'Feudal',
    type: 'Melee Infantry',
    description: 'Well-rounded swordsmen with decent armor and attack.',
    imageUrl: 'https://picsum.photos/seed/ironcap-swords/300/200',
    strengths: ['Good staying power', 'Versatile'],
    weaknesses: ['Slow', 'Can be overwhelmed by elite units'],
    unlockLevel: 10,
  },
  {
    id: '3',
    slug: 'demesne-archers',
    name: 'Demesne Archers',
    era: 'Feudal',
    type: 'Ranged Infantry',
    description: 'Standard archers providing ranged support.',
    imageUrl: 'https://picsum.photos/seed/demesne-archers/300/200',
    strengths: ['Good range', 'High rate of fire'],
    weaknesses: ['Vulnerable in melee', 'Low armor'],
    unlockLevel: 15,
  },
  {
    id: '4',
    slug: 'palace-guards',
    name: 'Palace Guards',
    era: 'Chivalric',
    type: 'Heavy Melee Infantry',
    description: 'Elite heavy infantry capable of holding crucial points.',
    imageUrl: 'https://picsum.photos/seed/palace-guards/300/200',
    strengths: ['High armor', 'Excellent defense', 'Good charge'],
    weaknesses: ['Slow movement', 'Expensive'],
    unlockLevel: 30,
  },
  {
    id: '5',
    slug: 'imperial-pike-guards',
    name: 'Imperial Pike Guards',
    era: 'Silver',
    type: 'Polearm Infantry',
    description: 'Top-tier pike unit, forms an unbreakable wall against cavalry.',
    imageUrl: 'https://picsum.photos/seed/imperial-pikes/300/200',
    strengths: ['Ultimate anti-cavalry', 'Advance ability', 'High damage'],
    weaknesses: ['Vulnerable to flanking', 'Slow when bracing'],
    unlockLevel: 50,
  },
  {
    id: '6',
    slug: 'liao-rangers',
    name: 'Liao\'s Rangers',
    era: 'Heroic',
    type: 'Melee Cavalry',
    description: 'Elite shock cavalry, devastating on the charge.',
    imageUrl: 'https://picsum.photos/seed/liao-rangers/300/200',
    strengths: ['Powerful charge', 'High mobility', 'Good armor'],
    weaknesses: ['Vulnerable to pikes', 'Expensive', 'Requires micro-management'],
    unlockLevel: 70,
  },
];

export function getUnitBySlug(slug: string): GameUnit | undefined {
  return MOCK_UNITS.find(unit => unit.slug === slug);
}

export function getUnitsByLevel(level: number): GameUnit[] {
  return MOCK_UNITS.filter(unit => unit.unlockLevel <= level);
}

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}
