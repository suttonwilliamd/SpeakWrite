import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { BookCreationScreen } from '../screens/BookCreationScreen';
import { ChapterEditorScreen } from '../screens/ChapterEditorScreen';

export type RootStackParamList = {
  Home: undefined;
  BookCreation: undefined;
  ChapterEditor: { bookId: string; chapterId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'SpeakWrite' }}
        />
        <Stack.Screen
          name="BookCreation"
          component={BookCreationScreen}
          options={{ title: 'Create New Book' }}
        />
        <Stack.Screen
          name="ChapterEditor"
          component={ChapterEditorScreen}
          options={{ title: 'Edit Chapter' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};