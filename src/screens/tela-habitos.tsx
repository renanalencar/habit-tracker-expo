import { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import {
  Alert,
  BackHandler,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Notifications from 'expo-notifications';

import { BotaoAcao } from '../components/botao-acao';
import { ItemHabito } from '../components/item-habito';
import { ListaVazia } from '../components/lista-vazia';
import { HABITOS } from '../data/habitos';
import { agrupar, filtrarPorTitulo } from '../lib/agrupar';
import { cores, espaco, tipografia } from '../theme';
import type { Habito } from '../types/habito';
import { TelaRegistrarHabito } from './tela-registrar-habito';

function Cabecalho({ busca, onBuscaChange }: { busca: string; onBuscaChange: (busca: string) => void; }) {
  return (
    <TextInput
      style={styles.busca}
      placeholder="Buscar hábito"
      value={busca}
      onChangeText={onBuscaChange}
    />
  );
}

export function TelaHabitos() {
  const router = useRouter();
  const [habitos, setHabitos] = useState<Habito[]>(HABITOS);
  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  const [registrando, setRegistrando] = useState(false);
  const [agendandoLembrete, setAgendandoLembrete] = useState(false);

  useEffect(() => {
    if (!registrando) return undefined;

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      setRegistrando(false);
      return true;
    });

    return () => subscription.remove();
  }, [registrando]);

  function alternar(id: string) {
    setHabitos((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, status: h.status === 'pendente' ? 'concluido' : 'pendente' }
          : h
      )
    );
  }

  function remover(id: string) {
    setHabitos((prev) => prev.filter((h) => h.id !== id));
  }

  function recarregar() {
    setAtualizando(true);

    // Recarregar volta ao mock, mas NÃO joga fora o que o usuário registrou: um hábito
    // que custou duas permissões não pode sumir no primeiro puxão de tela. Os
    // registrados são os que não estão no mock — os do topo continuam no topo.
    setHabitos((prev) => {
      const idsDoMock = new Set(HABITOS.map((h) => h.id));
      const registrados = prev.filter((h) => !idsDoMock.has(h.id));
      return [...registrados, ...HABITOS];
    });

    setBusca('');
    setAtualizando(false);
  }

  function adicionar(novo: Habito) {
    // Array NOVO, como na Aula 4 — nunca `push` no anterior. E ele entra no TOPO: no fim
    // da lista o usuário teria que rolar para ver o resultado do que acabou de fazer.
    setHabitos((prev) => [novo, ...prev]);
    // A busca antiga pode esconder justamente o hábito recém-criado.
    setBusca('');
    setRegistrando(false);
  }

  function abrirDetalhe(id: string) {
    router.push({ pathname: '/habit/[id]', params: { id } });
  }

  async function agendarLembrete() {
    if (agendandoLembrete) return;

    setAgendandoLembrete(true);
    try {
      const permissaoAtual = await Notifications.getPermissionsAsync();
      const permissao =
        permissaoAtual.status === 'granted'
          ? permissaoAtual
          : await Notifications.requestPermissionsAsync();

      if (permissao.status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Ative as notificações deste aplicativo nas configurações do dispositivo e tente novamente.'
        );
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hora do seu hábito!',
          body: 'Vamos manter a rotina de meditação por 10 minutos.',
          data: { habitId: 'h5' },
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });

      Alert.alert(
        'Lembrete agendado',
        'Uma notificação local aparecerá em 5 segundos. Deixe o app em segundo plano para testá-la.'
      );
    } catch (error) {
      console.error('Não foi possível agendar o lembrete do hábito.', error);
      Alert.alert(
        'Não foi possível agendar',
        error instanceof Error ? error.message : 'O sistema não conseguiu agendar o lembrete.'
      );
    } finally {
      setAgendandoLembrete(false);
    }
  }

  const secoes = agrupar(filtrarPorTitulo(habitos, busca));

  if (registrando) {
    return (
      <TelaRegistrarHabito onSalvar={adicionar} onCancelar={() => setRegistrando(false)} />
    );
  }

  return (
    <View style={styles.tela}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: agendandoLembrete }}
        disabled={agendandoLembrete}
        onPress={agendarLembrete}
        style={({ pressed }) => [
          styles.botaoLembrete,
          pressed && styles.botaoPressionado,
          agendandoLembrete && styles.botaoDesativado,
        ]}
      >
        <Text style={styles.textoBotaoLembrete}>
          {agendandoLembrete ? 'Agendando lembrete…' : 'Agendar lembrete em 5s'}
        </Text>
      </Pressable>

      <SectionList
        sections={secoes}
        renderItem={({ item }) => (
          <ItemHabito
            habito={item}
            onAbrir={abrirDetalhe}
            onAlternar={alternar}
            onRemover={remover}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.cabecalhoSecao}>{section.title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListEmptyComponent={() => <ListaVazia primeiroAcesso={false} onLimparBusca={recarregar} />}
        stickySectionHeadersEnabled
        refreshing={atualizando}
        onRefresh={recarregar}
        ListHeaderComponent={<Cabecalho busca={busca} onBuscaChange={setBusca} />}
        contentContainerStyle={styles.conteudo}
      />

      <View style={styles.rodape}>
        <BotaoAcao rotulo="Novo hábito" onPressionar={() => setRegistrando(true)} />

        <Pressable
          onPress={() => router.push('/registrar-foto')}
          style={({ pressed }) => [styles.botaoRota, pressed && styles.botaoPressionado]}
        >
          <Text style={styles.textoBotaoRota}>Registrar foto do hábito</Text>
        </Pressable>

        <Link href="/galeria" asChild>
          <Pressable style={({ pressed }) => [styles.botaoSecundario, pressed && styles.botaoPressionado]}>
            <Text style={styles.textoBotaoSecundario}>Galeria do hábito</Text>
          </Pressable>
        </Link>

        <Link href="/about" style={styles.linkSobre}>
          Sobre o app
        </Link>
      </View>
    </View>
  );
}

export default TelaHabitos;

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, borderRadius: espaco.lg },
  botaoLembrete: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: espaco.md,
    marginTop: espaco.sm,
    paddingHorizontal: espaco.md,
    borderRadius: espaco.sm,
    backgroundColor: '#f26522',
  },
  textoBotaoLembrete: { color: '#fff', fontWeight: '700', fontSize: 16 },
  botaoDesativado: { opacity: 0.65 },
  conteudo: { padding: espaco.md, paddingBottom: espaco.lg },
  busca: {
    borderWidth: 1,
    borderColor: cores.textoFraco,
    borderRadius: espaco.sm,
    padding: espaco.sm,
    marginBottom: espaco.sm,
    backgroundColor: cores.cartao,
    fontSize: 16,
  },
  cabecalhoSecao: {
    ...tipografia.legenda,
    fontWeight: '700',
    textTransform: 'uppercase',
    backgroundColor: cores.fundo,
    paddingVertical: espaco.sm,
  },
  separador: { height: espaco.sm },
  rodape: { padding: espaco.md, gap: espaco.sm },
  botaoRota: {
    backgroundColor: '#f26522',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoRota: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  botaoSecundario: {
    borderWidth: 2,
    borderColor: '#f26522',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoSecundario: {
    color: '#f26522',
    fontWeight: '700',
    fontSize: 16,
  },
  botaoPressionado: {
    opacity: 0.7,
  },
  linkSobre: {
    fontSize: 16,
    color: '#f26522',
    textDecorationLine: 'underline',
    textAlign: 'center',
    paddingVertical: 4,
  },
});
