/**
 * Atividade 1 — arquivo 1 de 3: modelagem do domínio.
 *
 * Enunciado completo em `exercises.md` da Aula 1.
 * Substitua cada `never` (e cada corpo vazio) pela sua implementação.
 * Quando terminar, `npx tsc --noEmit` na raiz do projeto deve passar limpo.
 */

// ============================================================
// TODO A1.1 — Union types literais. Nenhum destes pode ser `string`.
//   StatusHabito      → 'pendente' | 'concluido' | 'pulado'
//   CategoriaHabito   → 'saude' | 'produtividade' | 'mentalidade' | 'sono'
//   FrequenciaHabito  → escolha os valores e justifique no README
// ============================================================
export type StatusHabito = 'pendente' | 'concluido' | 'pulado';
export type CategoriaHabito = 'saude' | 'produtividade' | 'mentalidade' | 'sono';
export type FrequenciaHabito = 'diariamente' | 'semanalmente' | 'mensalmente';

// ============================================================
// TODO A1.2 — A entidade completa, como ela virá do servidor um dia.
//   Campos obrigatórios: id, titulo, categoria, frequencia, status,
//   streakDias, criadoEm. Escolha os tipos com cuidado — você vai
//   justificar pelo menos uma dessas escolhas no README.
// ============================================================
export interface Habito {
  id: string;
  titulo: string;
  categoria: CategoriaHabito;
  frequencia: FrequenciaHabito;
  status: StatusHabito;
  streakDias: number;
  criadoEm: string;
}

// ============================================================
// TODO A1.3 — Tipos DERIVADOS. Use utility types; não redigite campos.
//   NovoHabito         → o que o formulário de criação envia
//                        (sem id, status, streakDias e criadoEm — o servidor gera)
//   ResumoHabito       → o que o card da tela precisa (id, titulo, status, categoria)
//   AtualizacaoHabito  → edição parcial
// ============================================================
export type NovoHabito = Omit<Habito, 'id' | 'status' | 'streakDias' | 'criadoEm'>;
export type ResumoHabito = Pick<Habito, 'id' | 'titulo' | 'status' | 'categoria'>;
export type AtualizacaoHabito = Partial<Habito>;

// ============================================================
// TODO A1.4 — União discriminada para o estado da tela.
//   Três variantes, discriminadas pelo campo `tipo`:
//     'carregando'  → nenhum outro campo
//     'sucesso'     → dados: T
//     'erro'        → mensagem: string
// ============================================================
export type EstadoTela<T> =
  | { tipo: 'carregando' }
  | { tipo: 'sucesso'; dados: T }
  | { tipo: 'erro'; mensagem: string };

// ============================================================
// TODO A1.5 — Rótulo legível de status, com switch exaustivo e SEM `default`.
//   O `default` satisfaz o compilador e desliga exatamente a verificação
//   que torna este switch útil.
// ============================================================
export function rotuloStatus(status: StatusHabito): string {
  switch (status) {
    case 'pendente':
      return 'Pendente';
    case 'concluido':
      return 'Concluído';
    case 'pulado':
      return 'Pulado';
  }
}
