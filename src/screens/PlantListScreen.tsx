import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlantCard } from '../components/PlantCard';
import { Button } from '../components/ui/button';
import { Plant } from '../types/plant';
import { getPlants, waterPlant, deletePlant } from '../utils/plantUtils';
import { Plus } from 'lucide-react-native';

interface PlantListScreenProps {
  onAddPlant: () => void;
}

export const PlantListScreen: React.FC<PlantListScreenProps> = ({ onAddPlant }) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPlants = useCallback(async () => {
    const loadedPlants = await getPlants();
    // Sort by next watering date (earliest first)
    loadedPlants.sort((a, b) => 
      new Date(a.nextWatering).getTime() - new Date(b.nextWatering).getTime()
    );
    setPlants(loadedPlants);
  }, []);

  useEffect(() => {
    loadPlants();
  }, [loadPlants]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPlants();
    setRefreshing(false);
  };

  const handleWater = async (id: string) => {
    await waterPlant(id);
    await loadPlants();
  };

  const handleDelete = async (id: string) => {
    await deletePlant(id);
    await loadPlants();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <View className="px-6 pt-6 pb-4 bg-white border-b border-gray-200">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-3xl font-bold text-gray-900">My Plants</Text>
            <Pressable
              className="h-12 w-12 bg-green-600 active:bg-green-700 rounded-lg items-center justify-center"
              onPress={onAddPlant}
            >
              <Plus size={24} color="white" />
            </Pressable>
          </View>
          <Text className="text-sm text-gray-500">
            {plants.length} plant{plants.length !== 1 ? 's' : ''} in your collection
          </Text>
        </View>

        {plants.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-xl font-semibold text-gray-400 mb-2">No plants yet</Text>
            <Text className="text-center text-gray-500 mb-6">
              Add your first plant to start tracking watering schedules
            </Text>
            <Button title="Add Your First Plant" onPress={onAddPlant} />
          </View>
        ) : (
          <FlatList
            data={plants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlantCard
                plant={item}
                onWater={handleWater}
                onDelete={handleDelete}
              />
            )}
            contentContainerClassName="p-6"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};
