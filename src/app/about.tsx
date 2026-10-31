import { StyleSheet, Text, View } from 'react-native';

import { cores, espaco, tipografia } from '../theme';

export default function Sobre() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Sobre o app</Text>
      <Text style={styles.texto}>
        O Rastreador de Hábitos ajuda você a criar uma rotina consistente, acompanhar pequenas
        conquistas e registrar seu progresso.
      </Text>
      <Text style={styles.versao}>Aula 7 · Navegação e notificações locais</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    gap: espaco.md,
    padding: espaco.lg,
    backgroundColor: cores.fundo,
  },
  titulo: tipografia.titulo,
  texto: { ...tipografia.corpo, lineHeight: 24 },
  versao: tipografia.legenda,
});
