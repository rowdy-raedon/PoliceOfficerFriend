import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import VoiceRecorder from '../components/VoiceRecorder';
import ChatInterface from '../components/ChatInterface';
import OfficerAvatar from '../components/OfficerAvatar';
import { generateResponse } from '../utils/responses';

const { width, height } = Dimensions.get('window');

export default function ChatScreen({ onGoBack, audioPermission }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello there! I'm Officer Smith, badge number 1234. I'm so happy to meet you! What's your name?",
      isOfficer: true,
      timestamp: new Date(),
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isOfficerSpeaking, setIsOfficerSpeaking] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleUserMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isOfficer: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate and add officer response after a short delay
    setTimeout(() => {
      const response = generateResponse(text);
      const officerMessage = {
        id: Date.now() + 1,
        text: response,
        isOfficer: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, officerMessage]);
      setIsOfficerSpeaking(true);

      // Simulate speaking duration
      setTimeout(() => {
        setIsOfficerSpeaking(false);
      }, response.length * 50); // Rough estimate of speaking time
    }, 1000);
  };

  const handleRecordingStart = () => {
    setIsRecording(true);
  };

  const handleRecordingStop = () => {
    setIsRecording(false);
  };

  const handleRecordingComplete = (transcription) => {
    if (transcription) {
      handleUserMessage(transcription);
    }
  };

  const showSafetyTip = () => {
    const safetyTips = [
      "Remember to always look both ways before crossing the street!",
      "Never talk to strangers without a trusted adult nearby.",
      "Always wear your seatbelt when riding in a car.",
      "If you're ever lost, find a police officer or store employee to help you.",
    ];
    
    const tip = safetyTips[Math.floor(Math.random() * safetyTips.length)];
    handleUserMessage("Can you give me a safety tip?");
  };

  const startGame = () => {
    handleUserMessage("Let's play a game!");
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <OfficerAvatar 
            size={40} 
            isAnimated={isOfficerSpeaking}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerTitle}>Officer Smith</Text>
            <Text style={styles.headerSubtitle}>Badge #1234</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.badge}>
            <Ionicons name="shield-checkmark" size={20} color={colors.white} />
          </View>
        </View>
      </View>

      {/* Chat Area */}
      <View style={styles.chatContainer}>
        <ChatInterface
          messages={messages}
          scrollViewRef={scrollViewRef}
          isOfficerSpeaking={isOfficerSpeaking}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity onPress={showSafetyTip} style={styles.quickActionButton}>
          <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
          <Text style={styles.quickActionText}>Safety Tip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={startGame} style={styles.quickActionButton}>
          <Ionicons name="game-controller" size={20} color={colors.primary} />
          <Text style={styles.quickActionText}>Play Game</Text>
        </TouchableOpacity>
      </View>

      {/* Voice Recorder */}
      <View style={styles.recorderContainer}>
        <VoiceRecorder
          onRecordingStart={handleRecordingStart}
          onRecordingStop={handleRecordingStop}
          onRecordingComplete={handleRecordingComplete}
          isRecording={isRecording}
          audioPermission={audioPermission}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerAvatar: {
    marginRight: 10,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.8,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  badge: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: colors.background,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  recorderContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});