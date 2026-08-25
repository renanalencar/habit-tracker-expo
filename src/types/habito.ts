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
export type StatusHabito = never; // ← substitua `never`
export type CategoriaHabito = never; // ← substitua `never`
export type FrequenciaHabito = never; // ← substitua `never`

// ============================================================
// TODO A1.2 — A entidade completa, como ela virá do servidor um dia.
//   Campos obrigatórios: id, titulo, categoria, frequencia, status,
//   streakDias, criadoEm. Escolha os tipos com cuidado — você vai
//   justificar pelo menos uma dessas escolhas no README.
// ============================================================
export interface Habito {
  // ← escreva os campos aqui
}

// ============================================================
// TODO A1.3 — Tipos DERIVADOS. Use utility types; não redigite campos.
//   NovoHabito         → o que o formulário de criação envia
//                        (sem id, status, streakDias e criadoEm — o servidor gera)
//   ResumoHabito       → o que o card da tela precisa (id, titulo, status, categoria)
//   AtualizacaoHabito  → edição parcial
// ============================================================
export type NovoHabito = never; // ← substitua `never`
export type ResumoHabito = never; // ← substitua `never`
export type AtualizacaoHabito = never; // ← substitua `never`

// ============================================================
// TODO A1.4 — União discriminada para o estado da tela.
//   Três variantes, discriminadas pelo campo `tipo`:
//     'carregando'  → nenhum outro campo
//     'sucesso'     → dados: T
//     'erro'        → mensagem: string
// ============================================================
export type EstadoTela<T> = never; // ← substitua `never`

// ============================================================
// TODO A1.5 — Rótulo legível de status, com switch exaustivo e SEM `default`.
//   O `default` satisfaz o compilador e desliga exatamente a verificação
//   que torna este switch útil.
// ============================================================
export function rotuloStatus(status: StatusHabito): string {
  throw new Error('TODO A1.5 — implemente rotuloStatus()');
}
