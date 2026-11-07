// Atividade Aplicada (Requisito 3) — Aba Home conectada ao useHabitStore e useTheme
// Onde: src/screens/tela-habitos.tsx (rota: src/app/(tabs)/index.tsx)

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
} from 'expo-notifications/build/NotificationsEmitter';
import { setNotificationHandler } from 'expo-notifications/build/NotificationsHandler';
import { SchedulableTriggerInputTypes } from 'expo-notifications/build/Notifications.types';
import { scheduleNotificationAsync } from 'expo-notifications/build/scheduleNotificationAsync';
import {
  AppState,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useTheme } from '../context/theme-context';
import { useHabitStore } from '../store/use-habit-store';
import { cores, espaco } from '../theme';

setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function TelaHabitos() {
  const router = useRouter();
  const [novoHabitoTexto, setNovoHabitoTexto] = useState('');
  const permissionGranted = useRef(false);

  const { isDark } = useTheme();
  const habits = useHabitStore((s) => s.habits);
  const addHabit = useHabitStore((s) => s.addHabit);
  const toggleHabit = useHabitStore((s) => s.toggleHabit);
  const removeHabit = useHabitStore((s) => s.removeHabit);

  useEffect(() => {
    async function requestPermission() {
      const { status } = await requestPermissionsAsync();
      permissionGranted.current = status === 'granted';
    }

    requestPermission();

    const receivedListener = addNotificationReceivedListener((notification) => {
      console.log('Notificação recebida', notification);
    });

    const navegarParaDetalhe = (habitId: string) => {
      setTimeout(() => {
        router.push({
          pathname: '/habit/[id]',
          params: { id: habitId },
        });
      }, 300);
    };

    const responseListener = addNotificationResponseReceivedListener((response) => {
      console.log('Notificação tocada', response);
      const habitId = String(response?.notification?.request?.content?.data?.habitId ?? '1');

      if (AppState.currentState === 'active') {
        navegarParaDetalhe(habitId);
      } else {
        const appStateSub = AppState.addEventListener('change', (nextState) => {
          if (nextState === 'active') {
            appStateSub.remove();
            navegarParaDetalhe(habitId);
          }
        });
      }
    });

    return () => {
      receivedListener.remove();
      responseListener.remove();
    };
  }, [router]);

  async function agendarLembrete() {
    if (!permissionGranted.current) {
      const { status } = await requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão não concedida');
        return;
      }
      permissionGranted.current = true;
    }

    await scheduleNotificationAsync({
      content: {
        title: 'Hora do hábito!',
        body: 'Não esqueça de sua rotina.',
        data: { habitId: '1' },
      },
      trigger: {
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },
    });
  }

  function handleAdicionarHabito() {
    if (!novoHabitoTexto.trim()) return;
    addHabit(novoHabitoTexto);
    setNovoHabitoTexto('');
  }

  function abrirDetalhe(id: string) {
    router.push({
      pathname: '/habit/[id]',
      params: { id },
    });
  }

  return (
    <View style={[styles.tela, isDark && styles.telaEscura]}>
      <View style={styles.conteudo}>
        <View style={styles.linhaInput}>
          <TextInput
            style={[styles.input, isDark && styles.inputEscuro]}
            placeholder="Novo hábito..."
            placeholderTextColor={isDark ? '#B0B0B0' : cores.textoFraco}
            value={novoHabitoTexto}
            onChangeText={setNovoHabitoTexto}
            onSubmitEditing={handleAdicionarHabito}
            returnKeyType="done"
          />
          <Pressable
            style={({ pressed }) => [
              styles.botaoAdicionar,
              pressed && styles.botaoPressionado,
            ]}
            onPress={handleAdicionarHabito}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Adicionar hábito"
          >
            <Text style={styles.textoBotaoAdicionar}>+ Adicionar</Text>
          </Pressable>
        </View>

        <FlatList
          data={habits}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
          renderItem={({ item }) => (
            <View style={[styles.card, isDark && styles.cardEscuro]}>
              <Pressable
                onPress={() => toggleHabit(item.id)}
                style={styles.checkbox}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.done }}
                accessibilityLabel={`Marcar ${item.title} como ${item.done ? 'pendente' : 'concluído'}`}
              >
                <Text style={styles.checkboxTexto}>{item.done ? '✅' : '⬜'}</Text>
              </Pressable>

              <Pressable onPress={() => abrirDetalhe(item.id)} style={styles.cardTitulo}>
                <Text
                  style={[
                    styles.tituloHabito,
                    isDark && styles.textoEscuro,
                    item.done && styles.tituloConcluido,
                  ]}
                >
                  {item.title}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => removeHabit(item.id)}
                accessibilityRole="button"
                accessibilityLabel={`Excluir ${item.title}`}
              >
                <Text style={styles.textoExcluir}>Excluir</Text>
              </Pressable>
            </View>
          )}
        />
      </View>

      <View style={styles.rodape}>
        <Pressable
          onPress={agendarLembrete}
          style={({ pressed }) => [styles.botaoNotificacao, pressed && styles.botaoPressionado]}
        >
          <Text style={styles.textoBotaoRota}>Agendar notificação em 5s</Text>
        </Pressable>

      </View>
    </View>
  );
}

export default TelaHabitos;

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  telaEscura: { backgroundColor: '#121212' },
  conteudo: { flex: 1, padding: espaco.md },
  linhaInput: { flexDirection: 'row', gap: espaco.sm, marginBottom: espaco.md },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: cores.textoFraco,
    borderRadius: espaco.sm,
    paddingHorizontal: espaco.md,
    paddingVertical: espaco.sm,
    backgroundColor: cores.cartao,
    fontSize: 16,
  },
  inputEscuro: { backgroundColor: '#242424', color: '#F5F5F5', borderColor: '#666' },
  botaoAdicionar: {
    backgroundColor: '#FF6002',
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: espaco.sm,
    minHeight: 48,
  },
  textoBotaoAdicionar: { color: '#fff', fontSize: 16, fontWeight: '700' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: espaco.md,
    backgroundColor: cores.cartao,
    borderRadius: espaco.sm,
    gap: espaco.sm,
  },
  cardEscuro: { backgroundColor: '#242424' },
  checkbox: { padding: 4 },
  checkboxTexto: { fontSize: 18 },
  cardTitulo: { flex: 1 },
  tituloHabito: { fontSize: 16, fontWeight: '600', color: cores.texto },
  textoEscuro: { color: '#F5F5F5' },
  tituloConcluido: { textDecorationLine: 'line-through', color: cores.textoFraco },
  textoExcluir: { color: '#FF8A80', fontWeight: '600', padding: 4 },
  separador: { height: espaco.sm },
  rodape: { padding: espaco.md, gap: espaco.sm },
  botaoNotificacao: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoRota: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  botaoPressionado: {
    opacity: 0.7,
  },
});
