ROADMAP# 📘 SpeakWrite Roadmap

> **“Talk your book into existence.”**
>
> SpeakWrite is an Android app that turns spoken words into structured, editable, and AI-enhanced manuscripts.
> This roadmap outlines the evolution from the first working MVP to the full authoring suite.

---

## 🧩 Version 0.1 — MVP: “Just Speak”
**Goal:** Capture raw spoken text and save it reliably.

### Core Features
- Create new **Book Projects** (title + optional description)
- **Continuous speech-to-text** recording (no timeout mid-sentence)
- Save and edit **plain text** organized by chapter
- Minimal text editor (basic markdown)
- Export to `.txt` or `.md`

### Focus
- Stability of transcription
- Simple, intuitive interface
- Local-only data with SQLite

---

## 🗂️ Version 0.2 — “Chapters & Notes”
**Goal:** Introduce structure and organization. Make it feel like *a book project*.

### New Features
- Add, reorder, and rename chapters
- Notes system (tags, character bios, research)
- Auto-save and draft recovery
- Improved text editor (rich text / markdown hybrid)

---

## 🤖 Version 0.3 — “AI Companion”
**Goal:** Add basic AI-powered writing assistance.

### New Features
- “Polish” button: rewrite selection for clarity or tone
- “Summarize” button for chapter overview
- Compare before/after AI edits
- Configurable AI backend (OpenAI, Claude, local)

---

## 🧠 Version 0.4 — “Smart Dictation”
**Goal:** Make dictation smoother and context-aware.

### New Features
- Custom **voice commands** (e.g., “next chapter,” “new paragraph”)
- Auto-punctuation and formatting cues
- Simple **voice correction** (“Replace that with…”)
- Background dictation (record while browsing app)

---

## ☁️ Version 0.5 — “Sync & Safety”
**Goal:** Protect user data and enable continuity across devices.

### New Features
- Cloud sync (Supabase / Firebase)
- Local version history & backups
- Export to `.docx` and `.epub`
- Optional encryption for privacy

---

## 🪶 Version 0.6 — “Editing Suite”
**Goal:** Bring professional-grade editing to mobile.

### New Features
- Split-screen editing (draft vs. AI suggestions)
- Highlight-based editing actions:
  - “Shorten,” “Expand,” “Make poetic,” etc.
- Inline comments and notes
- Reading-time and word-count statistics

---

## 🪄 Version 0.7 — “AI Outliner”
**Goal:** Add AI planning and structuring capabilities.

### New Features
- AI-generated outlines from ideas or transcripts
- Scene/plot/character templates
- Voice command: “Summarize last 5 minutes”
- Chapter-level summaries and auto-titles

---

## 🎧 Version 0.8 — “Offline Mode & Whisper Integration”
**Goal:** Enable productivity anywhere, anytime.

### New Features
- Local Whisper model for offline transcription
- Sync queue for delayed cloud uploads
- Offline autosave and background audio processing

---

## 🧩 Version 0.9 — “Collaboration & Review”
**Goal:** Open the door to team and AI-assisted editing.

### New Features
- Share projects or chapters with collaborators
- Comment mode with tracked changes
- “AI editor personas” (creative, academic, journalistic)
- Inline voice review (recorded editor feedback)

---

## 📚 Version 1.0 — “Studio Release”
**Goal:** Become the definitive mobile authoring environment.

### New Features
- Publish-ready exports (KDP, EPUB3, PDF)
- Full project dashboard:
  - Word goals, progress charts, and time tracking
- Contextual AI editor with multi-chapter memory
- Full **voice-driven navigation** and editing
- Optional desktop web companion app

---

## 🌟 Beyond 1.0 — “Author Ecosystem”
**Long-Term Vision**
- AI audiobook narration and character voices
- Marketplace for templates, voices, and story packs
- Style-trained AI fine-tuned on user’s past writing
- Cloud-based “AI co-author” mode

---

## 🧭 Development Philosophy
1. **Voice-first** — The user should be able to create entire works hands-free.
2. **Offline-first** — Creativity shouldn’t depend on a signal.
3. **Privacy by design** — User manuscripts never leave their control without consent.
4. **AI as partner, not puppeteer** — Enhancements should empower, not overtake the writer.
5. **Iterative refinement** — Each version builds intuitively from the last, minimizing feature shock.

---

*Roadmap maintained by the SpeakWrite development team.*  
*Contributions and feature suggestions welcome.*
