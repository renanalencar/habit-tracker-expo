/**
 * Exercício 3 — Do `string` ao cardápio fechado
 * Enunciado completo em `exercises.md` da Aula 1.
 *
 * Ponto de partida: tudo é `string`, e por isso qualquer erro de digitação compila.
 */

// TODO 3.1 — declare StatusHabito como union de literais:
//            'pendente' | 'concluido' | 'pulado'
export type StatusHabito = 'pendente' | 'concluido' | 'pulado'; // ← substitua `never`

// TODO 3.2 — declare CategoriaHabito como union de literais:
//            'saude' | 'produtividade' | 'mentalidade' | 'sono'
export type CategoriaHabito = 'saude' | 'produtividade' | 'mentalidade' | 'sono'; // ← substitua `never`

export interface Habito {
  id: string;
  titulo: string;
  categoria: CategoriaHabito; // TODO 3.3 — troque por CategoriaHabito
  status: StatusHabito; // TODO 3.3 — troque por StatusHabito
}

// TODO 3.4 — complete com um `case` para cada status.
//   NÃO escreva um `default` — o objetivo é justamente deixar o
//   compilador cobrar os casos que faltam.
export function rotuloStatus(status: StatusHabito): string {
  switch (status) {
    case 'concluido': return "Concluído";
    case 'pendente': return "Pendente";
    case 'pulado': return "Pulado";
  }
  // throw new Error('TODO 3.4 — implemente rotuloStatus()');
}

// ============================================================
// VERIFICAÇÃO — não apague.
// Descomente uma linha de cada vez e confirme o comportamento descrito.
// ============================================================
declare const h: Habito;

// Depois do TODO 3.3, estas TRÊS linhas DEVEM dar erro de compilação:
// h.status = 'conclído';      // erro de digitação
// h.status = 'Pendente';      // maiúscula
// h.categoria = 'financas';   // categoria que ninguém combinou

// E esta DEVE continuar compilando:
h.status = 'concluido';

// ============================================================
// DEPOIS DE FAZER COMPILAR
// Acrescente 'atrasado' ao StatusHabito SEM tocar em rotuloStatus.
// Rode `npx tsc --noEmit -p exercicios` de novo.
// O que o compilador diz? Por que isso é uma boa notícia?
// R:
// ============================================================
