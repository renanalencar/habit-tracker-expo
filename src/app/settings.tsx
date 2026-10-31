import { StyleSheet, Text, View } from 'react-native';

import { cores, espaco, tipografia } from '../theme';

export default function Configuracoes() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Configurações</Text>
      <Text style={styles.texto}>
        Os lembretes usam notificações locais e são agendados no seu dispositivo.
      </Text>
      <Text style={styles.dica}>
        Para alterar permissões, abra as configurações do sistema e escolha este aplicativo.
      </Text>
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
  texto: tipografia.corpo,
  dica: tipografia.legenda,
});
