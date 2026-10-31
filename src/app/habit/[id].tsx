import { useCallback } from 'react';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';

import { HABITOS } from '../../data/habitos';
import { cores, espaco, tipografia } from '../../theme';

export default function DetalheHabito() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const habito = HABITOS.find((item) => item.id === id);
  const voltarParaLista = useCallback(() => {
    router.replace('/(tabs)');
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
        voltarParaLista();
        return true;
      });

      return () => subscription.remove();
    }, [voltarParaLista])
  );

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Detalhes do hábito</Text>
      {habito ? <Text style={styles.nome}>{habito.titulo}</Text> : null}
      <Text style={styles.id}>Hábito ID: {id}</Text>
      {habito ? (
        <Text style={styles.descricao}>
          {habito.categoria} · sequência de {habito.streakDias} dias
        </Text>
      ) : (
        <Text style={styles.descricao}>Este hábito não está mais na sua lista.</Text>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={voltarParaLista}
        style={({ pressed }) => [styles.botaoVoltar, pressed && styles.botaoPressionado]}
      >
        <Text style={styles.textoBotaoVoltar}>Voltar para a lista</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: espaco.md,
    padding: espaco.lg,
    backgroundColor: cores.fundo,
  },
  titulo: tipografia.titulo,
  nome: { ...tipografia.corpo, fontSize: 20, fontWeight: '600', textAlign: 'center' },
  id: { fontSize: 16, fontWeight: '700', color: cores.primaria },
  descricao: tipografia.legenda,
  botaoVoltar: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: espaco.md,
    paddingHorizontal: espaco.md,
    borderRadius: espaco.sm,
    backgroundColor: cores.primaria,
  },
  botaoPressionado: { opacity: 0.75 },
  textoBotaoVoltar: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
