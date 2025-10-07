# SpeakWrite

SpeakWrite — Talk your book into existence. An Android app that lets you speak your ideas, structure them into chapters, and polish them with AI — all in one place. It's your voice, your thoughts, your story — flowing straight from mind to manuscript. No bouncing between recorders, editors, and note apps — just speak, tweak, and write.

## Features (v0.1.0)

- **Continuous Speech-to-Text**: Record your thoughts without interruption
- **Book Organization**: Create and manage multiple book projects
- **Chapter-Based Editing**: Structure your content by chapters
- **Local Storage**: All data stored locally on your device
- **Export Support**: Export books to .txt or .md formats

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- Android Studio (for Android development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/suttonwilliamd/SpeakWrite.git
   cd SpeakWrite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on Android:
   ```bash
   npm run android
   ```

   Or scan the QR code with the Expo Go app on your Android device.

### Testing

Run the test suite:
```bash
npm test
```

## Project Structure

```
src/
├── screens/          # Full-screen views
│   ├── HomeScreen.tsx
│   ├── BookCreationScreen.tsx
│   └── ChapterEditorScreen.tsx
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── services/        # Business logic (DB, API, etc.)
│   ├── DatabaseService.ts
│   ├── SpeechService.ts
│   └── ExportService.ts
├── types/           # TypeScript definitions
├── utils/           # Helper functions
├── constants/       # App-wide constants
└── navigation/      # Navigation configuration
```

## Architecture

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: React Context API
- **Database**: SQLite (expo-sqlite)
- **Speech Recognition**: @react-native-community/voice
- **Navigation**: React Navigation
- **Testing**: Jest

## Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser
- `npm test` - Run the test suite

### Building for Production

1. Configure app.json for your needs
2. Build with Expo:
   ```bash
   expo build:android
   ```

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the complete development plan.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*SpeakWrite is currently in early development (v0.1.0). Features may change as we iterate toward the full vision.*