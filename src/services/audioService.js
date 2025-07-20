import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

export class AudioService {
  constructor() {
    this.sound = null;
    this.isPlaying = false;
  }

  async initializeAudio() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  async playTextToSpeech(text, options = {}) {
    try {
      const speechOptions = {
        voice: 'en-US-male', // Use a male voice for Officer Smith
        rate: 0.9, // Slightly slower for clarity
        pitch: 1.0,
        ...options,
      };

      // Stop any currently playing speech
      await this.stopSpeech();

      // Use Expo Speech for text-to-speech
      Speech.speak(text, speechOptions);
      this.isPlaying = true;

      return {
        success: true,
        message: 'Speech started successfully'
      };
    } catch (error) {
      console.error('Text-to-speech error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async stopSpeech() {
    try {
      Speech.stop();
      this.isPlaying = false;
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  }

  async playAudioFromUrl(url) {
    try {
      // Unload any existing sound
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // Load and play new sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );

      this.sound = sound;
      this.isPlaying = true;

      // Set up playback status update
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          this.isPlaying = false;
        }
      });

      return {
        success: true,
        sound: sound
      };
    } catch (error) {
      console.error('Audio playback error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async stopAudio() {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        this.isPlaying = false;
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }

  async unloadAudio() {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
        this.isPlaying = false;
      }
    } catch (error) {
      console.error('Error unloading audio:', error);
    }
  }

  getPlaybackStatus() {
    return this.isPlaying;
  }
}

// Default instance
export const audioService = new AudioService();