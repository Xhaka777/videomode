import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useCameraMode } from '@/context/CameraModeContext';
import { X, RotateCcw } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function VideoScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const { mode, setMode, isRecording, setIsRecording } = useCameraMode();
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setTimer(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function formatTimer(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  function handleRecord() {
    setIsRecording(!isRecording);
  }

  const isVideoMode = mode === 'VIDEO';

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <CameraView 
        ref={cameraRef}
        style={[
          styles.camera,
          !isVideoMode && styles.cameraWithBlackBars
        ]} 
        facing={facing}
      >
        {/* Top Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => {}}
          >
            <X size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.timerContainer}>
            <View style={styles.recordingDot} />
            <Text style={styles.timerText}>
              {formatTimer(timer)}
            </Text>
          </View>
          
          <View style={styles.topRightControls}>
            <Text style={styles.qualityText}>4K • 60</Text>
          </View>
        </View>

        {/* Mode Switch */}
        <View style={styles.modeSwitchContainer}>
          <TouchableOpacity
            style={[styles.modeButton, mode === 'AUDIO' && styles.activeModeButton]}
            onPress={() => setMode('AUDIO')}
          >
            <Text style={[styles.modeText, mode === 'AUDIO' && styles.activeModeText]}>
              AUDIO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, mode === 'VIDEO' && styles.activeModeButton]}
            onPress={() => setMode('VIDEO')}
          >
            <Text style={[styles.modeText, mode === 'VIDEO' && styles.activeModeText]}>
              VIDEO
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <View style={styles.leftControl}>
            <View style={styles.thumbnail} />
          </View>

          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={handleRecord}
          >
            <View style={[styles.recordInner, isRecording && styles.recordingInner]} />
          </TouchableOpacity>

          <View style={styles.rightControl}>
            <TouchableOpacity onPress={toggleCameraFacing} style={styles.flipButton}>
              <RotateCcw size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Camera Grid Overlay */}
        <View style={styles.gridOverlay}>
          <View style={styles.gridLine} />
          <View style={styles.gridLineVertical} />
          <View style={[styles.gridLine, { top: '66.66%' }]} />
          <View style={[styles.gridLineVertical, { left: '66.66%' }]} />
        </View>

        {/* Zoom Controls */}
        <View style={styles.zoomControls}>
          <View style={styles.zoomButton}>
            <Text style={styles.zoomText}>0,5</Text>
          </View>
          <View style={[styles.zoomButton, styles.activeZoom]}>
            <Text style={[styles.zoomText, styles.activeZoomText]}>1×</Text>
          </View>
        </View>
      </CameraView>

      {/* Black bars for audio mode */}
      {!isVideoMode && (
        <>
          <View style={styles.topBlackBar} />
          <View style={styles.bottomBlackBar} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: width,
    height: height,
  },
  cameraWithBlackBars: {
    height: height * 0.7,
    marginTop: height * 0.15,
  },
  topBlackBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.15,
    backgroundColor: 'black',
  },
  bottomBlackBar: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    height: height * 0.15,
    backgroundColor: 'black',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  message: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  topControls: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginRight: 8,
  },
  timerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  topRightControls: {
    alignItems: 'flex-end',
  },
  qualityText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modeSwitchContainer: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
  },
  modeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  activeModeButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  modeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
  },
  activeModeText: {
    color: '#FFD700',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 10,
  },
  leftControl: {
    width: 80,
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'white',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  recordingButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.3)',
  },
  recordInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF3B30',
  },
  recordingInner: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  rightControl: {
    width: 80,
    alignItems: 'flex-end',
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  gridLine: {
    position: 'absolute',
    top: '33.33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  gridLineVertical: {
    position: 'absolute',
    left: '33.33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  zoomControls: {
    position: 'absolute',
    bottom: 240,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
  },
  zoomButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    marginHorizontal: 4,
  },
  activeZoom: {
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  zoomText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  activeZoomText: {
    color: '#FFD700',
  },
});