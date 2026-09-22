# Habit Tracker Expo

**Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
**Branch:** `feature/01_aula_intro`

## Sobre o projeto

Rastreador de Micro-hábitos e Condicionamento Físico: um aplicativo voltado para rotina e bem-estar, onde o usuário registra pequenos hábitos diários e monitora suas atividades físicas e treinos.

Este projeto é usado nas atividades guiadas e aplicadas da disciplina ao longo do semestre. Cada aula adiciona uma camada nova por cima da anterior — o histórico de commits desta branch é, em si, um registro do progresso.

## Estado atual — Aula 1

Scaffold do Expo (`create-expo-app`, template `blank-typescript`) mais os **esqueletos** das atividades da Aula 1. Nenhuma modelagem de domínio está implementada: os arquivos existem com comentários `TODO` no lugar do código que é sua tarefa escrever.

| Onde | O que é | Referência em `exercises.md` |
|---|---|---|
| `exercicios/ex03.ts` … `ex06.ts` | Exercícios guiados, TypeScript puro, fora do app | Exercícios 3 a 6 |
| `src/types/habito.ts` | Modelagem do domínio | Atividade 1 · TODO A1.1 – A1.5 |
| `src/services/habitoService.ts` | Camada de dados falsa | Atividade 1 · TODO A1.6 – A1.9 |
| `App.tsx` | Tela do hábito do dia | Atividade 1 · TODO A1.10 – A1.14 |

> ⏳ **Ordem sugerida.** Os TODO **A1.1 a A1.9** são TypeScript puro e podem ser feitos logo após a Aula 1. O `App.tsx` (**A1.10 a A1.14**) usa componentes de React Native, apresentados na **Aula 2** — deixe para depois dela.

## Como rodar

```bash
npm install
npx expo start
```

Abra o app **Expo Go** no celular e escaneie o QR code (ou use um emulador). Requisito: **Node.js 22.11+**.

Para verificar os tipos do app:

```bash
npx tsc --noEmit
```

Para verificar os exercícios guiados (que têm `tsconfig.json` próprio, fora do app):

```bash
npx tsc --noEmit -p exercicios
```

Nos dois casos, o estado inicial passa limpo. Conforme você substitui os `never` pelos tipos de verdade, o compilador passa a cobrar as implementações que faltam — é assim que ele guia a atividade.

## Como funciona o esqueleto

- Onde houver `never` com o comentário `← substitua`, é sua vez de escrever.
- Onde houver `throw new Error('TODO ...')`, substitua o corpo inteiro da função.
- Blocos marcados como **VERIFICAÇÃO** não devem ser apagados. Vêm comentados: descomente uma linha de cada vez e confirme o comportamento descrito ao lado. Parte delas **precisa dar erro de compilação** — quando o compilador reclama, o exercício está certo.

## Próximos passos

Resolva os `TODO` na ordem em que aparecem e mantenha **um commit por exercício** (ou por bloco), para que o histórico da branch sirva de evidência de progresso.

O conteúdo da Aula 2 (Core Components, props tipadas, `CardHabito`, `Cabecalho`) vive na branch `feature/02_aula_react_native`.

## Estado atual — Aula 3

Esqueletos da **Atividade 1** de `exercises.md` (Core Components — domínio `Habito`): sistema de tokens, um componente `Card` reutilizável e um formulário de criar/editar hábito. Os TODOs seguem a numeração do enunciado (1 a 24, contínua entre os três arquivos).

| Onde | O que é | Referência em `exercises.md` |
|---|---|---|
| `src/theme.ts` | Tokens de cor, espaço e tipografia | Atividade 1 · TODO 1 – 4 |
| `src/components/Card.tsx` | Card genérico reutilizável, com variante `destacado` | Atividade 1 · TODO 5 – 10 |
| `src/screens/HabitoForm.tsx` | Formulário de criar/editar `Habito` | Atividade 1 · TODO 11 – 24 |

Notas sobre o esqueleto desta aula:

- `Card.tsx` (o componente genérico do tema) é diferente de `CardHabito.tsx` (o card específico do domínio, da Aula 2) — os dois convivem no projeto, com responsabilidades diferentes.
- `HabitoForm.tsx` ainda não está ligado a nenhuma navegação — a Aula 3 não cobre isso. O próprio arquivo explica, em comentário, como pré-visualizá-lo temporariamente a partir de `App.tsx`.
- O estado inicial compila limpo (`npx tsc --noEmit`), mas está incompleto: `theme.ts` começa com tokens vazios de propósito, então não referencie `cores`/`espaco`/`tipografia` em código real antes de completá-los — só nos comentários `TODO`, como já está no esqueleto.
- A Atividade 2 (auditoria de estilo) é um relatório em Markdown, não código — não tem esqueleto neste repositório.

## Estado atual — Aula 4

Esqueletos da Aula 4 (**Pressable, FlatList e SectionList** — domínio `Habito`): os
exercícios guiados da Parte 1 e a **Atividade 1**, que transforma a tela da Aula 3 numa
lista de produto. Como na Aula 3, os TODOs seguem uma **numeração contínua entre todos os
arquivos** — de 1 a 82, na ordem em que se resolve.

| Onde | O que é | Referência em `exercises.md` | TODOs |
|---|---|---|---|
| `exercicios/aula-04/` | Exercícios guiados 1 a 7 (sandbox, fora do build do app) | Parte 1 | 1 – 42 |
| `src/data/habitos.ts` | O mock da lista — 20+ itens | Atividade 1 · esqueleto 1 | 43 |
| `src/lib/agrupar.ts` | `agrupar` e `filtrarPorTitulo` — funções puras, sem JSX | Atividade 1 · esqueleto 2 | 44 – 47 |
| `src/components/botao-acao.tsx` | O `BotaoAcao` reutilizável (o do Exercício 3) | Atividade 1 · item 5 | 48 – 50 |
| `src/components/item-habito.tsx` | O item tocável: toque curto alterna, longo remove | Atividade 1 · esqueleto 3 | 51 – 56 |
| `src/components/lista-vazia.tsx` | Os **dois** estados vazios, com textos diferentes | Atividade 1 · esqueleto 4 | 57 – 58 |
| `src/screens/tela-habitos.tsx` | A tela principal com `SectionList` e os quatro estados | Atividade 1 · esqueleto 5 | 59 – 70 |
| `README.md` (aqui, abaixo) | A seção "Decisões da Aula 4" | Atividade 1 · item 6 | 71 – 73 |
| `auditoria-lista.md` | Auditoria de lista em código alheio | Atividade 2 | 74 – 79 |
| `diff.md` | Refazer a lista da Aula 3 *(bônus, opcional)* | Atividade 3 | 80 – 82 |

Notas sobre o esqueleto desta aula:

- **Os exercícios guiados ficam fora do app.** `exercicios/aula-04/` tem `tsconfig.json`
  próprio e não entra no build do Expo — o enunciado pede um sandbox descartável, e é isso
  que ele é. A entrega avaliada é a Atividade 1, em `src/`.
- **Os arquivos da Aula 4 usam `kebab-case`**, como no enunciado (`item-habito.tsx`,
  `lista-vazia.tsx`). Os da Aula 2 e 3 estão em `PascalCase` — os dois convivem; não
  renomeie o que já existe só por consistência.
- **Nada foi ligado ao `App.tsx`.** `tela-habitos.tsx`, como o `HabitoForm.tsx` da Aula 3,
  ainda não tem navegação (isso é Aula 6). Cada arquivo explica em comentário como
  pré-visualizá-lo temporariamente.
- **O estado inicial compila limpo** (`npx tsc --noEmit` e
  `npx tsc --noEmit -p exercicios/aula-04`) e **roda**: onde falta implementação há um
  valor de espera (`null`, `[]`, o array devolvido sem mudança). Compila e roda, mas não
  faz o que o exercício pede — é isso que os TODOs cobram.
- `src/components/item-habito.tsx` é mais um card de hábito no projeto, ao lado de
  `CardHabito.tsx` (Aula 2) e `Card.tsx` (Aula 3). Ele não substitui nenhum dos dois: o
  TODO 55 pede justamente que o `Card` da Aula 3 seja reaproveitado por dentro dele.

## Decisões da Aula 4

> Seção exigida pela Atividade 1 (item 6). Responda **em texto corrido**, com critério —
> "porque é melhor" não é resposta.

**Por que `SectionList` e não `FlatList` neste caso?**

<!-- TODO 71: qual é o critério de agrupamento que vocês escolheram (status, período do
     dia ou categoria), e o que o agrupamento dá ao usuário que a lista plana não daria. -->

**Onde vocês agrupam os dados, e por que não é dentro do JSX?**

<!-- TODO 72: diga também em que ORDEM vocês filtram e agrupam (TODO 62), e por que essa
     ordem importa. -->

**O que acontece com o cabeçalho de seção em cada plataforma, e o que vocês decidiram?**

<!-- TODO 73: cite os defaults de iOS e Android e diga qual comportamento vocês fixaram
     no código — e por que deixar no default seria terceirizar uma decisão de produto. -->

## Estado atual — Aula 5

Esqueletos da Aula 5 (**sensores, GPS e câmera** — `expo-location`, `expo-sensors`,
`expo-camera`, `expo-image`): os exercícios guiados da Parte 1, a **Atividade 1** (a tela
"Registrar hábito"), a **Atividade 2** (auditoria) e a **Atividade 3** (bônus).

Os TODOs dos **exercícios guiados** seguem a numeração do enunciado (**1 a 24**). Os das
**atividades aplicadas** usam o prefixo da aula (**5.1 a 5.33**), como na Aula 4.

> 🔴 **Precisa de aparelho físico.** O iOS Simulator não tem câmera, acelerômetro nem
> giroscópio. O Android Emulator tem sensores virtuais e uma câmera de cena virtual —
> serve para testar o fluxo, não a experiência. Traga o celular carregado, com o Expo Go
> instalado e o cabo.

| Onde | O que é | Referência em `exercises.md` | TODOs |
|---|---|---|---|
| `exercicios/aula-05/respostas/ex-01-associacao.md` | Qual pacote e qual função, 14 situações | Exercício 1 | tabela em branco |
| `exercicios/aula-05/respostas/ex-02-caca-ao-erro.md` | Os 7 problemas da tela de câmera de 2023 | Exercício 2 | 7 lacunas |
| `exercicios/aula-05/ex-03-onde-eu-estou.tsx` | GPS com os três caminhos de falha | Exercício 3 | 1 – 6 |
| `exercicios/aula-05/ex-04-chacoalhada.tsx` | Acelerômetro e magnitude do vetor | Exercício 4 | 6 – 10 |
| `exercicios/aula-05/ex-05-camera-previa.tsx` | `CameraView` e os três estados de permissão | Exercício 5 | 11 – 17 |
| `exercicios/aula-05/ex-06-giroscopio.tsx` | Giroscópio *(casa)* | Exercício 6 | 18 – 22 |
| `exercicios/aula-05/ex-07-galeria-que-pisca.tsx` | Os 4 defeitos de imagem *(casa)* | Exercício 7 | 23 – 24 |
| `src/types/habito.ts` | `LocalHabito` + os campos opcionais `local` e `fotoUri` | Atividade 1 · esqueleto 1 | — (dado) |
| `src/components/CardHabito.tsx` | Miniatura da foto e o local no card | Atividade 1 · esqueleto 2 | 5.1 |
| `src/lib/formatar-local.ts` | `formatarLocal()` — função pura, sem JSX e sem sensor | Atividade 1 · item 1 | 5.2 |
| `src/services/localizacao.ts` | A camada que fala com o GPS e devolve a falha exata | Atividade 1 · itens 1 e 4 | 5.3 – 5.8 |
| `src/components/camera-habito.tsx` | A câmera, com os três estados de permissão | Atividade 1 · item 2 | 5.9 – 5.14 |
| `src/screens/tela-registrar-habito.tsx` | A tela "Registrar hábito" | Atividade 1 | 5.15 – 5.20 |
| `src/screens/tela-habitos.tsx` | Abre o registro por condicional e recebe o hábito novo | Atividade 1 · item 3 | 5.21 – 5.22 |
| `src/components/item-habito.tsx` | Repassa foto, local e `recyclingKey` ao card | Atividade 1 · item 3 | 5.23 |
| `README.md` (aqui, abaixo) | A seção "Decisões da Aula 5" | Atividade 1 · critérios | 5.24 – 5.27 |
| `auditoria-aula5.md` | Auditoria da `TelaTreino` | Atividade 2 | esqueleto do relatório |
| `src/screens/tela-nivel-bolha.tsx` | O nível de bolha *(bônus, opcional)* | Atividade 3 | 5.28 – 5.33 |

Notas sobre o esqueleto desta aula:

- **Os exercícios guiados ficam fora do app.** `exercicios/aula-05/` tem `tsconfig.json`
  próprio e não entra no build do Expo (`npx tsc --noEmit -p exercicios/aula-05`). Cada um
  pode ser pré-visualizado descomentando a linha correspondente em `App.tsx`.
- **Os Exercícios 1 e 2 são no papel**, e por isso viram Markdown em
  `exercicios/aula-05/respostas/` — mesma convenção da Aula 4.
- **O estado inicial compila limpo e roda**, mas não faz o que o exercício pede: onde
  falta implementação há um valor de espera (uma string vazia, um `return` de falha, uma
  posição fixa da bolha). É isso que os TODOs cobram.
- **`app.json` já tem as descrições de permissão** (`infoPlist` do iOS, `permissions` do
  Android) e os plugins de `expo-location`, `expo-camera` e `expo-sensors`. No Expo Go elas
  não são obrigatórias; num build de verdade, a ausência delas reprova na App Store.
- **O contrato de três tempos aparece em branco** no topo de cada arquivo que usa sensor.
  Preenchê-lo vale 25% da nota da Atividade 1 — não é comentário decorativo.

## Decisões da Aula 5

> Seção exigida pela Atividade 1 (critérios "Uso correto das APIs" e "Honestidade
> técnica"). Responda **em texto corrido**, com critério — "porque é melhor" não é
> resposta.

**Qual `Accuracy` vocês escolheram, e por quê?**

<!-- TODO 5.24: diga qual nível vocês usaram no `getCurrentPositionAsync` e o que ele
     custa em bateria e em tempo de espera comparado ao nível acima e ao abaixo.
     Lembre qual é a pergunta que o campo precisa responder: "em que academia o treino
     aconteceu". Diga também como o `accuracy` devolvido aparece na tela. -->

**Os cinco estados de falha: qual mensagem cada um mostra, e o que o usuário faz depois?**

<!-- TODO 5.25: liste os cinco (localização negada, localização bloqueada, serviço
     desligado, câmera negada, hardware indisponível). Para cada um, a AÇÃO que a
     mensagem pede do usuário. Se duas mensagens pedem a mesma ação, uma das duas
     está errada. -->

**O que o app faz quando o usuário nega tudo?**

<!-- TODO 5.26: descreva o que acontece na tela de registro e na lista quando não há nem
     foto nem local. Diga também por que os dois campos são opcionais no tipo. -->

**Limitações assumidas**

<!-- TODO 5.27: declare o que vocês NÃO resolveram, e por quê. No mínimo:
     - se algum arquivo abre uma assinatura de sensor, o enunciado exige a frase
       "esta assinatura não é encerrada ao sair da tela, porque a ferramenta para isso é
       assunto da Aula 6";
     - onde a foto vive (cache do app, não galeria) e o que acontece se o sistema limpar
       o cache;
     - o que mais vocês souberem que está frágil.
     Reconhecer a limitação vale ponto; escondê-la desconta. -->

### Aula 5 — Giroscópio x acelerômetro *(resposta escrita do Exercício 6)*

<!-- Com o app rodando e o GIROSCÓPIO ligado, deixe o telefone parado na mesa e anote os
     valores. Depois faça o mesmo teste com o ACELERÔMETRO (Exercício 4, mostrando a
     magnitude na tela em vez do booleano).

     Explique, em 3 a 5 linhas: por que um zera e o outro não? E o que isso permite fazer
     com o acelerômetro que não dá para fazer com o giroscópio?

     Cuidado com o erro comum: o valor que o acelerômetro marca parado NÃO é ruído. -->
