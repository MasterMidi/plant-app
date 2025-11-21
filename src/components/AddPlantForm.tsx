import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Button } from './ui/button';
import { addPlant, calculateNextWatering } from '../utils/plantUtils';

interface AddPlantFormProps {
  onPlantAdded: () => void;
  onCancel: () => void;
}

export const AddPlantForm: React.FC<AddPlantFormProps> = ({ onPlantAdded, onCancel }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState('7');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter a plant name');
      return;
    }

    const frequency = parseInt(wateringFrequency, 10);
    if (isNaN(frequency) || frequency < 1) {
      alert('Please enter a valid watering frequency (1 or more days)');
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      await addPlant({
        name: name.trim(),
        species: species.trim() || undefined,
        wateringFrequency: frequency,
        lastWatered: now.toISOString(),
        nextWatering: calculateNextWatering(now, frequency),
        notes: notes.trim() || undefined,
      });
      onPlantAdded();
    } catch (error) {
      console.error('Error adding plant:', error);
      alert('Failed to add plant');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Add New Plant</Text>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Plant Name *</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          placeholder="e.g., Monstera"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Species (Optional)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          placeholder="e.g., Monstera deliciosa"
          value={species}
          onChangeText={setSpecies}
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Watering Frequency (days) *
        </Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          placeholder="e.g., 7"
          value={wateringFrequency}
          onChangeText={setWateringFrequency}
          keyboardType="numeric"
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          placeholder="Any special care instructions..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <Button
            title="Cancel"
            variant="outline"
            onPress={onCancel}
            disabled={isSubmitting}
          />
        </View>
        <View className="flex-1">
          <Button
            title={isSubmitting ? "Adding..." : "Add Plant"}
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      </View>
    </ScrollView>
  );
};
