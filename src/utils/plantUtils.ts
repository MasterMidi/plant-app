import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant } from '../types/plant';
import { scheduleWaterReminder } from './notifications';

const PLANTS_STORAGE_KEY = '@plants';

export const getPlants = async (): Promise<Plant[]> => {
  try {
    const plantsJson = await AsyncStorage.getItem(PLANTS_STORAGE_KEY);
    return plantsJson ? JSON.parse(plantsJson) : [];
  } catch (error) {
    console.error('Error loading plants:', error);
    return [];
  }
};

export const savePlants = async (plants: Plant[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(PLANTS_STORAGE_KEY, JSON.stringify(plants));
  } catch (error) {
    console.error('Error saving plants:', error);
  }
};

export const addPlant = async (plant: Omit<Plant, 'id' | 'createdAt'>): Promise<Plant> => {
  const plants = await getPlants();
  const newPlant: Plant = {
    ...plant,
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    createdAt: new Date().toISOString(),
  };
  await savePlants([...plants, newPlant]);
  
  // Schedule water reminder
  await scheduleWaterReminder(newPlant);
  
  return newPlant;
};

export const deletePlant = async (id: string): Promise<void> => {
  const plants = await getPlants();
  await savePlants(plants.filter(p => p.id !== id));
};

export const waterPlant = async (id: string): Promise<void> => {
  const plants = await getPlants();
  const plant = plants.find(p => p.id === id);
  if (plant) {
    const now = new Date();
    plant.lastWatered = now.toISOString();
    plant.nextWatering = calculateNextWatering(now, plant.wateringFrequency);
    await savePlants(plants);
    
    // Reschedule water reminder for the new date
    await scheduleWaterReminder(plant);
  }
};

export const calculateNextWatering = (lastWatered: Date, frequency: number): string => {
  const nextDate = new Date(lastWatered);
  nextDate.setDate(nextDate.getDate() + frequency);
  return nextDate.toISOString();
};

export const getDaysUntilWatering = (nextWatering: string): number => {
  const now = new Date();
  const next = new Date(nextWatering);
  const diffTime = next.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isWateringOverdue = (nextWatering: string): boolean => {
  return getDaysUntilWatering(nextWatering) < 0;
};
