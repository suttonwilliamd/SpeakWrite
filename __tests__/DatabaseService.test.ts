import { DatabaseService } from '../src/services/DatabaseService';

describe('DatabaseService', () => {
  let db: DatabaseService;

  beforeEach(() => {
    db = new DatabaseService();
  });

  it('should create and retrieve a book', () => {
    const book = db.createBook({
      title: 'Test Book',
      description: 'A test book',
    });

    expect(book.title).toBe('Test Book');
    expect(book.description).toBe('A test book');
    expect(book.id).toBeDefined();

    const books = db.getBooks();
    expect(books.length).toBeGreaterThan(0);
    expect(books.find(b => b.id === book.id)).toBeDefined();
  });

  it('should create and retrieve chapters', () => {
    const book = db.createBook({ title: 'Test Book' });
    const chapter = db.createChapter({
      bookId: book.id,
      title: 'Chapter 1',
      content: 'Test content',
      order: 1,
    });

    expect(chapter.title).toBe('Chapter 1');
    expect(chapter.content).toBe('Test content');

    const chapters = db.getChapters(book.id);
    expect(chapters.length).toBe(1);
    expect(chapters[0].id).toBe(chapter.id);
  });

  it('should update book', () => {
    const book = db.createBook({ title: 'Original Title' });
    db.updateBook(book.id, { title: 'Updated Title' });

    const books = db.getBooks();
    const updatedBook = books.find(b => b.id === book.id);
    expect(updatedBook?.title).toBe('Updated Title');
  });

  it('should delete book', () => {
    const book = db.createBook({ title: 'To Delete' });
    db.deleteBook(book.id);

    const books = db.getBooks();
    expect(books.find(b => b.id === book.id)).toBeUndefined();
  });
});