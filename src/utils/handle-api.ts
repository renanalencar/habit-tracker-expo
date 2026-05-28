import { Habit } from '../types/Habit';

// Ajuste o IP ou porta conforme necessário para testes em dispositivos físicos (ex: http://192.168.x.x:3000/api/habits)
// Para emuladores Android usando Expo: use 'http://10.0.2.2:3000/api/habits' se localhost não funcionar
const API_URL = 'http://localhost:3000/api/habits';

export async function fetchHabits(): Promise<Habit[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Falha ao buscar hábitos');
  return await response.json();
}

export async function toggleHabit(id: string): Promise<Habit> {
  const response = await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
  if (!response.ok) throw new Error('Falha ao atualizar hábito');
  return await response.json();
}

export async function createHabit(data: Omit<Habit, 'id' | 'completedToday' | 'streak' | 'createdAt'>): Promise<Habit> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Falha ao criar hábito');
  return await response.json();
}

export async function deleteHabit(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Falha ao excluir hábito');
}
