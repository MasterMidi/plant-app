import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Plant } from '../types/plant';
import { getDaysUntilWatering, isWateringOverdue } from '../utils/plantUtils';
import { Droplet, Trash2 } from 'lucide-react-native';

interface PlantCardProps {
  plant: Plant;
  onWater: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onWater, onDelete }) => {
  const daysUntil = getDaysUntilWatering(plant.nextWatering);
  const isOverdue = isWateringOverdue(plant.nextWatering);

  const getStatusColor = () => {
    if (isOverdue) return 'text-red-600';
    if (daysUntil <= 2) return 'text-orange-500';
    return 'text-green-600';
  };

  const getStatusText = () => {
    if (isOverdue) {
      return `Overdue by ${Math.abs(daysUntil)} day${Math.abs(daysUntil) !== 1 ? 's' : ''}`;
    }
    if (daysUntil === 0) return 'Water today';
    if (daysUntil === 1) return 'Water tomorrow';
    return `Water in ${daysUntil} days`;
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900">{plant.name}</Text>
          {plant.species && (
            <Text className="text-sm text-gray-500 mt-1">{plant.species}</Text>
          )}
        </View>
        <Pressable
          onPress={() => onDelete(plant.id)}
          className="p-2 active:bg-gray-100 rounded"
        >
          <Trash2 size={20} color="#EF4444" />
        </Pressable>
      </CardHeader>
      <CardContent>
        <View className="flex-row items-center mb-3">
          <Droplet size={16} color="#3B82F6" />
          <Text className="text-sm text-gray-600 ml-2">
            Every {plant.wateringFrequency} day{plant.wateringFrequency !== 1 ? 's' : ''}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className={`text-sm font-semibold ${getStatusColor()}`}>
            {getStatusText()}
          </Text>
          <Button
            title="Water Now"
            size="sm"
            onPress={() => onWater(plant.id)}
          />
        </View>
        {plant.notes && (
          <Text className="text-sm text-gray-500 mt-3 italic">{plant.notes}</Text>
        )}
      </CardContent>
    </Card>
  );
};
