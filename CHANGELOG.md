# Changelog

All notable changes to SpeakWrite will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-10-07

### Added
- **Notes System**: Complete note-taking functionality with categories and tags
  - Note categories: Character, Plot, Research, World, Other
  - Tag system for organizing notes
  - Full CRUD operations for notes
- **Enhanced Navigation**: Added Notes and NoteEditor screens
  - Notes button on book items in home screen
  - Category filtering in notes list
  - Rich note editing with tags and categories
- **Database Extensions**: Extended SQLite schema for notes table
  - Notes linked to books with foreign key constraints
  - JSON storage for tags array
  - Full note management operations

### Changed
- Updated navigation structure to support notes workflow
- Enhanced book item UI with Notes access button
- Extended type definitions for Note interface and categories

### Technical Implementation
- **DatabaseService**: Added complete notes CRUD operations
- **NotesScreen**: Category filtering, note listing, and management
- **NoteEditorScreen**: Rich note creation/editing with tags and categories
- **Navigation**: Extended RootStackParamList for notes workflow
- **UI Components**: Color-coded category system and tag management

### Known Limitations
- Speech recognition still not available (Expo Managed Workflow limitation)
- Database tests fail in Jest (expo-sqlite testing environment issues)
- No auto-save implemented yet (manual save required)
- Basic text editor (markdown support planned for future version)
- No draft recovery system yet

### Next Steps
- v0.3.0: AI assistance features and enhanced text editing
- Future: Auto-save, draft recovery, speech recognition implementation

---

## [0.1.0] - 2025-10-07

### Added
- **MVP Release: "Just Speak"** - Basic speech-to-text book creation functionality
- Book project creation with title and optional description
- Continuous speech-to-text recording using @react-native-community/voice
- Chapter-based text editing with plain text support
- Local SQLite database storage with expo-sqlite
- Book and chapter management (create, read, update, delete)
- Export functionality to .txt and .md formats
- Basic navigation between screens (Home, Book Creation, Chapter Editor)
- TypeScript implementation with strict type checking
- Unit tests for database operations
- Expo-based React Native setup for Android development

### Technical Implementation
- **Database Layer**: DatabaseService with full CRUD operations for books and chapters
- **Speech Service**: SpeechService handling voice recognition with error handling
- **Export Service**: ExportService for file generation and storage
- **Navigation**: React Navigation with native stack navigator
- **UI Components**: Basic screens for home, book creation, and chapter editing
- **Project Structure**: Organized src/ directory with services, screens, types, etc.

### Dependencies Added
- @react-navigation/native, @react-navigation/native-stack
- @react-native-community/voice
- expo-sqlite, expo-file-system
- react-native-safe-area-context, react-native-screens
- jest, @types/jest for testing

### Known Limitations
- **Speech Recognition Not Available**: Due to Expo Managed Workflow limitations, speech-to-text functionality is not implemented in v0.1.0. The UI shows speech controls but they will display an error message. Speech recognition will be added in a future version after evaluating bare React Native or alternative solutions.
- Export functionality saves to device storage but doesn't trigger share dialog
- No rich text editing (plain text only)
- Single chapter per book (chapters are created but not fully managed)
- No error boundaries or offline handling beyond basic try/catch
- Tests are basic and don't cover all edge cases
- Database tests fail in Jest due to expo-sqlite dependencies (known Expo testing limitation)

### Next Steps
- v0.2.0: Add chapter management, notes system, auto-save
- v0.3.0: AI assistance features
- See ROADMAP.md for complete development plan

---

## Development Notes

- **Framework**: Expo (Managed Workflow) for rapid development
- **Platform**: Android primary target (API 26+)
- **Architecture**: Service-oriented with clear separation of concerns
- **Testing**: Jest setup with basic unit tests
- **Version Control**: Git with conventional commits
- **Documentation**: README.md and ROADMAP.md maintained

---

*This is the initial MVP release. All features are functional but may have rough edges as we iterate toward production quality.*