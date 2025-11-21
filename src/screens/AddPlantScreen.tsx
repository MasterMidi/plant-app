import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddPlantForm } from '../components/AddPlantForm';

interface AddPlantScreenProps {
  onPlantAdded: () => void;
  onCancel: () => void;
}

export const AddPlantScreen: React.FC<AddPlantScreenProps> = ({ onPlantAdded, onCancel }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AddPlantForm onPlantAdded={onPlantAdded} onCancel={onCancel} />
    </SafeAreaView>
  );
};
