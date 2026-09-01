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

import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import type { EstadoTela, Habito } from './src/types/habito';
import { rotuloStatus } from './src/types/habito';
import { buscarHabitoDoDia } from './src/services/habitoService';

export default function App() {
  // ============================================================
  // TODO A1.10 — UM único estado, tipado com EstadoTela<Habito>,
  //   começando em { tipo: 'carregando' }.
  //   Nada de três useState soltos (loading / dados / erro) — é
  //   exatamente o estado impossível que a união discriminada elimina.
  // ============================================================
  const [estado, setEstado] = useState<EstadoTela<Habito>>({ tipo: 'carregando' });

  // ============================================================
  // TODO A1.11 — carregue o hábito ao montar a tela.
  //   Sucesso → { tipo: 'sucesso', dados }
  //   Falha   → { tipo: 'erro', mensagem }
  //   Deixe a função de carregar SEPARADA do useEffect, para o botão
  //   "Tentar novamente" conseguir reusá-la.
  // ============================================================
  const carregarHabito = async () => {
    setEstado({ tipo: 'carregando' });
    try {
      const dados = await buscarHabitoDoDia();
      setEstado({ tipo: 'sucesso', dados });
    } catch (e) {
      setEstado({ tipo: 'erro', mensagem: e instanceof Error ? e.message : 'Erro desconhecido' });
    }
  };

  useEffect(() => {
    carregarHabito();
  }, []);

  // ============================================================
  // TODO A1.12 — marque o hábito como concluído no estado local.
  //   Só faz sentido quando o estado é 'sucesso'. Não mute o objeto:
  //   devolva uma cópia com o status novo.
  // ============================================================
  const concluirHabito = () => {
    if (estado.tipo === 'sucesso') {
      setEstado({
        tipo: 'sucesso',
        dados: { ...estado.dados, status: 'concluido' },
      });
    }
  };

  // ============================================================
  // TODO A1.13 — troque o placeholder abaixo por um switch sobre
  //   estado.tipo, com os três casos:
  //     'carregando' → <ActivityIndicator />
  //     'sucesso'    → card com titulo, categoria, rotuloStatus(...),
  //                    streakDias e um botão "Marcar concluído hoje"
  //     'erro'       → mensagem + botão "Tentar novamente"
  //   Sem `default`: é ele que garante que os três casos foram tratados.
  // ============================================================
  let conteudo;
  switch (estado.tipo) {
    case 'carregando':
      conteudo = <ActivityIndicator size="large" color="#007AFF" />;
      break;
    case 'sucesso':
      conteudo = (
        <View style={styles.card}>
          <Text style={styles.tituloHabito}>{estado.dados.titulo}</Text>
          <Text style={styles.textoHabito}>Categoria: {estado.dados.categoria}</Text>
          <Text style={styles.textoHabito}>Status: {rotuloStatus(estado.dados.status)}</Text>
          <Text style={styles.textoHabito}>Streak: {estado.dados.streakDias} dias</Text>
          {estado.dados.status !== 'concluido' && (
            <Pressable style={styles.botao} onPress={concluirHabito}>
              <Text style={styles.textoBotao}>Marcar concluído hoje</Text>
            </Pressable>
          )}
        </View>
      );
      break;
    case 'erro':
      conteudo = (
        <View style={styles.erroContainer}>
          <Text style={styles.erroMensagem}>{estado.mensagem}</Text>
          <Pressable style={styles.botao} onPress={carregarHabito}>
            <Text style={styles.textoBotao}>Tentar novamente</Text>
          </Pressable>
        </View>
      );
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Rastreador de Micro-hábitos</Text>
      {conteudo}
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
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginTop: 16,
  },
  tituloHabito: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textoHabito: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  erroContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  erroMensagem: {
    color: '#ff3b30',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});
