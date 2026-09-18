// Atividade 1 · Aula 4 — transformação de dado. SEM JSX aqui dentro.
//
// Estas duas funções são puras: mesma entrada, mesma saída, nenhum estado.
// É por isso que elas moram em `lib/` e não dentro do componente de tela — e é um
// dos critérios de avaliação da atividade ("Separação de responsabilidade").
import type { Habito } from '../types/habito';

export type Secao = { title: string; data: Habito[] };

export function agrupar(habitos: Habito[]): Secao[] {
  // TODO 44: agrupe pelo critério que o grupo escolheu (status, período do dia ou categoria).
  //          Cada seção precisa do campo `data` (é o nome que a SectionList exige)
  //          e de um título legível para o usuário.
  // TODO 45: descarte os grupos vazios. Um cabeçalho de seção sem nenhum item embaixo
  //          é ruído na tela.
  // TODO 46: a ordem dos grupos é uma DECISÃO, não um efeito colateral do `Object.keys`.
  //          Escreva num comentário aqui qual foi a ordem escolhida e por quê.
  return [];
}

export function filtrarPorTitulo(habitos: Habito[], busca: string): Habito[] {
  // TODO 47: busca por título, SEM diferenciar maiúscula de minúscula.
  //          Busca vazia (ou só espaços) devolve tudo — e não uma lista vazia,
  //          senão o primeiro acesso já cai no estado "nada encontrado".
  return habitos;
}
