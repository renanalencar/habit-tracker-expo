# Exercício 1 — Associação: qual pacote e qual função

> Aula 5 · ⭐ · 4 min · no papel

| # | Situação | Pacote | Função / prop |
|---|---|---|---|
| 1 | Registrar em que academia o treino aconteceu, uma vez, ao tocar no botão | `expo-location` | `getCurrentPositionAsync()` — leitura pontual, o "copo" |
| 2 | Desenhar o trajeto enquanto o usuário corre | `expo-location` | `watchPositionAsync()` — assinatura, a "torneira" |
| 3 | Detectar que o usuário chacoalhou o telefone | `expo-sensors` | `Accelerometer.addListener()` + magnitude do vetor `√(x²+y²+z²)` |
| 4 | Saber se o usuário girou o telefone, e com que rapidez | `expo-sensors` | `Gyroscope.addListener()` — velocidade angular em rad/s |
| 5 | Descobrir que o usuário marcou "não perguntar de novo" | qualquer um (`expo-location`, `expo-camera`) | o campo **`canAskAgain`** da resposta de permissão |
| 6 | Permissão concedida, mas não vem localização nenhuma | `expo-location` | `hasServicesEnabledAsync()` — o **serviço** está desligado |
| 7 | Mostrar "Boa Viagem, Recife" em vez de `-8.12, -34.90` | `expo-location` | `reverseGeocodeAsync()` |
| 8 | Mostrar algo em 50 ms, mesmo que o dado seja um pouco velho | `expo-location` | `getLastKnownPositionAsync()` |
| 9 | A foto preenche o card sem distorcer, cortando o excesso | `expo-image` | `contentFit="cover"` |
| 10 | As fotos carregam e a lista inteira pula | `expo-image` | `placeholder` (+ altura fixa no estilo) |
| 11 | Ao rolar rápido, aparece por um instante a foto do item anterior | `expo-image` | `recyclingKey` |
| 12 | A câmera precisa começar apontando para o rosto | `expo-camera` | `facing="front"` |
| 13 | Saber se este aparelho sequer tem giroscópio | `expo-sensors` | `Gyroscope.isAvailableAsync()` |
| 14 | Receber a posição só quando o usuário andar 10 metros | `expo-location` | `distanceInterval: 10` nas opções do `watchPositionAsync()` |

## O que separa 5, 6 e 8 dos outros

Os itens 5, 6 e 8 não se resolvem decorando nomes — eles vêm do **contrato**:

- **5 (`canAskAgain`)** — sem ele o app manda o usuário tocar num botão que nunca mais vai
  funcionar, porque o diálogo do sistema não aparece mais.
- **6 (`hasServicesEnabledAsync`)** — permissão e serviço são duas perguntas diferentes.
  Permissão concedida com o GPS do aparelho desligado é situação cotidiana, e a ação que o
  usuário precisa tomar é outra.
- **8 (`getLastKnownPositionAsync`)** — é a diferença entre uma tela que responde na hora
  com um dado aproximado e uma tela que fica girando por oito segundos esperando o fix do
  GPS.

São os três que separam um app que trata os casos reais de um que só funciona no aparelho
de quem escreveu.
