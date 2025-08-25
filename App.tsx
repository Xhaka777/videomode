import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { CameraModeProvider, useCameraMode } from '@/context/CameraModeContext';
import { Video, Camera, Timer, Zap, User } from 'lucide-react-native';

// Import screens
import VideoScreen from './screens/VideoScreen';
import TimeLapseScreen from './screens/TimeLapseScreen';
import SloMoScreen from './screens/SloMoScreen';
import PhotoScreen from './screens/PhotoScreen';
import PortraitScreen from './screens/PortraitScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { mode } = useCameraMode();
  const isVideoMode = mode === 'VIDEO';
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: isVideoMode ? 'transparent' : 'rgba(0, 0, 0, 0.9)',
          borderTopWidth: 0,
          elevation: 0,
          height: 120,
          paddingBottom: 40,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
      }}
    >
      <Tab.Screen
        name="TimeLapse"
        component={TimeLapseScreen}
        options={{
          title: 'TIME-LAPSE',
          tabBarIcon: ({ size, color }) => (
            <Timer size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SloMo"
        component={SloMoScreen}
        options={{
          title: 'SLO-MO',
          tabBarIcon: ({ size, color }) => (
            <Zap size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          title: 'VIDEO',
          tabBarIcon: ({ size, color }) => (
            <Video size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Photo"
        component={PhotoScreen}
        options={{
          title: 'PHOTO',
          tabBarIcon: ({ size, color }) => (
            <Camera size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Portrait"
        component={PortraitScreen}
        options={{
          title: 'PORTRAIT',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  useFrameworkReady();

  return (
    <CameraModeProvider>
      <NavigationContainer>
        <TabNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </CameraModeProvider>
  );
}