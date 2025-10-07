import * as SQLite from 'expo-sqlite';
import { Book, Chapter } from '../types';

export class DatabaseService {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync('speakwrite.db');
    this.initDatabase();
  }

  private initDatabase(): void {
    this.db.execSync(`
      CREATE TABLE IF NOT EXISTS books (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );
    `);

    this.db.execSync(`
      CREATE TABLE IF NOT EXISTS chapters (
        id TEXT PRIMARY KEY,
        bookId TEXT NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        "order" INTEGER NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (bookId) REFERENCES books (id) ON DELETE CASCADE
      );
    `);
  }

  // Book operations
  createBook(book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>): Book {
    const id = Date.now().toString();
    const now = new Date().toISOString();

    this.db.runSync(
      'INSERT INTO books (id, title, description, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
      [id, book.title, book.description || '', now, now]
    );

    return {
      id,
      ...book,
      createdAt: new Date(now),
      updatedAt: new Date(now),
    };
  }

  getBooks(): Book[] {
    const result = this.db.getAllSync('SELECT * FROM books ORDER BY updatedAt DESC');
    return result.map((row: any) => ({
      ...row,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    }));
  }

  updateBook(id: string, updates: Partial<Pick<Book, 'title' | 'description'>>): void {
    const now = new Date().toISOString();
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.description !== undefined) {
      fields.push('description = ?');
      values.push(updates.description);
    }

    fields.push('updatedAt = ?');
    values.push(now);
    values.push(id);

    this.db.runSync(
      `UPDATE books SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  }

  deleteBook(id: string): void {
    this.db.runSync('DELETE FROM books WHERE id = ?', [id]);
  }

  // Chapter operations
  createChapter(chapter: Omit<Chapter, 'id' | 'createdAt' | 'updatedAt'>): Chapter {
    const id = Date.now().toString();
    const now = new Date().toISOString();

    this.db.runSync(
      'INSERT INTO chapters (id, bookId, title, content, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, chapter.bookId, chapter.title, chapter.content, chapter.order, now, now]
    );

    return {
      id,
      ...chapter,
      createdAt: new Date(now),
      updatedAt: new Date(now),
    };
  }

  getChapters(bookId: string): Chapter[] {
    const result = this.db.getAllSync('SELECT * FROM chapters WHERE bookId = ? ORDER BY "order" ASC', [bookId]);
    return result.map((row: any) => ({
      ...row,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    }));
  }

  updateChapter(id: string, updates: Partial<Pick<Chapter, 'title' | 'content' | 'order'>>): void {
    const now = new Date().toISOString();
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.content !== undefined) {
      fields.push('content = ?');
      values.push(updates.content);
    }
    if (updates.order !== undefined) {
      fields.push('"order" = ?');
      values.push(updates.order);
    }

    fields.push('updatedAt = ?');
    values.push(now);
    values.push(id);

    this.db.runSync(
      `UPDATE chapters SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
  }

  deleteChapter(id: string): void {
    this.db.runSync('DELETE FROM chapters WHERE id = ?', [id]);
  }
}