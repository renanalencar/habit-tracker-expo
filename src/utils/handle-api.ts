import { Habit } from '../types/Habit';

// Dados mockados — utilizados quando o servidor não estiver disponível
const MOCK_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Beber 2L de água',
    description: 'Manter a hidratação ao longo do dia',
    frequency: 'diário',
    completedToday: true,
    streak: 5,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Ler por 30 minutos',
    description: 'Leitura de livros técnicos ou ficção',
    frequency: 'diário',
    completedToday: false,
    streak: 3,
    createdAt: '2026-01-05T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Praticar exercícios',
    description: 'Caminhada, corrida ou academia',
    frequency: 'semanal',
    completedToday: false,
    streak: 2,
    createdAt: '2026-01-10T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'Revisar metas do mês',
    description: 'Avaliar progresso e ajustar objetivos',
    frequency: 'mensal',
    completedToday: false,
    streak: 1,
    createdAt: '2026-02-01T00:00:00.000Z',
  },
  {
    id: '5',
    name: 'Meditar 10 minutos',
    description: 'Prática de mindfulness pela manhã',
    frequency: 'diário',
    completedToday: true,
    streak: 8,
    createdAt: '2026-01-15T00:00:00.000Z',
  },
];

const API_URL = 'http://localhost:3000/habits';

export async function fetchHabits(): Promise<Habit[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Falha ao buscar hábitos');
    return await response.json();
  } catch {
    console.warn('API indisponível — utilizando dados mockados.');
    return MOCK_HABITS;
  }
}

export async function toggleHabit(id: string): Promise<Habit> {
  try {
    const response = await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
    if (!response.ok) throw new Error('Falha ao atualizar hábito');
    return await response.json();
  } catch {
    const habit = MOCK_HABITS.find(h => h.id === id)!;
    habit.completedToday = !habit.completedToday;
    return habit;
  }
}

export async function createHabit(data: Omit<Habit, 'id' | 'completedToday' | 'streak' | 'createdAt'>): Promise<Habit> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Falha ao criar hábito');
    return await response.json();
  } catch {
    const newHabit: Habit = {
      ...data,
      id: String(Date.now()),
      completedToday: false,
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    MOCK_HABITS.push(newHabit);
    return newHabit;
  }
}

export async function deleteHabit(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Falha ao excluir hábito');
  } catch {
    const index = MOCK_HABITS.findIndex(h => h.id === id);
    if (index !== -1) MOCK_HABITS.splice(index, 1);
  }
}
