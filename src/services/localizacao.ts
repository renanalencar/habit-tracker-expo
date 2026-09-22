// Atividade 1 · Aula 5 — a camada que fala com o GPS.
//
// A tela NÃO chama `expo-location` diretamente: ela chama `obterLocalAtual()` e recebe de
// volta um resultado que ou tem o local, ou tem o MOTIVO exato da falha. Assim a decisão
// de qual mensagem mostrar vira um acesso a um `Record` fechado, e o TypeScript passa a
// cobrar que você trate todos os casos.
//
// TODO 5.3: preencha o contrato de três tempos DESTE arquivo. Ele vale nota.
// 1. PEDIR   → ______________________________
// 2. LER     → ______________________________
// 3. PARAR   → ______________________________  (ou: "não se aplica, porque ___")

import type { LocalHabito } from '../types/habito';

/**
 * Os caminhos de falha do GPS. São quatro e não um porque as AÇÕES que o usuário precisa
 * tomar são quatro diferentes.
 */
export type FalhaLocal =
  | 'permissao-negada'
  | 'permissao-bloqueada'
  | 'servico-desligado'
  | 'hardware-indisponivel';

export type ResultadoLocal =
  | { ok: true; local: LocalHabito }
  | { ok: false; falha: FalhaLocal };

export const MENSAGENS_FALHA_LOCAL: Record<FalhaLocal, string> = {
  // TODO 5.4: escreva as quatro mensagens. Elas precisam ser DIFERENTES entre si e dizer
  //          ao usuário O QUE ELE PODE FAZER. "Erro ao obter localização" nas quatro é
  //          exatamente o que este exercício existe para evitar.
  //          Pergunte-se, para cada uma: qual é o próximo toque de dedo do usuário?
  'permissao-negada': '',
  'permissao-bloqueada': '',
  'servico-desligado': '',
  'hardware-indisponivel': '',
};

// TODO 5.5: escolha a Accuracy e JUSTIFIQUE aqui em comentário.
//          O objetivo do campo é responder "em que academia o treino aconteceu".
//          Quanto custa, em bateria e em tempo de espera, cada nível acima do necessário?
//          A justificativa também vai para o README (TODO 5.24).
// const PRECISAO_ESCOLHIDA = Location.Accuracy.???;

export async function obterLocalAtual(): Promise<ResultadoLocal> {
  // TODO 5.6: peça a permissão de foreground.
  //          Se não for concedida, decida entre 'permissao-negada' e 'permissao-bloqueada'
  //          usando o campo certo da resposta, e devolva { ok: false, falha }.

  // TODO 5.7: confira se o SERVIÇO de localização está ligado. Permissão concedida com o
  //          GPS desligado é situação cotidiana, e é uma checagem SEPARADA — a ação do
  //          usuário é outra.

  // TODO 5.8: leia a posição com a Accuracy do TODO 5.5 e monte o LocalHabito.
  //          Atenção: `coords.accuracy` é `number | null`.
  //          Embrulhe a leitura de forma que um aparelho sem GPS caia em
  //          'hardware-indisponivel' em vez de derrubar a tela.

  // Valor de espera: mantém o arquivo compilando enquanto os TODOs acima não existem.
  return { ok: false, falha: 'hardware-indisponivel' };
}
