// Exercício 4 — Complete: o detector de chacoalhada
// Nível ⭐⭐ · 6 min
//
// Para pré-visualizar: descomente <TelaChacoalhada /> em App.tsx.
// Precisa de APARELHO FÍSICO: o iOS Simulator não tem acelerômetro.
//
// CONFIRA, NESTA ORDEM:
//   1. Ligado e parado na mesa    → o contador NÃO sobe?
//   2. Uma chacoalhada            → o contador sobe 1, não 8?
//   3. Chacoalhe em outra direção → conta também? (Se só uma conta, você olhou um eixo só.)
//   4. Desligue e chacoalhe       → nada acontece?
//
// HONESTIDADE TÉCNICA: se você sair desta tela com o sensor ligado, ele CONTINUA ligado.
// O botão "Desligar sensor" existe justamente porque a ferramenta que faria isso sozinha
// (o `useEffect` com função de limpeza) é assunto da Aula 6.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import type { EventSubscription } from 'expo-modules-core';

const LIMIAR_G = 1.8;          // empírico: ajuste no seu aparelho
const INTERVALO_MS = 100;      // 10 leituras por segundo

export default function TelaChacoalhada() {
  const [assinatura, setAssinatura] = useState<EventSubscription | null>(null);
  const [chacoalhou, setChacoalhou] = useState(false);
  const [contador, setContador] = useState(0);
  const [indisponivel, setIndisponivel] = useState(false);

  async function ligar() {
    // TODO 7: confira se o acelerômetro existe neste aparelho.
    //         Se não existir, marque `indisponivel` e saia.
    // Sem esta checagem a tela fica eternamente "parada" num aparelho sem o sensor —
    // e é ela que salva quem tentar no iOS Simulator.
    const disponivel = await Accelerometer.isAvailableAsync();
    if (!disponivel) {
      setIndisponivel(true);
      return;
    }

    // TODO 8: peça o intervalo de atualização.
    Accelerometer.setUpdateInterval(INTERVALO_MS);

    // TODO 9: assine o acelerômetro. Dentro do callback:
    //         a) calcule a MAGNITUDE do vetor (x, y, z) — não olhe um eixo só;
    //         b) compare com LIMIAR_G;
    //         c) atualize `chacoalhou`;
    //         d) some 1 em `contador` APENAS na transição de "não" para "sim"
    //            (senão você conta 10 chacoalhadas por segundo).
    const nova = Accelerometer.addListener(({ x, y, z }) => {
      // A MAGNITUDE do vetor responde "o quanto foi sacudido" independente da orientação.
      // Olhando só o `x`, uma chacoalhada de cima para baixo passa batido.
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const agora = magnitude > LIMIAR_G;

      setChacoalhou((anterior) => {
        if (anterior === agora) return anterior;  // nada mudou: não re-renderiza
        if (agora) setContador((n) => n + 1);     // conta só na SUBIDA (não 10x/segundo)
        return agora;
      });
    });

    // TODO 10: guarde a assinatura no estado.
    setAssinatura(nova);
  }

  function desligar() {
    // TODO 11: encerre a assinatura e limpe o estado.
    //         Use o método correto — `removeAllListeners()` está deprecado.
    // `remove()` na assinatura, e não `removeAllListeners()`: o segundo está deprecado e
    // ainda derrubaria listeners de outras partes do app.
    assinatura?.remove();
    setAssinatura(null);
    setChacoalhou(false);
  }

  return (
    <View style={estilos.tela}>
      {indisponivel && <Text style={estilos.erro}>Este aparelho não tem acelerômetro.</Text>}

      <Text style={estilos.status}>{chacoalhou ? '🤝 CHACOALHOU' : '😴 parado'}</Text>
      <Text style={estilos.info}>Chacoalhadas: {contador}</Text>

      <Pressable
        onPress={assinatura ? desligar : ligar}
        style={({ pressed }) => [estilos.botao, pressed && estilos.botaoPressionado]}
      >
        <Text style={estilos.textoBotao}>{assinatura ? 'Desligar sensor' : 'Ligar sensor'}</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16, justifyContent: 'center', alignItems: 'center' },
  status: { fontSize: 32, fontWeight: '800' },
  info: { fontSize: 16 },
  erro: { fontSize: 15, color: '#b00020' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 10 },
  botaoPressionado: { opacity: 0.7 },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
