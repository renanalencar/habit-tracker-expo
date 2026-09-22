// Atividade 1 · Aula 5 — transformação de dado. SEM JSX e SEM chamada de sensor aqui.
//
// Função pura: mesma entrada, mesma saída, nenhum estado. É por isso que ela mora em
// `lib/` e não dentro da tela — mesma separação de responsabilidade cobrada na Aula 4.
import type { LocalHabito } from '../types/habito';

/**
 * Texto legível para HUMANOS, com o raio de precisão.
 *
 * É esta função que o `CardHabito` (TODO 5.1) chama. Pense em duas coisas antes de
 * escrever:
 *   - quantas casas decimais de latitude/longitude um humano consegue usar? (Dica: cada
 *     casa decimal vale ~11 m no equador, e o próprio GPS erra mais do que isso.)
 *   - o raio de precisão precisa aparecer SEMPRE, ou só quando for ruim?
 */
export function formatarLocal(local: LocalHabito): string {
  // TODO 5.2: devolva o texto legível — coordenada arredondada E o raio em metros.
  //          Enquanto não estiver pronto, devolver string vazia mantém o app rodando.
  return '';
}
