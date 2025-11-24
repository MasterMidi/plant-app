import { StyleSheet, View, Pressable } from 'react-native';
import { useAtom } from 'jotai';
import { FlashList } from '@shopify/flash-list';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { plantsAtom, Plant } from '@/store/atoms';
import { useThemeColor } from '@/hooks/use-theme-color';

function formatLastWatered(date: string | null): string {
  if (!date) return 'Never watered';
  const lastWatered = new Date(date);
  const now = new Date();
  const diffTime = now.getTime() - lastWatered.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Watered today';
  if (diffDays === 1) return 'Watered yesterday';
  return `Watered ${diffDays} days ago`;
}

function PlantItem({
  plant,
  onWater,
}: {
  plant: Plant;
  onWater: (id: string) => void;
}) {
  const borderColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');

  return (
    <ThemedView style={[styles.plantItem, { borderColor }]}>
      <View style={styles.plantInfo}>
        <ThemedText type="subtitle">{plant.name}</ThemedText>
        <ThemedText>{formatLastWatered(plant.lastWatered)}</ThemedText>
      </View>
      <Pressable
        style={[styles.waterButton, { backgroundColor: tintColor }]}
        onPress={() => onWater(plant.id)}
      >
        <ThemedText style={styles.waterButtonText}>💧 Water</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

export default function PlantsScreen() {
  const [plants, setPlants] = useAtom(plantsAtom);

  const handleWaterPlant = (id: string) => {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === id ? { ...plant, lastWatered: new Date().toISOString() } : plant
      )
    );
  };

  if (plants.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText type="title">🌱</ThemedText>
        <ThemedText type="subtitle">No plants yet</ThemedText>
        <ThemedText>Add your first plant using the Add Plant tab</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlashList
        data={plants}
        renderItem={({ item }) => (
          <PlantItem plant={item} onWater={handleWaterPlant} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 20,
  },
  listContent: {
    padding: 16,
  },
  plantItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  plantInfo: {
    flex: 1,
    gap: 4,
  },
  waterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  waterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
