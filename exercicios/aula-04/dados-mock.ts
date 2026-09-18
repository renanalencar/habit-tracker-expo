// Mock compartilhado pelos Exercícios 5, 6 e 7.
//
// Vem do enunciado da Aula 4, adaptado ao tipo `Habito` REAL do projeto
// (`src/types/habito.ts`), que tem `frequencia` e `criadoEm` além dos campos do
// enunciado, e trata `categoria` como união fechada em vez de string livre.
// Nada aqui é TODO — é só o dado de entrada dos exercícios.
import type { Habito } from '../../src/types/habito';

export const MOCK: Habito[] = [
  {
    id: 'a1',
    titulo: 'Beber água',
    categoria: 'saude',
    frequencia: 'diaria',
    status: 'pendente',
    streakDias: 4,
    criadoEm: '2026-09-01T09:00:00.000Z',
  },
  {
    id: 'a2',
    titulo: 'Alongar 5 min',
    categoria: 'saude',
    frequencia: 'diaria',
    status: 'concluido',
    streakDias: 12,
    criadoEm: '2026-09-02T09:00:00.000Z',
  },
  {
    id: 'a3',
    titulo: 'Ler 10 páginas',
    categoria: 'mentalidade',
    frequencia: 'diaria',
    status: 'pendente',
    streakDias: 0,
    criadoEm: '2026-09-03T09:00:00.000Z',
  },
  {
    id: 'a4',
    titulo: 'Meditar',
    categoria: 'mentalidade',
    frequencia: 'diaria',
    status: 'pulado',
    streakDias: 2,
    criadoEm: '2026-09-04T09:00:00.000Z',
  },
];
