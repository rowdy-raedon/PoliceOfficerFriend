import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../utils/theme';

export default function VoiceRecorder({
  onRecordingStart,
  onRecordingStop,
  onRecordingComplete,
  isRecording,
  audioPermission,
}) {
  const [recording, setRecording] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isRecording) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();

      return () => {
        pulseAnimation.stop();
        pulseAnim.setValue(1);
      };
    }
  }, [isRecording]);

  const startRecording = async () => {
    if (!audioPermission) {
      Alert.alert(
        'Microphone Permission',
        'Please allow microphone access to talk with Officer Smith.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(newRecording);
      onRecordingStart();
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsProcessing(true);
      await recording.stopAndUnloadAsync();
      onRecordingStop();

      // Simulate speech-to-text processing
      setTimeout(() => {
        // For demo purposes, we'll use some sample responses
        const sampleInputs = [
          "Hello Officer Smith!",
          "Can you tell me about safety?",
          "What's your favorite part of being a police officer?",
          "Can we play a game?",
          "Tell me a story!",
          "How can I stay safe?",
        ];
        
        const randomInput = sampleInputs[Math.floor(Math.random() * sampleInputs.length)];
        onRecordingComplete(randomInput);
        setIsProcessing(false);
      }, 1500);

      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording:', error);
      Alert.alert('Error', 'Failed to process recording. Please try again.');
      setIsProcessing(false);
    }
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const getButtonContent = () => {
    if (isProcessing) {
      return {
        icon: 'hourglass',
        text: 'Processing...',
        colors: ['#F59E0B', '#D97706'],
      };
    } else if (isRecording) {
      return {
        icon: 'stop',
        text: 'Tap to Stop',
        colors: ['#EF4444', '#DC2626'],
      };
    } else {
      return {
        icon: 'mic',
        text: 'Hold to Talk',
        colors: [colors.accent, '#059669'],
      };
    }
  };

  const buttonContent = getButtonContent();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.recordButton}
        onPress={handlePress}
        disabled={isProcessing || !audioPermission}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={audioPermission ? buttonContent.colors : ['#9CA3AF', '#6B7280']}
            style={styles.gradient}
          >
            <Ionicons 
              name={buttonContent.icon} 
              size={32} 
              color={colors.white} 
            />
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.instructionText}>
        {audioPermission ? buttonContent.text : 'Microphone access needed'}
      </Text>

      {isRecording && (
        <View style={styles.recordingIndicator}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>Recording...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  recordButton: {
    marginBottom: 10,
  },
  buttonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  recordingText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
});