import Voice from '@react-native-community/voice';
import { SpeechResult } from '../types';

export class SpeechService {
  private isListening = false;
  private onResultCallback?: (result: SpeechResult) => void;
  private onErrorCallback?: (error: string) => void;

  constructor() {
    this.setupVoiceHandlers();
  }

  private setupVoiceHandlers(): void {
    Voice.onSpeechStart = () => {
      this.isListening = true;
    };

    Voice.onSpeechEnd = () => {
      this.isListening = false;
    };

    Voice.onSpeechResults = (event) => {
      if (event.value && event.value.length > 0) {
        const text = event.value[0];
        this.onResultCallback?.({ text, isFinal: true });
      }
    };

    Voice.onSpeechPartialResults = (event) => {
      if (event.value && event.value.length > 0) {
        const text = event.value[0];
        this.onResultCallback?.({ text, isFinal: false });
      }
    };

    Voice.onSpeechError = (event) => {
      const error = event.error?.message || 'Speech recognition error';
      this.onErrorCallback?.(error);
      this.isListening = false;
    };
  }

  async startListening(onResult: (result: SpeechResult) => void, onError?: (error: string) => void): Promise<void> {
    if (this.isListening) {
      return;
    }

    this.onResultCallback = onResult;
    this.onErrorCallback = onError;

    try {
      await Voice.start('en-US'); // Default to English, can be made configurable later
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start speech recognition';
      this.onErrorCallback?.(errorMessage);
    }
  }

  async stopListening(): Promise<void> {
    if (!this.isListening) {
      return;
    }

    try {
      await Voice.stop();
      this.isListening = false;
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  }

  async destroy(): Promise<void> {
    try {
      await Voice.destroy();
      this.isListening = false;
      this.onResultCallback = undefined;
      this.onErrorCallback = undefined;
    } catch (error) {
      console.error('Error destroying speech recognition:', error);
    }
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }
}