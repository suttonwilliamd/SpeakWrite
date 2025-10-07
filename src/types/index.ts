export interface Book {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  id: string;
  bookId: string;
  title: string;
  content: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpeechResult {
  text: string;
  isFinal: boolean;
}

export interface ExportOptions {
  format: 'txt' | 'md';
  includeMetadata: boolean;
}

export interface Note {
  id: string;
  bookId: string;
  title: string;
  content: string;
  category: NoteCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type NoteCategory = 'character' | 'plot' | 'research' | 'world' | 'other';