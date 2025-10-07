import * as FileSystem from 'expo-file-system';
import { Book, Chapter, ExportOptions } from '../types';

export class ExportService {
  async exportBook(book: Book, chapters: Chapter[], options: ExportOptions): Promise<string> {
    const content = this.formatBookContent(book, chapters, options);
    const fileName = this.generateFileName(book.title, options.format);
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.writeAsStringAsync(fileUri, content);
    return fileUri;
  }

  private formatBookContent(book: Book, chapters: Chapter[], options: ExportOptions): string {
    let content = '';

    if (options.includeMetadata) {
      content += `# ${book.title}\n\n`;
      if (book.description) {
        content += `${book.description}\n\n`;
      }
      content += `Exported on: ${new Date().toLocaleDateString()}\n\n`;
      content += `---\n\n`;
    }

    chapters.forEach((chapter, index) => {
      if (options.format === 'md') {
        content += `## ${chapter.title}\n\n`;
      } else {
        content += `${chapter.title}\n${'='.repeat(chapter.title.length)}\n\n`;
      }

      content += `${chapter.content}\n\n`;

      if (index < chapters.length - 1) {
        content += `---\n\n`;
      }
    });

    return content;
  }

  private generateFileName(title: string, format: 'txt' | 'md'): string {
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = new Date().toISOString().split('T')[0];
    return `${sanitizedTitle}_${timestamp}.${format}`;
  }

  async shareBook(fileUri: string): Promise<void> {
    // For now, just return the file URI
    // In a full implementation, this would use expo-sharing
    console.log('Book exported to:', fileUri);
  }
}