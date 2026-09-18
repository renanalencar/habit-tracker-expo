# Auditoria de lista — TelaHabitos

> **Atividade Aplicada 2 · Aula 4** — Nível ⭐⭐ · ~1 h
>
> **Contexto:** você entrou num time e pegou esta tela. Ela **funciona** — em
> desenvolvimento, com o mock de 8 itens. Em produção são 4 000, e o time reclama
> que "a tela de hábitos trava e às vezes não atualiza".
>
> **Não reescreva o arquivo inteiro.** O exercício é diagnosticar e priorizar, não digitar.
> O código auditado está em `aula-04-pressable-listas/exercises.md`, Atividade 2.

## 1. Problemas encontrados

<!-- TODO 74: no mínimo 8 linhas.
     Um "problema" precisa ter SINTOMA — se você não consegue descrever o que o
     usuário vê, provavelmente é preferência sua, não um defeito. -->

| # | Trecho | Problema | Sintoma para o usuário | Correção |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |

## 2. O problema arquitetural

<!-- TODO 75: um dos problemas da tabela acima anula o benefício de um componente inteiro.
     Qual é, e por que ele é mais grave que os outros sete juntos? -->

## 3. Os três ajustes de desempenho deste arquivo

<!-- TODO 76: `removeClippedSubviews`, `windowSize` e `initialNumToRender` foram mexidos.
     Para CADA um: qual era o default, o que a mudança causa, e por que ela NÃO resolve
     o problema real desta tela. -->

| Prop | Default | O que a mudança causa | Por que não resolve |
|---|---|---|---|
| `removeClippedSubviews` | | | |
| `windowSize` | | | |
| `initialNumToRender` | | | |

## 4. O bug de "às vezes não atualiza"

<!-- TODO 77: explique a causa exata usando a palavra que a documentação usa para
     descrever o comportamento da FlatList. Dê as duas correções possíveis e escolha uma. -->

## 5. Ordem de refatoração — tenho meio dia

<!-- TODO 78: justifique por RISCO e RETORNO.
     A ordem em que os problemas aparecem no arquivo NÃO é uma justificativa. -->

| Ordem | O que faço | Risco se não fizer | Retorno |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 6. O que eu decidi NÃO corrigir

<!-- TODO 79: um item, com o motivo. Toda auditoria honesta tem esse parágrafo. -->
