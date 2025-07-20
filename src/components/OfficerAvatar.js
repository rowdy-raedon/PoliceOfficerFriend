import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';

export default function OfficerAvatar({ 
  size = 60, 
  isAnimated = false, 
  style = {} 
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAnimated) {
      // Breathing animation when speaking
      const breathingAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );

      breathingAnimation.start();

      return () => {
        breathingAnimation.stop();
        scaleAnim.setValue(1);
      };
    } else {
      scaleAnim.setValue(1);
    }
  }, [isAnimated]);

  const avatarSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.avatar,
          avatarSize,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Ionicons 
          name="person" 
          size={size * 0.6} 
          color={colors.primary} 
        />
        
        {/* Badge overlay */}
        <View style={[styles.badge, { width: size * 0.3, height: size * 0.3 }]}>
          <Ionicons 
            name="shield-checkmark" 
            size={size * 0.2} 
            color={colors.white} 
          />
        </View>
      </Animated.View>
      
      {/* Speaking indicator */}
      {isAnimated && (
        <View style={styles.speakingIndicator}>
          <View style={[styles.soundWave, styles.wave1]} />
          <View style={[styles.soundWave, styles.wave2]} />
          <View style={[styles.soundWave, styles.wave3]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  speakingIndicator: {
    position: 'absolute',
    bottom: -10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  soundWave: {
    width: 3,
    backgroundColor: colors.accent,
    marginHorizontal: 1,
    borderRadius: 2,
  },
  wave1: {
    height: 8,
    animationDelay: '0ms',
  },
  wave2: {
    height: 12,
    animationDelay: '150ms',
  },
  wave3: {
    height: 6,
    animationDelay: '300ms',
  },
});