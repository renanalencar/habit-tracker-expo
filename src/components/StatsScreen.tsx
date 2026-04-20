import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

interface StatsScreenProps {
  onClose: () => void;
}

export default function StatsScreen({ onClose }: StatsScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image 
        source={require('../assets/habit-tracker-banner.png')} 
        style={styles.image} 
        resizeMode="cover" 
      />
      
      <Text style={styles.title}>Minhas Estatísticas</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo Geral</Text>
        <Text style={styles.metric}>Total de Hábitos: 12</Text>
        <Text style={styles.metric}>Concluídos Hoje: 5</Text>
        <Text style={styles.metric}>Sequência Atual: 14 dias</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hábitos por Frequência</Text>
        <Text style={styles.metric}>Diário: 7</Text>
        <Text style={styles.metric}>Semanal: 3</Text>
        <Text style={styles.metric}>Mensal: 2</Text>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5C6BC0', // Cor de destaque
  },
  metric: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '80%',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#F44336',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
