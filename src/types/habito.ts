// Modelagem de domínio — Aula 2 (Ex. 4 a 7)
// Rastreador de Micro-hábitos e Condicionamento Físico.

/** Ex. 5 — união de literais: o compilador só aceita estes quatro valores. */
export type StatusHabito = 'pendente' | 'concluido' | 'pulado';

export type CategoriaHabito = 'saude' | 'produtividade' | 'mentalidade' | 'sono';

export type FrequenciaHabito = 'diaria' | 'semanal';

/** Ex. 7 — entidade central. Todos os tipos abaixo são derivados dela. */
export interface Habito {
  id: string;
  titulo: string;
  categoria: CategoriaHabito;
  frequencia: FrequenciaHabito;
  status: StatusHabito;
  streakDias: number;
  criadoEm: string;
}

// --- Ex. 7: utility types (nenhum campo repetido à mão) ---

/** Payload do formulário de criação: id, status, streakDias e criadoEm são do servidor. */
export type NovoHabito = Omit<Habito, 'id' | 'status' | 'streakDias' | 'criadoEm'>;

/** O que o card da tela precisa exibir. */
export type ResumoHabito = Pick<Habito, 'id' | 'titulo' | 'status' | 'categoria'>;

/** Edição parcial: qualquer campo editável, ou nenhum. `id` e `criadoEm` são imutáveis. */
export type AtualizacaoHabito = Partial<Omit<Habito, 'id' | 'criadoEm'>>;

// --- Ex. 6: união discriminada para o estado da tela ---

/**
 * Estado de uma tela que carrega um dado remoto.
 * O discriminante `situacao` torna impossível representar
 * "carregando com erro" ou "sucesso sem dados".
 */
export type EstadoTela<T> =
  | { situacao: 'carregando' }
  | { situacao: 'sucesso'; dados: T }
  | { situacao: 'erro'; mensagem: string };
