import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Book } from '../types';
import { DatabaseService } from '../services/DatabaseService';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const db = new DatabaseService();

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    try {
      const loadedBooks = db.getBooks();
      setBooks(loadedBooks);
    } catch (error) {
      Alert.alert('Error', 'Failed to load books');
    }
  };

  const handleCreateBook = () => {
    navigation.navigate('BookCreation');
  };

  const handleBookPress = (book: Book) => {
    // For now, navigate to chapter editor with the first chapter or create one
    const chapters = db.getChapters(book.id);
    const chapterId = chapters.length > 0 ? chapters[0].id : undefined;
    navigation.navigate('ChapterEditor', { bookId: book.id, chapterId });
  };

  const handleNotesPress = (book: Book) => {
    navigation.navigate('Notes', { bookId: book.id });
  };

  const handleDeleteBook = (bookId: string) => {
    Alert.alert(
      'Delete Book',
      'Are you sure you want to delete this book?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            try {
              db.deleteBook(bookId);
              loadBooks();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete book');
            }
          },
        },
      ]
    );
  };

  const renderBook = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <TouchableOpacity
        style={styles.bookContent}
        onPress={() => handleBookPress(item)}
        onLongPress={() => handleDeleteBook(item.id)}
      >
        <Text style={styles.bookTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.bookDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <Text style={styles.bookDate}>
          Updated: {item.updatedAt.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.notesButton}
        onPress={() => handleNotesPress(item)}
      >
        <Text style={styles.notesButtonText}>Notes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Books</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateBook}>
          <Text style={styles.createButtonText}>+ New Book</Text>
        </TouchableOpacity>
      </View>

      {books.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No books yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Tap "New Book" to start writing with your voice
          </Text>
        </View>
      ) : (
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  bookItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookContent: {
    flex: 1,
  },
  notesButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  notesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bookDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});