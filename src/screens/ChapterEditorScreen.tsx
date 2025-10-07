import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Chapter, SpeechResult } from '../types';
import { DatabaseService } from '../services/DatabaseService';
import { SpeechService } from '../services/SpeechService';
import { ExportService } from '../services/ExportService';

type ChapterEditorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChapterEditor'>;
type ChapterEditorScreenRouteProp = RouteProp<RootStackParamList, 'ChapterEditor'>;

interface Props {
  navigation: ChapterEditorScreenNavigationProp;
  route: ChapterEditorScreenRouteProp;
}

const db = new DatabaseService();
const speechService = new SpeechService();
const exportService = new ExportService();

export const ChapterEditorScreen: React.FC<Props> = ({ navigation, route }) => {
  const { bookId, chapterId } = route.params;
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    loadChapter();
    return () => {
      speechService.stopListening();
    };
  }, []);

  const loadChapter = () => {
    try {
      const chapters = db.getChapters(bookId);
      let currentChapter: Chapter;

      if (chapterId && chapters.find(c => c.id === chapterId)) {
        currentChapter = chapters.find(c => c.id === chapterId)!;
      } else {
        // Create first chapter if none exists
        currentChapter = db.createChapter({
          bookId,
          title: 'Chapter 1',
          content: '',
          order: 1,
        });
      }

      setChapter(currentChapter);
      setContent(currentChapter.content);
    } catch (error) {
      Alert.alert('Error', 'Failed to load chapter');
    }
  };

  const handleSpeechResult = (result: SpeechResult) => {
    if (result.isFinal) {
      const newContent = content ? `${content} ${result.text}` : result.text;
      setContent(newContent);
      saveContent(newContent);
    }
  };

  const handleSpeechError = (error: string) => {
    Alert.alert('Speech Error', error);
    setIsRecording(false);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await speechService.stopListening();
      setIsRecording(false);
    } else {
      try {
        await speechService.startListening(handleSpeechResult, handleSpeechError);
        setIsRecording(true);
      } catch (error) {
        Alert.alert('Error', 'Failed to start recording');
      }
    }
  };

  const saveContent = (newContent: string) => {
    if (!chapter) return;

    try {
      db.updateChapter(chapter.id, { content: newContent });
    } catch (error) {
      Alert.alert('Error', 'Failed to save content');
    }
  };

  const handleExport = async () => {
    if (!chapter) return;

    try {
      const chapters = db.getChapters(bookId);
      const books = db.getBooks();
      const book = books.find(b => b.id === bookId);

      if (!book) return;

      const fileUri = await exportService.exportBook(book, chapters, {
        format: 'md',
        includeMetadata: true,
      });

      Alert.alert('Success', `Book exported to: ${fileUri}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to export book');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.chapterTitle}>{chapter?.title || 'Loading...'}</Text>
        <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.editorContainer}
        contentContainerStyle={styles.editorContent}
      >
        <TextInput
          style={styles.textInput}
          value={content}
          onChangeText={(text) => {
            setContent(text);
            saveContent(text);
          }}
          placeholder="Start speaking or typing your chapter..."
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          onPress={toggleRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exportButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  exportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editorContainer: {
    flex: 1,
  },
  editorContent: {
    padding: 16,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 400,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  recordButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  recordButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  recordButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});