import { SpeechResult } from '../types';

// Note: Speech recognition in Expo Managed Workflow has limitations
// @react-native-community/voice may not work reliably in Expo
// This is a known limitation for v0.1.0 MVP

export class SpeechService {
  private isListening = false;
  private onResultCallback?: (result: SpeechResult) => void;
  private onErrorCallback?: (error: string) => void;

  constructor() {
    // Speech recognition is not fully supported in Expo Managed Workflow
    // This will show an error when attempting to use speech features
  }

  async startListening(onResult: (result: SpeechResult) => void, onError?: (error: string) => void): Promise<void> {
    this.onResultCallback = onResult;
    this.onErrorCallback = onError;

    // Simulate speech recognition not being available
    setTimeout(() => {
      this.onErrorCallback?.('Speech recognition is not available in this Expo version. This is a known limitation of the current implementation.');
    }, 100);
  }

  async stopListening(): Promise<void> {
    this.isListening = false;
  }

  async destroy(): Promise<void> {
    this.isListening = false;
    this.onResultCallback = undefined;
    this.onErrorCallback = undefined;
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }
}