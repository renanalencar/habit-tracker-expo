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
