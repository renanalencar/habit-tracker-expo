/**
 * Exercício 6 — `unknown` e type guard no lugar de `as`
 * Enunciado completo em `exercises.md` da Aula 1.
 */

export type StatusHabito = 'pendente' | 'concluido' | 'pulado';

export interface Habito {
  id: string;
  titulo: string;
  status: StatusHabito;
}

// ❌ Ponto de partida: uma mentira contada ao compilador.
//    Isto compila, não verifica nada, e explode em runtime.
export function lerHabitoRuim(json: unknown): Habito {
  return json as Habito;
}

// TODO 6.1 — escreva um type guard de verdade.
//   Dica: comece por `typeof valor === 'object' && valor !== null`
//   e depois verifique 'id', 'titulo' e 'status' com o operador `in`.
export function ehHabito(valor: unknown): valor is Habito {
  if (typeof valor === 'object' && valor != null) {
    if ('id' in valor && 'titulo' in valor && 'status' in valor) {
      return true;
    }
  }
  return false;
  // throw new Error('TODO 6.1 — implemente ehHabito()');
}

// TODO 6.2 — reescreva a leitura usando o type guard.
//   Se o valor não for um Habito, lance um Error com mensagem clara.
export function lerHabito(json: unknown): Habito {
  if (ehHabito(json)) return json;
  throw new Error("JSON inválido")
}

// TODO 6.3 — em UMA linha aqui embaixo, explique por que `as Habito`
//   não teria pego o problema.
// R:

// ============================================================
// VERIFICAÇÃO — não apague.
// Depois dos TODO, descomente e rode: npx tsx exercicios/ex06.ts
// ============================================================

console.log(ehHabito({ id: 'h1', titulo: 'Água', status: 'pendente' })); // true
console.log(ehHabito({ id: 'h1' }));                                     // false
console.log(ehHabito(null));                                             // false
console.log(ehHabito('h1'));                                             // false

// DEVE lançar Error, não devolver um objeto quebrado:
// lerHabito({ nada: 'a ver' });
