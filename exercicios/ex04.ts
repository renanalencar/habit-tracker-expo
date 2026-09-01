/**
 * Exercício 4 — União discriminada para estado de tela
 * Enunciado completo em `exercises.md` da Aula 1.
 *
 * O jeito frágil, que você NÃO vai usar:
 *   let carregando = true;
 *   let habito: Habito | null = null;
 *   let erro: string | null = null;
 * Nada impede: carregando = true E erro = 'falhou' E habito = {...}
 */

import type { Habito } from './ex03';

// TODO 4.1 — declare EstadoTela<T> como união discriminada pelo campo `tipo`,
//   com exatamente três variantes:
//     'carregando'  → nenhum outro campo
//     'sucesso'     → dados: T
//     'erro'        → mensagem: string
export type EstadoTela<T> =
  | { tipo: 'carregando' }
  | { tipo: 'sucesso'; dados: T }
  | { tipo: 'erro'; mensagem: string };

// TODO 4.2 — complete o switch. Dentro de cada case, use SOMENTE os campos
//   que existem naquela variante. Sem `default`.
export function descreverTela(estado: EstadoTela<Habito>): string {
  switch (estado.tipo) {
    case 'carregando': return "Carregando...";
    case 'sucesso': return JSON.stringify(estado.dados);
    case 'erro': return estado.mensagem;
  }
  // throw new Error('TODO 4.2 — implemente descreverTela()');
}

// ============================================================
// VERIFICAÇÃO — não apague.
// ============================================================
declare const habitoExemplo: Habito;

// Depois do TODO 4.1, estas TRÊS DEVEM compilar — descomente:
descreverTela({ tipo: 'carregando' });
descreverTela({ tipo: 'sucesso', dados: habitoExemplo });
descreverTela({ tipo: 'erro', mensagem: 'Sem conexão' });

// E estas TRÊS DEVEM dar erro — descomente uma de cada vez:
// descreverTela({ tipo: 'carregando', dados: habitoExemplo });
// descreverTela({ tipo: 'erro', dados: habitoExemplo });
// descreverTela({ tipo: 'processando' });

// ============================================================
// PERGUNTA — responda aqui mesmo, em uma linha.
// Por que o campo `tipo` precisa ser um LITERAL em cada variante,
// e não `tipo: string`?
// R:
// ============================================================
