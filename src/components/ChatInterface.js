import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import OfficerAvatar from './OfficerAvatar';

const { width } = Dimensions.get('window');

export default function ChatInterface({ 
  messages, 
  scrollViewRef, 
  isOfficerSpeaking 
}) {
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (message) => {
    const isOfficer = message.isOfficer;
    
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isOfficer ? styles.officerMessage : styles.userMessage,
        ]}
      >
        {isOfficer && (
          <View style={styles.officerInfo}>
            <OfficerAvatar 
              size={30} 
              isAnimated={isOfficerSpeaking && message.id === messages[messages.length - 1]?.id}
            />
          </View>
        )}
        
        <View
          style={[
            styles.messageBubble,
            isOfficer ? styles.officerBubble : styles.userBubble,
          ]}
        >
          {isOfficer && (
            <View style={styles.officerHeader}>
              <Text style={styles.officerName}>Officer Smith</Text>
              <View style={styles.badgeIcon}>
                <Ionicons name="shield-checkmark" size={12} color={colors.white} />
              </View>
            </View>
          )}
          
          <Text
            style={[
              styles.messageText,
              isOfficer ? styles.officerText : styles.userText,
            ]}
          >
            {message.text}
          </Text>
          
          <Text
            style={[
              styles.timestamp,
              isOfficer ? styles.officerTimestamp : styles.userTimestamp,
            ]}
          >
            {formatTime(message.timestamp)}
          </Text>
        </View>
        
        {!isOfficer && (
          <View style={styles.userAvatar}>
            <Ionicons name="person-circle" size={30} color={colors.secondary} />
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {messages.map(renderMessage)}
      
      {/* Typing indicator when officer is speaking */}
      {isOfficerSpeaking && (
        <View style={[styles.messageContainer, styles.officerMessage]}>
          <View style={styles.officerInfo}>
            <OfficerAvatar size={30} isAnimated={true} />
          </View>
          <View style={[styles.messageBubble, styles.officerBubble, styles.typingBubble]}>
            <View style={styles.typingIndicator}>
              <View style={[styles.typingDot, styles.dot1]} />
              <View style={[styles.typingDot, styles.dot2]} />
              <View style={[styles.typingDot, styles.dot3]} />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  officerMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  officerInfo: {
    marginRight: 8,
    marginBottom: 5,
  },
  userAvatar: {
    marginLeft: 8,
    marginBottom: 5,
  },
  messageBubble: {
    maxWidth: width * 0.7,
    padding: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  officerBubble: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: colors.accent,
    borderBottomRightRadius: 4,
  },
  officerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  officerName: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  badgeIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  officerText: {
    color: colors.white,
  },
  userText: {
    color: colors.white,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },
  officerTimestamp: {
    color: colors.white,
  },
  userTimestamp: {
    color: colors.white,
  },
  typingBubble: {
    paddingVertical: 15,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginHorizontal: 2,
    opacity: 0.4,
  },
  dot1: {
    animationDelay: '0ms',
  },
  dot2: {
    animationDelay: '150ms',
  },
  dot3: {
    animationDelay: '300ms',
  },
});