import { atom } from 'jotai';

// Type definition for a plant
export type Plant = {
  id: string;
  name: string;
  lastWatered: string | null; // ISO date string or null if never watered
};

// Atom to hold the list of plants
export const plantsAtom = atom<Plant[]>([]);
