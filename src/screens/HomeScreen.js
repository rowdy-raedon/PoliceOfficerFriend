import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ onStartChat, audioPermission }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg' }}
      style={styles.background}
      blurRadius={2}
    >
      <LinearGradient
        colors={['rgba(30, 58, 138, 0.8)', 'rgba(59, 130, 246, 0.6)']}
        style={styles.overlay}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Ionicons name="shield-checkmark" size={40} color={colors.white} />
              <Text style={styles.badgeNumber}>1234</Text>
            </View>
            <Text style={styles.title}>Police Officer Friend</Text>
            <Text style={styles.subtitle}>Meet Officer Smith!</Text>
          </View>

          {/* Officer Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={80} color={colors.primary} />
            </View>
            <Text style={styles.officerName}>Officer Smith</Text>
            <Text style={styles.officerTitle}>Community Safety Officer</Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Ionicons name="chatbubbles" size={24} color={colors.accent} />
              <Text style={styles.featureText}>Talk & Learn</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="school" size={24} color={colors.accent} />
              <Text style={styles.featureText}>Safety Tips</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="game-controller" size={24} color={colors.accent} />
              <Text style={styles.featureText}>Fun Games</Text>
            </View>
          </View>

          {/* Start Button */}
          <TouchableOpacity
            style={[
              styles.startButton,
              !audioPermission && styles.disabledButton
            ]}
            onPress={onStartChat}
            disabled={!audioPermission}
          >
            <LinearGradient
              colors={audioPermission ? [colors.accent, '#059669'] : ['#9CA3AF', '#6B7280']}
              style={styles.buttonGradient}
            >
              <Ionicons 
                name={audioPermission ? "mic" : "mic-off"} 
                size={24} 
                color={colors.white} 
              />
              <Text style={styles.buttonText}>
                {audioPermission ? "Start Talking!" : "Microphone Needed"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {!audioPermission && (
            <Text style={styles.permissionText}>
              Please allow microphone access to talk with Officer Smith
            </Text>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
  },
  badge: {
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeNumber: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  officerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  officerTitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 400,
  },
  feature: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    minWidth: 100,
  },
  featureText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  startButton: {
    width: '80%',
    maxWidth: 300,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  permissionText: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 10,
  },
});