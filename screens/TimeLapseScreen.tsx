import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCameraMode } from '@/context/CameraModeContext';

export default function TimeLapseScreen() {
  const { setMode } = useCameraMode();

  React.useEffect(() => {
    setMode('AUDIO');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Time-Lapse Mode</Text>
      <Text style={styles.subText}>Audio recording with black tab bar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
  },
});