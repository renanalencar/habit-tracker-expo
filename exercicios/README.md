# Exercícios guiados — Aula 1

Esqueletos dos **Exercícios 3 a 6** de `exercises.md` (Aula 1). São **TypeScript puro**: não usam React Native, não precisam do Expo e não fazem parte do app.

Os Exercícios 1 e 2 são no papel — não têm arquivo aqui.

## Como rodar

Da **raiz do projeto**:

```bash
npx tsc --noEmit -p exercicios     # verifica os quatro arquivos
npx tsx exercicios/ex06.ts         # executa (só o Ex. 6 tem saída no console)
```

Esta pasta tem `tsconfig.json` próprio e está fora do `tsconfig.json` do app — assim os erros propositais daqui nunca quebram a verificação de tipos do aplicativo.

## Como funciona o esqueleto

- Onde houver `never` com o comentário `← substitua`, é sua vez de escrever.
- Onde houver um `throw new Error('TODO ...')`, substitua o corpo inteiro da função.
- Os blocos marcados como **VERIFICAÇÃO** não devem ser apagados. Eles vêm comentados: descomente **uma linha de cada vez** e confirme o comportamento descrito ao lado.

Atenção a um detalhe que confunde: parte das linhas de verificação **precisa dar erro de compilação**. Quando o compilador reclama delas, o exercício está certo — não errado. Cada linha diz qual é o comportamento esperado.

## Estado inicial

No estado inicial, `npx tsc --noEmit -p exercicios` passa limpo. Conforme você substitui os `never` pelos tipos de verdade, o compilador começa a cobrar as implementações que faltam — é assim que ele guia o exercício.

## Gabaritos

No final de `exercises.md`, em seções colapsadas. Tente antes de abrir.
