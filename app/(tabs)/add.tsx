import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, Keyboard } from 'react-native';
import { useSetAtom } from 'jotai';
import { ulid } from 'ulid';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { plantsAtom } from '@/store/atoms';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function AddPlantScreen() {
  const [plantName, setPlantName] = useState('');
  const setPlants = useSetAtom(plantsAtom);
  const router = useRouter();
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');

  const handleAddPlant = () => {
    if (!plantName.trim()) return;

    setPlants((prev) => [
      ...prev,
      {
        id: ulid(),
        name: plantName.trim(),
        lastWatered: null,
      },
    ]);

    setPlantName('');
    Keyboard.dismiss();
    router.navigate('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Plant Name</ThemedText>
      <TextInput
        style={[styles.input, { color: textColor, borderColor }]}
        value={plantName}
        onChangeText={setPlantName}
        placeholder="Enter plant name"
        placeholderTextColor={borderColor}
        autoFocus
      />
      <Pressable
        style={[
          styles.addButton,
          { backgroundColor: plantName.trim() ? tintColor : borderColor },
        ]}
        onPress={handleAddPlant}
        disabled={!plantName.trim()}
      >
        <ThemedText style={styles.addButtonText}>Add Plant</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  addButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
