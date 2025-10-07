import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Note, NoteCategory } from '../types';
import { DatabaseService } from '../services/DatabaseService';

type NoteEditorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NoteEditor'>;
type NoteEditorScreenRouteProp = RouteProp<RootStackParamList, 'NoteEditor'>;

interface Props {
  navigation: NoteEditorScreenNavigationProp;
  route: NoteEditorScreenRouteProp;
}

const db = new DatabaseService();

const categories: { value: NoteCategory; label: string; color: string }[] = [
  { value: 'character', label: 'Character', color: '#FF6B6B' },
  { value: 'plot', label: 'Plot', color: '#4ECDC4' },
  { value: 'research', label: 'Research', color: '#45B7D1' },
  { value: 'world', label: 'World', color: '#96CEB4' },
  { value: 'other', label: 'Other', color: '#FECA57' },
];

export const NoteEditorScreen: React.FC<Props> = ({ navigation, route }) => {
  const { bookId, noteId } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<NoteCategory>('other');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (noteId) {
      loadNote();
    }
  }, [noteId]);

  const loadNote = () => {
    if (!noteId) return;

    try {
      const notes = db.getNotes(bookId);
      const note = notes.find(n => n.id === noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setCategory(note.category);
        setTags(note.tags);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load note');
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a note title');
      return;
    }

    try {
      if (noteId) {
        // Update existing note
        db.updateNote(noteId, {
          title: title.trim(),
          content: content.trim(),
          category,
          tags,
        });
      } else {
        // Create new note
        db.createNote({
          bookId,
          title: title.trim(),
          content: content.trim(),
          category,
          tags,
        });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save note');
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const renderCategoryButtons = () => (
    <View style={styles.categoryContainer}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryButtons}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.value}
            style={[
              styles.categoryButton,
              { borderColor: cat.color },
              category === cat.value && { backgroundColor: cat.color }
            ]}
            onPress={() => setCategory(cat.value)}
          >
            <Text style={[
              styles.categoryButtonText,
              category === cat.value && styles.categoryButtonTextActive
            ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTags = () => (
    <View style={styles.tagsContainer}>
      <Text style={styles.label}>Tags</Text>
      <View style={styles.tagInputContainer}>
        <TextInput
          style={styles.tagInput}
          value={tagInput}
          onChangeText={setTagInput}
          placeholder="Add tag..."
          onSubmitEditing={addTag}
        />
        <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
          <Text style={styles.addTagButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tagsList}>
        {tags.map(tag => (
          <TouchableOpacity
            key={tag}
            style={styles.tag}
            onPress={() => removeTag(tag)}
          >
            <Text style={styles.tagText}>#{tag} ×</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Note title..."
          maxLength={100}
        />

        {renderCategoryButtons()}

        {renderTags()}

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          placeholder="Write your note here..."
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {noteId ? 'Update Note' : 'Save Note'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tagsContainer: {
    marginBottom: 20,
  },
  tagInputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  addTagButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addTagButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#1976D2',
    fontSize: 14,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 200,
    textAlignVertical: 'top',
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#34C759',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});