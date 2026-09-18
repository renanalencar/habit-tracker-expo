// Atividade 1 · Aula 4 — o mock da tela de lista.
//
// Lista pequena esconde exatamente os problemas que esta aula ensina a evitar:
// com 4 itens nada rola, nada vira, nenhum grupo fica vazio e o separador não aparece.
import type { Habito } from '../types/habito';

// TODO 43: leve este array a NO MÍNIMO 20 itens, distribuídos em pelo menos 3 grupos
//          do critério de agrupamento que o grupo escolher (status, período do dia
//          ou categoria — a escolha é justificada no README, TODO 71).
//          Os quatro abaixo são só o formato. Varie títulos, categorias, status e streak:
//          é o que faz a busca (TODO 47) e o estado "filtrado sem resultado" terem o que testar.
export const HABITOS: Habito[] = [
  {
    id: 'h1',
    titulo: 'Beber 2L de água',
    categoria: 'saude',
    frequencia: 'diaria',
    status: 'pendente',
    streakDias: 4,
    criadoEm: '2026-09-01T09:00:00.000Z',
  },
  {
    id: 'h2',
    titulo: 'Alongar 5 min',
    categoria: 'saude',
    frequencia: 'diaria',
    status: 'concluido',
    streakDias: 12,
    criadoEm: '2026-09-02T09:00:00.000Z',
  },
  {
    id: 'h3',
    titulo: 'Ler 10 páginas',
    categoria: 'mentalidade',
    frequencia: 'diaria',
    status: 'pendente',
    streakDias: 0,
    criadoEm: '2026-09-03T09:00:00.000Z',
  },
  {
    id: 'h4',
    titulo: 'Dormir antes das 23h',
    categoria: 'sono',
    frequencia: 'diaria',
    status: 'pulado',
    streakDias: 2,
    criadoEm: '2026-09-04T09:00:00.000Z',
  },
];
