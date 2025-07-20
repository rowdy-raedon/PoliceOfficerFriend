import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Audio } from 'expo-av';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import { theme } from './src/utils/theme';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [audioPermission, setAudioPermission] = useState(false);

  useEffect(() => {
    requestAudioPermission();
  }, []);

  const requestAudioPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setAudioPermission(status === 'granted');
      
      if (status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      }
    } catch (error) {
      console.log('Error requesting audio permission:', error);
    }
  };

  const navigateToChat = () => {
    setCurrentScreen('chat');
  };

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#1E3A8A" />
        {currentScreen === 'home' ? (
          <HomeScreen 
            onStartChat={navigateToChat}
            audioPermission={audioPermission}
          />
        ) : (
          <ChatScreen 
            onGoBack={navigateToHome}
            audioPermission={audioPermission}
          />
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
});