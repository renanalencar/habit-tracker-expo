/**
 * Exercício 5 — Utility types: uma fonte de verdade
 * Enunciado completo em `exercises.md` da Aula 1.
 */

export type StatusHabito = 'pendente' | 'concluido' | 'pulado';
export type CategoriaHabito = 'saude' | 'produtividade' | 'mentalidade' | 'sono';

// TODO 5.1 — declare FrequenciaHabito: 'diario' | 'semanal' | 'dias_uteis'
export type FrequenciaHabito = 'diario' | 'semanal' | 'dias_uteis'; // ← substitua `never`

export interface Habito {
  id: string;
  titulo: string;
  categoria: CategoriaHabito;
  frequencia: FrequenciaHabito;
  status: StatusHabito;
  streakDias: number;
  criadoEm: string;
}

// Regra do domínio: o formulário de criação NÃO envia id, status,
// streakDias nem criadoEm — quem gera esses quatro é o servidor.
// TODO 5.2 — derive NovoHabito de Habito com UM utility type. Não redigite campos.
export type NovoHabito = Omit<Habito, 'id' | 'status' | 'streakDias' | 'criadoEm'>; // ← substitua `never`
// export type NovoHabito = Pick<Habito, 'categoria' | 'frequencia'>; // ← substitua `never`

// O card da tela precisa de exatamente quatro campos.
// TODO 5.3 — derive ResumoHabito: id, titulo, status e categoria.
export type ResumoHabito = Pick<Habito, 'id' | 'titulo' | 'status' | 'categoria'>; // ← substitua `never`
// export type ResumoHabito = Omit<Habito, 'frequencia' | 'streakDias' | 'criadoEm'>; // ← substitua `never`

// A edição envia só o que mudou.
// TODO 5.4 — derive AtualizacaoHabito a partir de NovoHabito.
export type AtualizacaoHabito = Partial<NovoHabito>; // ← substitua `never`

// ============================================================
// VERIFICAÇÃO — não apague.
// Depois dos TODO, estas TRÊS DEVEM compilar exatamente assim,
// sem campos a mais nem a menos. Descomente:
// ============================================================

const novo: NovoHabito = {
  titulo: 'Beber 2L de água',
  categoria: 'saude',
  frequencia: 'diario',
};

const resumo: ResumoHabito = {
  id: 'h1',
  titulo: 'Beber 2L de água',
  status: 'pendente',
  categoria: 'saude',
};

const parcial: AtualizacaoHabito = { titulo: 'Beber 3L de água' };

// E estas DEVEM dar erro — descomente uma de cada vez:
// const errado1: NovoHabito = { titulo: 'x', categoria: 'saude', frequencia: 'diario', id: 'h1' };
// const errado2: ResumoHabito = { id: 'h1', titulo: 'x', status: 'pendente' };

// ============================================================
// TESTE FINAL DO EXERCÍCIO
// Acrescente o campo `lembreteHora: string` à interface Habito.
// Quantos dos três tipos derivados você precisou editar à mão?
// R:
// ============================================================
