// Exercício 4 — Previsão: o ciclo de vida do toque
// Nível ⭐⭐ · 5 min · PREVEJA ANTES DE RODAR
//
// Para pré-visualizar: troque temporariamente o conteúdo renderizado dentro de
// <View style={styles.conteudo}> em App.tsx por <LabToque />, e desfaça antes de entregar.
//
// O código do laboratório está COMPLETO de propósito. O exercício é a previsão.
//
// ─────────────────────────────────────────────────────────────────────────────
// TODO 15: preencha a coluna "Sua previsão" ANTES de rodar o app.
//          Escreva a sequência de eventos, EM ORDEM, para cada gesto.
//
//   | Gesto                                                  | Sua previsão |
//   |--------------------------------------------------------|--------------|
//   | A. Toque rápido e solto                                 |              |
//   | B. Segurar 2 segundos e soltar                          |              |
//   | C. Encostar, arrastar para FORA do quadrado e soltar lá |              |
//   | D. Encostar, arrastar 5 px para o lado e soltar em cima |              |
//
// TODO 16: agora rode e registre o que ACONTECEU de fato em cada gesto.
//          Onde errou, não apague a previsão — o erro é o conteúdo do exercício.
//
//   | Gesto | O que aconteceu |
//   |-------|-----------------|
//   | A     |                 |
//   | B     |                 |
//   | C     |                 |
//   | D     |                 |
//
// TODO 17: responda as quatro perguntas.
//   1. No gesto C, `onPress` disparou? Por que isso é um RECURSO e não um defeito?
//   2. No gesto D, por que o resultado foi diferente do C?
//      Qual prop — e qual default dela — explica isso?
//   3. No gesto B, `onPress` disparou depois do `onLongPress`?
//   4. Se a ação estivesse em `onPressIn`, qual dos quatro gestos passaria a se
//      comportar de forma indesejada?
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LabToque() {
  const [log, setLog] = useState<string[]>([]);
  const registrar = (evento: string) => setLog((l) => [...l, evento]);

  return (
    <View style={styles.tela}>
      <Pressable
        style={({ pressed }) => [styles.alvo, pressed && styles.alvoPressionado]}
        onPressIn={() => registrar('onPressIn')}
        onPressOut={() => registrar('onPressOut')}
        onPress={() => registrar('onPress')}
        onLongPress={() => registrar('onLongPress')}
      >
        <Text style={styles.rotuloAlvo}>Toque aqui</Text>
      </Pressable>

      <Text style={styles.limpar} onPress={() => setLog([])}>
        limpar
      </Text>
      {log.map((e, i) => (
        <Text key={i} style={styles.linha}>
          {i + 1}. {e}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 8, justifyContent: 'center' },
  alvo: { backgroundColor: '#FF6002', padding: 32, borderRadius: 16, alignItems: 'center' },
  alvoPressionado: { backgroundColor: '#232323' },
  rotuloAlvo: { color: '#fff', fontSize: 18, fontWeight: '600' },
  limpar: { color: '#6b6459', textDecorationLine: 'underline', paddingVertical: 8 },
  linha: { fontFamily: 'monospace' },
});
