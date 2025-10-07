import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DatabaseService } from '../services/DatabaseService';

type BookCreationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookCreation'>;

interface Props {
  navigation: BookCreationScreenNavigationProp;
}

const db = new DatabaseService();

export const BookCreationScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateBook = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a book title');
      return;
    }

    try {
      const book = db.createBook({
        title: title.trim(),
        description: description.trim() || undefined,
      });

      // Navigate back to home and then to chapter editor
      navigation.goBack();
      navigation.navigate('ChapterEditor', { bookId: book.id });
    } catch (error) {
      Alert.alert('Error', 'Failed to create book');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Book Title *</Text>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter book title"
          maxLength={100}
        />

        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter book description"
          multiline
          numberOfLines={3}
          maxLength={500}
        />

        <TouchableOpacity
          style={[styles.createButton, !title.trim() && styles.createButtonDisabled]}
          onPress={handleCreateBook}
          disabled={!title.trim()}
        >
          <Text style={styles.createButtonText}>Create Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
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
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#ccc',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});