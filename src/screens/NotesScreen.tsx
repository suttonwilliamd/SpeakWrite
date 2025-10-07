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
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Note, NoteCategory } from '../types';
import { DatabaseService } from '../services/DatabaseService';

type NotesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Notes'>;
type NotesScreenRouteProp = RouteProp<RootStackParamList, 'Notes'>;

interface Props {
  navigation: NotesScreenNavigationProp;
  route: NotesScreenRouteProp;
}

const db = new DatabaseService();

const categoryColors: Record<NoteCategory, string> = {
  character: '#FF6B6B',
  plot: '#4ECDC4',
  research: '#45B7D1',
  world: '#96CEB4',
  other: '#FECA57',
};

const categoryLabels: Record<NoteCategory, string> = {
  character: 'Character',
  plot: 'Plot',
  research: 'Research',
  world: 'World',
  other: 'Other',
};

export const NotesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { bookId } = route.params;
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory | 'all'>('all');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    try {
      const loadedNotes = db.getNotes(bookId);
      setNotes(loadedNotes);
    } catch (error) {
      Alert.alert('Error', 'Failed to load notes');
    }
  };

  const filteredNotes = selectedCategory === 'all'
    ? notes
    : notes.filter(note => note.category === selectedCategory);

  const handleCreateNote = () => {
    navigation.navigate('NoteEditor', { bookId, noteId: undefined });
  };

  const handleNotePress = (note: Note) => {
    navigation.navigate('NoteEditor', { bookId, noteId: note.id });
  };

  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            try {
              db.deleteNote(noteId);
              loadNotes();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete note');
            }
          },
        },
      ]
    );
  };

  const renderCategoryFilter = () => (
    <View style={styles.categoryFilter}>
      <TouchableOpacity
        style={[styles.categoryButton, selectedCategory === 'all' && styles.categoryButtonActive]}
        onPress={() => setSelectedCategory('all')}
      >
        <Text style={[styles.categoryButtonText, selectedCategory === 'all' && styles.categoryButtonTextActive]}>
          All
        </Text>
      </TouchableOpacity>
      {(Object.keys(categoryColors) as NoteCategory[]).map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            { borderColor: categoryColors[category] },
            selectedCategory === category && { backgroundColor: categoryColors[category] }
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === category && styles.categoryButtonTextActive
          ]}>
            {categoryLabels[category]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => handleNotePress(item)}
      onLongPress={() => handleDeleteNote(item.id)}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: categoryColors[item.category] }]}>
          <Text style={styles.categoryBadgeText}>{categoryLabels[item.category]}</Text>
        </View>
      </View>
      <Text style={styles.notePreview} numberOfLines={2}>
        {item.content}
      </Text>
      {item.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map(tag => (
            <Text key={tag} style={styles.tag}>#{tag}</Text>
          ))}
          {item.tags.length > 3 && <Text style={styles.moreTags}>+{item.tags.length - 3} more</Text>}
        </View>
      )}
      <Text style={styles.noteDate}>
        Updated: {item.updatedAt.toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateNote}>
          <Text style={styles.createButtonText}>+ New Note</Text>
        </TouchableOpacity>
      </View>

      {renderCategoryFilter()}

      {filteredNotes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {selectedCategory === 'all' ? 'No notes yet' : `No ${categoryLabels[selectedCategory as NoteCategory]} notes`}
          </Text>
          <Text style={styles.emptyStateSubtext}>
            Tap "New Note" to add research, character details, or plot ideas
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={renderNote}
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  categoryFilter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  noteItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notePreview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    fontSize: 12,
    color: '#007AFF',
    marginRight: 8,
    marginBottom: 4,
  },
  moreTags: {
    fontSize: 12,
    color: '#999',
  },
  noteDate: {
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});