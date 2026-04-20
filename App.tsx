import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HabitList from './src/components/HabitList';
import { Habit } from './src/types/Habit';
import { fetchHabits, toggleHabit, deleteHabit } from './src/utils/handle-api';
import { globalStyles } from './src/styles/global';

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [logoError, setLogoError] = useState<boolean>(false);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    setLoading(true);
    const data = await fetchHabits();
    setHabits(data);
    setLoading(false);
  };

  const handleToggle = async (id: string) => {
    const updated = await toggleHabit(id);
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, completedToday: updated.completedToday } : h))
    );
  };

  const handleDelete = async (id: string) => {
    await deleteHabit(id);
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={styles.header}>
        {/* TODO Q2b — exibir Image ou Text com renderização condicional */}
        <Text style={styles.title}>Rastreador de Hábitos</Text>
        <Text style={styles.subtitle}>{habits.length} hábito(s) cadastrado(s)</Text>
      </View>

      {/* TODO Q4b — adicionar botões de filtro (Todos / Concluídos / Pendentes) */}

      {/* TODO Q2c — exibir ActivityIndicator quando loading for true */}
      {loading ? (
        <ActivityIndicator size="large" color={globalStyles.primaryColor} style={styles.loader} />
      ) : (
        <HabitList
          habits={habits}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}

      {/* TODO Q5b — adicionar Button "Ver Estatísticas" e Modal do StatsScreen */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.backgroundColor,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: globalStyles.primaryColor,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#C5CAE9',
    marginTop: 2,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
