# Exercícios guiados — Aula 4 (Pressable, FlatList e SectionList)

Esqueletos da **Parte 1** de `aula-04-pressable-listas/exercises.md`.

O enunciado manda fazer os Exercícios 3 a 7 num projeto de sandbox descartável. Aqui eles
vivem em `exercicios/aula-04/`, **fora** do `tsconfig.json` do app — não entram no build
do Expo e não atrapalham a Atividade 1, que é a entrega de verdade e mora em `src/`.

## Os arquivos

| Arquivo | Exercício | TODOs |
|---|---|---|
| `respostas/ex-01-associacao.md` | 1 — Associação: qual prop resolve o sintoma | 1 – 4 |
| `respostas/ex-02-caca-ao-erro.md` | 2 — Caça ao erro | 5 – 6 |
| `ex-03-botao-acao.tsx` | 3 — Reproduza: o botão tocável com feedback | 7 – 14 |
| `ex-04-lab-toque.tsx` | 4 — Previsão: o ciclo de vida do toque | 15 – 17 |
| `ex-05-lista-habitos.tsx` | 5 — Complete: a `FlatList` inteira | 18 – 26 |
| `ex-06-secoes-habitos.tsx` | 6 — Complete: `SectionList` a partir de dados planos | 27 – 38 |
| `ex-07-lista-nao-atualiza.tsx` | 7 — Corrija: a lista que não atualiza | 39 – 42 |
| `dados-mock.ts` | mock compartilhado pelos Exercícios 5, 6 e 7 | — |

A numeração é **contínua entre os arquivos** e segue para `src/` (TODOs 43 – 73, a
Atividade 1) e para os relatórios na raiz (74 – 82). Veja a tabela completa no
`README.md` do projeto.

## Como rodar

Não há navegação no projeto (isso é Aula 6). Cada exercício tem um `export default`
próprio; para ver um deles na tela, troque **temporariamente** o conteúdo renderizado
dentro de `<View style={styles.conteudo}>` em `App.tsx`:

```tsx
import TelaHabitos from './exercicios/aula-04/ex-05-lista-habitos';
// ...
<View style={styles.conteudo}>
  <TelaHabitos />
</View>
```

E desfaça a troca antes de commitar.

Para verificar os tipos destes arquivos (eles têm `tsconfig.json` próprio):

```bash
npx tsc --noEmit -p exercicios/aula-04
```

O estado inicial passa limpo. Os esqueletos são **incompletos, não quebrados**: onde
falta a implementação há um valor de espera (`null`, `[]`, o array devolvido sem mudança)
que compila e roda — mas não faz o que o exercício pede.

## Regras de escrita (valem para todos os arquivos)

As cinco primeiras vêm da Aula 3 e continuam valendo; as três últimas são desta aula.

1. **Sem `JSX.Element`** como tipo de retorno. Não anote o retorno; o TypeScript infere.
2. **Sem `as const`** dentro de `StyleSheet.create`. Em `theme.ts`, sim.
3. **`gap`** (ou `ItemSeparatorComponent`) para espaçar irmãos, nunca `margin` em cada filho.
4. **`boxShadow`** para sombra, não o quarteto `shadow*` + `elevation`.
5. **Zero `any`.**
6. **A ação vai em `onPress`**, nunca em `onPressIn`. Feedback visual vai no `pressed`.
7. **`renderItem` declarado fora do componente**, sempre que não depender de estado local.
8. **Toda lista tem `ListEmptyComponent`.** Sem exceção — inclusive as dos exercícios.

> **Não use nas entregas:** componentes de toque que não sejam o `Pressable`, bibliotecas
> de lista de terceiros, animação, gestos, navegação e chamadas de rede. Todos eles ou já
> foram substituídos por algo melhor, ou ainda vão chegar na disciplina.

> **Apague o comentário `// TODO` quando resolver aquele ponto.** Um arquivo sem nenhum
> `TODO` é um exercício concluído — é assim que o professor confere rápido quem parou onde.
