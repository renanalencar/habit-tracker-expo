/**
 * Atividade 1 — arquivo 3 de 3: a tela do hábito do dia.
 *
 * ⏳ ESTE ARQUIVO DEPENDE DA AULA 2.
 *    Os TODO A1.1 a A1.9 (em `src/types/habito.ts` e `src/services/habitoService.ts`)
 *    são TypeScript puro e você já consegue fazer hoje. Os componentes usados aqui
 *    — View, Text, Pressable, ActivityIndicator, StyleSheet — só são apresentados
 *    na Aula 2. Volte a este arquivo depois dela.
 *
 * Enunciado completo em `exercises.md` da Aula 1.
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Descomente conforme for precisando:
// import { useEffect, useState } from 'react';
// import { ActivityIndicator, Pressable } from 'react-native';
// import type { EstadoTela, Habito } from './src/types/habito';
// import { rotuloStatus } from './src/types/habito';
// import { buscarHabitoDoDia } from './src/services/habitoService';

export default function App() {
  // ============================================================
  // TODO A1.10 — UM único estado, tipado com EstadoTela<Habito>,
  //   começando em { tipo: 'carregando' }.
  //   Nada de três useState soltos (loading / dados / erro) — é
  //   exatamente o estado impossível que a união discriminada elimina.
  // ============================================================

  // ============================================================
  // TODO A1.11 — carregue o hábito ao montar a tela.
  //   Sucesso → { tipo: 'sucesso', dados }
  //   Falha   → { tipo: 'erro', mensagem }
  //   Deixe a função de carregar SEPARADA do useEffect, para o botão
  //   "Tentar novamente" conseguir reusá-la.
  // ============================================================

  // ============================================================
  // TODO A1.12 — marque o hábito como concluído no estado local.
  //   Só faz sentido quando o estado é 'sucesso'. Não mute o objeto:
  //   devolva uma cópia com o status novo.
  // ============================================================

  // ============================================================
  // TODO A1.13 — troque o placeholder abaixo por um switch sobre
  //   estado.tipo, com os três casos:
  //     'carregando' → <ActivityIndicator />
  //     'sucesso'    → card com titulo, categoria, rotuloStatus(...),
  //                    streakDias e um botão "Marcar concluído hoje"
  //     'erro'       → mensagem + botão "Tentar novamente"
  //   Sem `default`: é ele que garante que os três casos foram tratados.
  // ============================================================
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Rastreador de Micro-hábitos</Text>
      <Text style={styles.aviso}>
        Atividade 1 — complete os TODO A1.1 a A1.14. Comece por{' '}
        <Text style={styles.arquivo}>src/types/habito.ts</Text>.
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 64,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  aviso: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  arquivo: {
    fontWeight: '600',
    color: '#333',
  },
  // TODO A1.14 — os estilos do card, do botão e da mensagem de erro.
});
