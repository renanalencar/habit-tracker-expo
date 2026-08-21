import type { Habito } from '../types/habito';

const SIMULAR_ERRO = false;

const ATRASO_MS = 1000;

const MOCK: Habito = {
  id: 'h1',
  titulo: 'Beber 2L de água',
  categoria: 'saude',
  frequencia: 'diaria',
  status: 'pendente',
  streakDias: 4,
  criadoEm: '2026-08-01T09:00:00.000Z',
};

export async function buscarHabitoDoDia(): Promise<Habito> {
  throw new Error('TODO A1.7 a A1.9 — implemente buscarHabitoDoDia()');
}
