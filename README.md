# iOS-Style Camera App

A React Native camera application built with Expo that replicates the iOS camera interface, featuring dynamic tab bar styling and multiple camera modes.

## Features

### 🎥 Camera Modes
- **VIDEO Mode**: Full-screen camera view with transparent overlaid controls
- **AUDIO Mode**: Camera view with black bars and solid tab bar background
- Seamless mode switching with visual feedback

### 📱 Interface Elements
- **5 Navigation Tabs**: Time-Lapse, Slo-Mo, Video, Photo, Portrait
- **Dynamic Tab Bar**: Transparent in video mode, black background in audio mode
- **Recording Controls**: Start/stop recording with visual feedback
- **Camera Controls**: Flip camera, zoom controls (0.5x, 1x)
- **Professional UI**: Timer display, quality indicator (4K • 60), grid overlay

### 🎨 Design Features
- Full-screen camera experience matching iOS design language
- Smooth transitions between modes
- Professional recording interface with timer
- Responsive design with proper safe area handling
- Clean, minimal interface with intuitive controls

## Project Structure

```
├── app/
│   ├── _layout.tsx                 # Root layout with context providers
│   ├── +not-found.tsx             # 404 screen
│   └── (tabs)/
│       ├── _layout.tsx             # Tab navigation with dynamic styling
│       ├── index.tsx               # Main VIDEO screen with camera
│       ├── time-lapse.tsx          # Time-lapse mode (AUDIO)
│       ├── slo-mo.tsx              # Slow-motion mode (AUDIO)
│       ├── photo.tsx               # Photo mode (AUDIO)
│       └── portrait.tsx            # Portrait mode (AUDIO)
├── context/
│   └── CameraModeContext.tsx       # Global state for camera modes
├── hooks/
│   └── useFrameworkReady.ts        # Framework initialization hook
└── README.md                       # This file
```

## Technical Implementation

### Context Management
The app uses React Context to manage global state:
- **Camera Mode**: Switches between 'AUDIO' and 'VIDEO'
- **Recording State**: Tracks recording status and timer
- **Shared State**: Accessible across all tabs and components

### Dynamic Tab Bar
The tab bar styling changes based on the current mode:

```typescript
// In VIDEO mode
tabBarStyle: {
  backgroundColor: 'transparent',
  position: 'absolute',
  // Overlaid on camera
}

// In AUDIO mode  
tabBarStyle: {
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  // Standard tab bar positioning
}
```

### Camera Implementation
- Uses `expo-camera` for camera functionality
- Handles permissions and camera switching
- Full-screen camera view with overlay controls
- Recording timer with formatted display (MM:SS)

### Mode-Specific Layouts
- **VIDEO Mode**: Full-screen camera with transparent overlays
- **AUDIO Mode**: Camera with black bars (letterbox effect)
- Automatic mode switching when navigating between tabs

## Key Components

### CameraModeContext
Provides global state management for:
- Current camera mode (AUDIO/VIDEO)
- Recording status and timer
- Mode switching functionality

### Tab Layout
Dynamic tab bar that:
- Changes transparency based on mode
- Adjusts positioning for overlay effect
- Maintains consistent navigation

### Video Screen (Main Camera)
Full-featured camera interface with:
- Recording controls and timer
- Camera flip functionality
- Zoom controls and grid overlay
- Mode switching UI
- Professional camera controls

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Camera Permissions**
   The app will request camera permissions on first launch.

## Dependencies

### Core Dependencies
- `expo`: ^53.0.0 - Expo framework
- `expo-router`: ~5.0.2 - File-based routing
- `expo-camera`: ~16.1.5 - Camera functionality
- `react-native`: 0.79.1 - React Native framework

### UI & Icons
- `lucide-react-native`: ^0.475.0 - Icon library
- `@expo/vector-icons`: ^14.1.0 - Additional icons

### Navigation
- `@react-navigation/native`: ^7.0.14 - Navigation core
- `@react-navigation/bottom-tabs`: ^7.2.0 - Tab navigation

## Usage

### Navigation
- Tap any of the 5 bottom tabs to switch between camera modes
- **VIDEO tab**: Full-screen camera experience
- **Other tabs**: Audio mode with black bars

### Recording
- Tap the red record button to start/stop recording
- Timer displays recording duration in MM:SS format
- Visual feedback shows recording state

### Camera Controls
- **Flip Camera**: Tap the rotate icon to switch between front/back camera
- **Zoom**: Use 0.5x and 1x zoom buttons
- **Grid**: Toggle camera grid for composition assistance

### Mode Switching
- Use AUDIO/VIDEO buttons in the camera interface
- Automatic mode detection based on current tab
- Smooth transitions between modes

## Customization

### Styling
The app uses React Native StyleSheet for styling:
- Modular component-based styles
- Responsive design with Dimensions API
- Platform-specific adjustments

### Colors & Theme
- Primary: Gold (#FFD700) for active states
- Background: Black for camera interface
- Transparency: Various alpha values for overlays

### Layout
- Full-screen camera in video mode
- Letterbox effect in audio mode
- Absolute positioning for overlays

## Platform Support

- **iOS**: Full native camera support
- **Android**: Full native camera support  
- **Web**: Limited camera functionality (WebRTC)

## Performance Considerations

- Efficient camera resource management
- Proper cleanup of timers and intervals
- Optimized re-renders with React Context
- Memory management for camera streams

## Future Enhancements

- [ ] Actual video/audio recording functionality
- [ ] Photo capture implementation
- [ ] Gallery integration
- [ ] Advanced camera settings
- [ ] Filters and effects
- [ ] Cloud storage integration

## License

This project is for educational and demonstration purposes.