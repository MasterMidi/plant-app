export interface Plant {
  id: string;
  name: string;
  species?: string;
  wateringFrequency: number; // days
  lastWatered: string; // ISO date string
  nextWatering: string; // ISO date string
  notes?: string;
  createdAt: string;
}
