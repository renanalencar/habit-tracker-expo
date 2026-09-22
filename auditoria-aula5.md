# Auditoria — TelaTreino

> Atividade 2 · Aula 5 — Desenvolvimento Mobile (2026.2.DM), CESAR School.
>
> Escopo: a `TelaTreino` recebida para manutenção. **Não é para consertar o código** — é
> para diagnosticar, priorizar e justificar. Ela funciona no aparelho de quem escreveu, e
> é justamente por isso que ninguém percebeu o que está abaixo.

## 1. Problemas de permissão

| # | Sintoma para o usuário | Causa no código | Correção |
|---|---|---|---|
| 1 | Toca em "Iniciar treino", nega a permissão, e o app **segue em frente como se nada tivesse acontecido** — a tela fica vazia para sempre, sem dizer por quê | o retorno de `requestForegroundPermissionsAsync()` é **descartado**: ninguém olha o `status` | guardar a resposta, checar `status !== 'granted'` e sair com mensagem antes de chamar `getCurrentPositionAsync` |
| 2 | Quem negou uma vez **nunca mais vê o diálogo**, nem depois de conceder a permissão pelas Configurações do sistema | a variável de módulo `jaPediuPermissao` "lembra" para sempre e trava o pedido | remover a variável: permissão é **estado do sistema operacional**, não do seu módulo — perguntar de novo é barato e o sistema é quem decide se mostra o diálogo |
| 3 | Com o GPS do aparelho desligado, a tela fica **em branco para sempre**, mesmo com a permissão concedida | não existe `hasServicesEnabledAsync()` em lugar nenhum | checar o serviço **separadamente**, com mensagem própria: a ação do usuário é ligar o GPS, não reautorizar o app |
| 4 | Quem marcou "não perguntar de novo" recebe (na melhor das hipóteses) uma mensagem mandando tocar num botão que **nunca mais vai funcionar** | `canAskAgain` nunca é consultado | usar `canAskAgain` para escolher entre "toque de novo" e "abra as Configurações" |
| 5 | Quem só quer ver a tela já é interrompido por um diálogo de GPS antes de qualquer coisa | o pedido acontece no mesmo toque que dispara tudo, sem nenhuma explicação prévia | explicar **antes** de pedir — o diálogo do sistema tem uma chance só |

## 2. Vazamentos

**Quais torneiras ficam abertas:** as duas que o arquivo abre. `watchPositionAsync` e
`Accelerometer.addListener` **nunca** são encerrados — não existe um único `remove()` no
arquivo, e a assinatura do `watchPositionAsync` nem sequer é guardada numa variável, então
ela é **inalcançável**: mesmo que alguém quisesse fechá-la depois, não teria como.

**O que acontece se o usuário tocar em "Iniciar treino" cinco vezes:** `iniciarTreino` não
tem nenhuma guarda. Cinco toques = **cinco assinaturas de GPS e cinco de acelerômetro**,
todas ativas ao mesmo tempo, todas chamando `setState`. O contador de passos passa a subir
de 5 em 5, e a lista de registros ganha cinco entradas por atualização de posição. É o tipo
de bug que o usuário descreve como "o app ficou doido" e que ninguém reproduz na mesa,
porque na mesa se toca uma vez.

**Bateria e memória:** o GPS continua ligado com o app em outra tela — nada desliga ao
sair, e o `expo-location` mantém o hardware ativo enquanto houver assinatura. Cada callback
segura o closure com os `setState` da tela, então nem o componente nem os registros
acumulados são liberados. Com `Accuracy.Highest` e sem `distanceInterval`, isso é o pior
caso possível de consumo contínuo.

## 3. Consumo de bateria — três decisões

1. **`Accuracy.BestForNavigation` para uma leitura pontual.** É o nível mais caro que
   existe e foi feito para navegação turn-by-turn em movimento. Para "onde o treino
   começou", `Balanced` (~100 m) responde igual, gastando uma fração da bateria e fixando
   sinal em menos tempo.
2. **`Accuracy.Highest` no `watchPositionAsync`, sem `distanceInterval`.** O app recebe
   atualizações no ritmo máximo do hardware, parado ou andando. O correto é declarar
   `distanceInterval` (por exemplo, 10 m) e baixar a `accuracy` — ⚠️ cuidado ao propor a
   correção: **`timeInterval` é Android-only**; só o `distanceInterval` resolve nas duas
   plataformas.
3. **`setUpdateInterval(16)` no acelerômetro** = ~60 leituras e ~60 `setState` por segundo,
   numa tela que tem uma `FlatList` montada. Para contar passos, 100 ms (10 Hz) é de sobra —
   uma passada dura uns 500 ms.

**Bônus, e talvez o pior dos quatro:** `reverseGeocodeAsync` roda **dentro do callback** do
`watchPositionAsync`, ou seja, a cada atualização de posição. A documentação avisa
explicitamente que geocoding é caro e que muitas chamadas seguidas passam a falhar.

## 4. O uso errado de sensor

O acelerômetro está sendo usado para **contar passos**, e da pior forma possível: olhando
**um eixo só** (`if (x > 1.5)`).

**Por que não funciona:** o eixo `x` depende inteiramente de como o telefone está no bolso.
Vire o aparelho de lado e a passada, que antes aparecia em `x`, passa a aparecer em `y` ou
`z` — o contador simplesmente para de subir, sem nenhum erro na tela. Pior: qualquer
esbarrão no eixo certo conta como passo, e **cada leitura acima do limiar conta de novo**,
porque não há detecção de transição. A 60 Hz, um único tranco vira dezenas de "passos".

**O que o autor provavelmente queria:** a **magnitude do vetor** (`√(x²+y²+z²)`), que
independe da orientação, com contagem apenas na **transição** de "abaixo do limiar" para
"acima". Se o objetivo era mesmo contar passos com precisão, existe um sensor dedicado a
isso (`Pedometer`, no mesmo pacote) que a disciplina não cobre — e que resolve o problema
sem nenhuma heurística.

## 5. Os defeitos de imagem

1. **`Image` do `react-native` com imagem remota, dentro de uma lista.** Não há cache em
   disco: a mesma foto é baixada de novo toda vez que a célula é reciclada e toda vez que o
   usuário volta à tela. Troca por `expo-image`.
2. **Sem `recyclingKey` e sem `placeholder`.** A `FlatList` recicla as células, então
   durante a rolagem aparece a **foto do item anterior** ao lado do texto do item atual — e
   a lista **pula** quando as imagens chegam, porque o espaço fica vazio até lá. Além disso
   `resizeMode` está deprecado; no `expo-image` a prop é `contentFit`.

## 6. Ordem de correção — tenho meio dia

Critério explícito: **impacto no usuário por hora de trabalho**. Primeiro o que causa dano
real e custa pouco; depois o que custa mais; por último o que é desconforto.

1. **Guarda de reentrância no `iniciarTreino`** (~15 min). Cinco toques hoje viram cinco
   assinaturas duplicadas de GPS e acelerômetro. É a maior destruição por menos linhas: um
   booleano de estado que desabilita o botão enquanto o treino está ativo.
2. **Guardar as assinaturas e fechá-las com um botão "Parar treino"** (~1 h). Resolve o
   vazamento, a bateria drenada em segundo plano e dá ao usuário o controle que hoje ele não
   tem. Sem isso, o item 1 só limita o estrago.
3. **Tratar o retorno da permissão + `hasServicesEnabledAsync` + `canAskAgain`, e apagar o
   `jaPediuPermissao`** (~1h30). Três dos cinco problemas da seção 1 de uma vez. Só vem
   depois dos dois primeiros porque a tela em branco é frustrante, enquanto o vazamento
   queima bateria de quem nem está com o app aberto.
4. **Baixar as `Accuracy`, pôr `distanceInterval` e subir o `setUpdateInterval` para 100 ms**
   (~30 min). Barato, e multiplica o efeito do item 2 na duração da bateria.
5. **Tirar o `reverseGeocodeAsync` de dentro do callback** (~30 min). Chamar uma vez ao
   início do treino, não a cada ponto.
6. **Trocar o `Image` por `expo-image` com `contentFit`, `placeholder` e `recyclingKey`**
   (~30 min). A foto errada ao lado do texto certo é **informação incorreta na tela** — só
   não está mais acima porque, neste arquivo, todas as fotos são a mesma URL fixa, o que
   torna o sintoma invisível hoje e uma bomba-relógio assim que as fotos forem reais.
7. **Corrigir a contagem de passos** (magnitude + transição) (~1 h). Alto valor, mas é o
   único item da lista que **exige teste com o corpo em movimento** — e meio dia não dá para
   calibrar limiar direito.

## 7. O que eu decidi NÃO corrigir

- **`id: String(antigos.length)`.** Gera ids duplicados assim que um item for removido — é
  o problema de `keyExtractor` da Aula 4. Deixo para depois porque **hoje nada remove
  registros** desta lista, então o bug é latente, não ativo. Anotei como dívida e trocaria
  por um id derivado do timestamp junto com a próxima mudança que tocar nesse trecho.
- **`if (!posicao) setErro('Erro ao obter localização')`.** A checagem não protege nada:
  está depois de `await`s que já teriam lançado, e `getCurrentPositionAsync` não devolve
  `null`. Não corrijo isoladamente porque ela **desaparece sozinha** no item 3 da ordem
  acima, quando o tratamento de erro de verdade for escrito. Corrigir agora seria trabalho
  jogado fora.
- **`setErro('')` dentro do callback do `watchPositionAsync`.** Apaga a mensagem de erro a
  cada atualização de GPS, o que pode fazer um erro piscar e sumir. Fica para o item 3 pelo
  mesmo motivo: a linha não sobrevive à reescrita do tratamento de falhas.
- **A ausência de `ListEmptyComponent` na `FlatList`.** É regra da Aula 4 e está faltando,
  mas o impacto é uma tela vazia sem texto explicativo por alguns segundos no início do
  treino. É o item de menor dano da lista inteira, e meio dia não alcança.
