// Exercício 6 — Complete: o giroscópio (casa)
// Nível ⭐⭐ · 10 min
//
// Para pré-visualizar: descomente <TelaGiroscopio /> em App.tsx.
// Precisa de APARELHO FÍSICO: o iOS Simulator não tem giroscópio.
//
// A PERGUNTA ESCRITA (3–5 linhas, no README.md da raiz):
//   Com o giroscópio ligado, deixe o telefone parado na mesa e anote os valores.
//   Depois faça o mesmo teste com o acelerômetro (Exercício 4, mostrando a magnitude
//   na tela em vez do booleano).
//   Explique a diferença entre os dois resultados. Por que um zera e o outro não?
//   E o que isso permite fazer com o acelerômetro que não dá para fazer com o giroscópio?

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import type { EventSubscription } from 'expo-modules-core';

type Eixos = { x: number; y: number; z: number };

export default function TelaGiroscopio() {
  const [assinatura, setAssinatura] = useState<EventSubscription | null>(null);
  const [eixos, setEixos] = useState<Eixos>({ x: 0, y: 0, z: 0 });
  const [girandoRapido, setGirandoRapido] = useState(false);

  async function ligar() {
    // TODO 19: cheque disponibilidade, peça intervalo de 100 ms e assine.
    // TODO 20: guarde x, y e z no estado.
    // TODO 21: marque `girandoRapido` quando a magnitude passar de 3 rad/s.
    // TODO 22: guarde a assinatura.
  }

  function desligar() {
    // TODO 23: encerre.
  }

  return (
    <View style={estilos.tela}>
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
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
