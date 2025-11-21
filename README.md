# 🌱 Plant App

A React Native application for managing your houseplant collection and tracking watering schedules.

## Features

- ✅ **Add Plants**: Create plant entries with name, species, watering frequency, and care notes
- 💧 **Water Tracking**: Track when you last watered each plant and when the next watering is due
- ⏰ **Water Reminders**: Get notifications when it's time to water your plants
- 📝 **Plant Details**: Store species information and care instructions for each plant
- 🗑️ **Manage Collection**: Delete plants from your collection
- 📱 **Cross-Platform**: Works on iOS, Android, and Web

## Screenshots

### Empty State
![Empty State](https://github.com/user-attachments/assets/66fb75d9-8651-4618-8df3-1f9dba99b0fb)

### Add Plant Form
![Add Plant Form](https://github.com/user-attachments/assets/7cb8b891-1491-4005-8334-5b9abf4acf37)

### Plant List
![Plant List](https://github.com/user-attachments/assets/802bcab2-bf99-4ab0-90ae-f0d06b874892)

## Tech Stack

- **Framework**: React Native with Expo
- **UI Library**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: Custom components inspired by react-native-reusables
- **Navigation**: React Navigation
- **Storage**: AsyncStorage for local data persistence
- **Notifications**: Expo Notifications for water reminders
- **Icons**: Lucide React Native

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (optional, comes with the project)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MasterMidi/plant-app.git
cd plant-app
```

2. Install dependencies:
```bash
npm install
```

### Running the App

#### Web
```bash
npm run web
```

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Development
```bash
npm start
```
Then scan the QR code with the Expo Go app on your mobile device.

## Project Structure

```
plant-app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (Button, Card)
│   │   ├── AddPlantForm.tsx
│   │   └── PlantCard.tsx
│   ├── screens/          # App screens
│   │   ├── PlantListScreen.tsx
│   │   └── AddPlantScreen.tsx
│   ├── types/            # TypeScript type definitions
│   │   └── plant.ts
│   ├── utils/            # Utility functions
│   │   ├── plantUtils.ts      # Plant management logic
│   │   └── notifications.ts   # Notification handling
│   └── lib/              # Library utilities
│       └── utils.ts      # Helper functions (cn)
├── App.tsx               # Main app component
├── global.css           # Global Tailwind styles
└── tailwind.config.js   # Tailwind configuration
```

## Usage

### Adding a Plant

1. Tap the **+** button in the top right corner
2. Enter the plant name (required)
3. Optionally add species and care notes
4. Set the watering frequency in days
5. Tap **Add Plant**

### Watering a Plant

1. Find your plant in the list
2. Tap the **Water Now** button
3. The next watering date will be automatically calculated

### Deleting a Plant

1. Tap the trash icon on any plant card
2. The plant will be removed from your collection

## Watering Schedule

Plants are sorted by their next watering date, with the most urgent at the top. The status indicator shows:

- 🟢 **Green**: More than 2 days until watering
- 🟠 **Orange**: 2 days or less until watering  
- 🔴 **Red**: Watering is overdue

## Notifications

The app will send push notifications at 9 AM on the day a plant needs watering. Make sure to grant notification permissions when prompted.

## Building for Production

### Android
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
