import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlantListScreen } from './src/screens/PlantListScreen';
import { AddPlantScreen } from './src/screens/AddPlantScreen';
import './global.css';

export type RootStackParamList = {
  PlantList: undefined;
  AddPlant: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="PlantList">
          {({ navigation }) => (
            <PlantListScreen
              onAddPlant={() => navigation.navigate('AddPlant')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddPlant">
          {({ navigation }) => (
            <AddPlantScreen
              onPlantAdded={() => navigation.goBack()}
              onCancel={() => navigation.goBack()}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
