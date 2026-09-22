// Exercício 6 — Complete: o giroscópio (casa)
// Nível ⭐⭐ · 10 min
//
// Para pré-visualizar: descomente <TelaGiroscopio /> em App.tsx.
// Precisa de APARELHO FÍSICO: o iOS Simulator não tem giroscópio.
//
// A PERGUNTA ESCRITA está respondida no README.md da raiz, na seção
// "Aula 5 — Giroscópio x acelerômetro". Resumo: parado na mesa o giroscópio marca ≈ 0
// nos três eixos (ele mede VELOCIDADE ANGULAR, e nada está girando), enquanto o
// acelerômetro marca magnitude ≈ 1 g (ele mede aceleração linear SOMADA à gravidade, e
// a gravidade não desliga). Não é ruído: é física — e é o que permite ler INCLINAÇÃO
// com o aparelho parado, coisa que o giroscópio não consegue fazer.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import type { EventSubscription } from 'expo-modules-core';

type Eixos = { x: number; y: number; z: number };

const INTERVALO_MS = 100;   // 10 leituras por segundo
const LIMIAR_RAD_S = 3;     // acima disso, "girando rápido"

export default function TelaGiroscopio() {
  const [assinatura, setAssinatura] = useState<EventSubscription | null>(null);
  const [eixos, setEixos] = useState<Eixos>({ x: 0, y: 0, z: 0 });
  const [girandoRapido, setGirandoRapido] = useState(false);
  const [indisponivel, setIndisponivel] = useState(false);

  async function ligar() {
    // TODO 19: cheque disponibilidade, peça intervalo de 100 ms e assine.
    if (!(await Gyroscope.isAvailableAsync())) {
      setIndisponivel(true);
      return;
    }

    Gyroscope.setUpdateInterval(INTERVALO_MS);
    // TODO 20: guarde x, y e z no estado.
    const nova = Gyroscope.addListener(({ x, y, z }) => {
      setEixos({ x, y, z });
      // TODO 21: marque `girandoRapido` quando a magnitude passar de 3 rad/s.
      // Magnitude do vetor, como no acelerômetro: um giro em qualquer eixo conta.
      setGirandoRapido(Math.sqrt(x * x + y * y + z * z) > LIMIAR_RAD_S);
    });
    // TODO 22: guarde a assinatura.
    setAssinatura(nova);
  }

  function desligar() {
    // TODO 23: encerre.
    assinatura?.remove();
    setAssinatura(null);
    setEixos({ x: 0, y: 0, z: 0 });
    setGirandoRapido(false);
  }

  return (
    <View style={estilos.tela}>
      {indisponivel && <Text style={estilos.erro}>Este aparelho não tem giroscópio.</Text>}

      <Text style={estilos.leitura}>x: {eixos.x.toFixed(2)} rad/s</Text>
      <Text style={estilos.leitura}>y: {eixos.y.toFixed(2)} rad/s</Text>
      <Text style={estilos.leitura}>z: {eixos.z.toFixed(2)} rad/s</Text>
      {girandoRapido && <Text style={estilos.alerta}>🌀 girando rápido</Text>}

      <Pressable onPress={assinatura ? desligar : ligar} style={estilos.botao}>
        <Text style={estilos.textoBotao}>{assinatura ? 'Desligar' : 'Ligar'}</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
  leitura: { fontSize: 20, fontVariant: ['tabular-nums'] },
  alerta: { fontSize: 20, fontWeight: '800', color: '#f26522' },
  erro: { fontSize: 15, color: '#b00020' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
