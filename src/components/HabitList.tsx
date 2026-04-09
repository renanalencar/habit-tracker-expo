import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Habit } from '../types/Habit';
import HabitItem from './HabitItem';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// TODO Q3 — substituir FlatList por SectionList agrupando por completedToday
export default function HabitList({ habits, onToggle, onDelete }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum hábito cadastrado ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={habits}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <HabitItem habit={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
  },
});
