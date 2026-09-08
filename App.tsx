import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { CardHabito } from './src/components/CardHabito';
import { Cabecalho } from './src/components/Cabecalho';
import type { EstadoTela, Habito } from './src/types/habito';

const HABITO_DO_DIA: Habito = {
  id: 'h1',
  titulo: 'Beber 2L de água',
  categoria: 'saude',
  frequencia: 'diaria',
  status: 'pendente',
  streakDias: 4,
  criadoEm: '2026-08-01T09:00:00.000Z',
};

function buscarHabitoDoDia(): Promise<Habito> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(HABITO_DO_DIA), 1200);
  });
}

export default function App() {
  const [estado, setEstado] = useState<EstadoTela<Habito>>({ situacao: 'carregando' });

  useEffect(() => {
    let ativo = true;

    buscarHabitoDoDia()
      .then((habito) => {
        if (ativo) setEstado({ situacao: 'sucesso', dados: habito });
      })
      .catch(() => {
        if (ativo) setEstado({ situacao: 'erro', mensagem: 'Não foi possível carregar o hábito do dia.' });
      });

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Cabecalho total={5} concluidos={2} />
      <View style={styles.conteudo}>{renderizarConteudo(estado, setEstado)}</View>
      <StatusBar style="auto" />
    </View>
  );
}

function concluirHabito(estado: EstadoTela<Habito>, setEstado: (estado: EstadoTela<Habito>) => void) {
  if (estado.situacao === 'sucesso') {
    setEstado({
      situacao: 'sucesso',
      dados: { ...estado.dados, status: 'concluido' },
    });
  }
};

function renderizarConteudo(estado: EstadoTela<Habito>, setEstado: (estado: EstadoTela<Habito>) => void) {
  switch (estado.situacao) {
    case 'carregando':
      return <ActivityIndicator size="large" color="#1e88e5" />;
    case 'erro':
      return <Text style={styles.erro}>{estado.mensagem}</Text>;
    case 'sucesso':
      return (
        <CardHabito
          titulo={estado.dados.titulo}
          categoria={estado.dados.categoria}
          status={estado.dados.status}
          destacado
          onPress={() => concluirHabito(estado, setEstado)}
        />
      );
    default: {
      const naoTratado: never = estado;
      throw new Error(`Situação não tratada: ${JSON.stringify(naoTratado)}`);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 56,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  erro: {
    color: '#e53935',
    textAlign: 'center',
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

});
