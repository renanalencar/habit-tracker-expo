/**
 * Atividade 1 — arquivo 2 de 3: a camada de dados falsa.
 *
 * Enunciado completo em `exercises.md` da Aula 1.
 *
 * A ideia: esta função tem a MESMA assinatura que teria uma chamada HTTP real.
 * Quando o backend existir, o corpo muda e nada mais no app precisa mudar.
 */

import type { Habito } from '../types/habito';

/**
 * Deixe esta constante no código para o professor conseguir testar o
 * caminho de erro sem editar mais nada. Vire para `true` quando quiser
 * ver o estado de erro da tela.
 */
const SIMULAR_ERRO = false;

/** Atraso artificial, para o estado de "carregando" ser visível. */
const ATRASO_MS = 1000;

// ============================================================
// TODO A1.6 — declare o hábito mockado.
//   Ele precisa satisfazer `Habito` INTEIRO. Não use `as` para escapar
//   de campos faltando — se o compilador reclamar, ele está certo.
// ============================================================
const MOCK: Habito = {
  // ← escreva os campos aqui
};

/**
 * Devolve UM hábito — o do dia. Não é uma lista: listas chegam nas
 * próximas aulas.
 */
export async function buscarHabitoDoDia(): Promise<Habito> {
  // TODO A1.7 — espere ATRASO_MS antes de responder.
  //   Dica: await new Promise((r) => setTimeout(r, ATRASO_MS));

  // TODO A1.8 — se SIMULAR_ERRO for true, lance um Error com uma mensagem
  //   legível para o usuário final — não um stack trace.

  // TODO A1.9 — devolva o MOCK.

  throw new Error('TODO A1.7 a A1.9 — implemente buscarHabitoDoDia()');
}
