import { StyleSheet, Text, View } from 'react-native';

import { HABITOS } from '../../data/habitos';
import { cores, espaco, tipografia } from '../../theme';

const concluidos = HABITOS.filter((habito) => habito.status === 'concluido').length;
const pendentes = HABITOS.filter((habito) => habito.status === 'pendente').length;

export default function TelaEstatisticas() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Seu progresso</Text>
      <Text style={styles.descricao}>Um passo de cada vez constrói uma rotina.</Text>

      <View style={styles.cartao}>
        <Text style={styles.valor}>{HABITOS.length}</Text>
        <Text style={styles.rotulo}>hábitos acompanhados</Text>
      </View>
      <View style={styles.linha}>
        <View style={[styles.cartao, styles.cartaoMetade]}>
          <Text style={[styles.valor, styles.valorSucesso]}>{concluidos}</Text>
          <Text style={styles.rotulo}>concluídos</Text>
        </View>
        <View style={[styles.cartao, styles.cartaoMetade]}>
          <Text style={styles.valor}>{pendentes}</Text>
          <Text style={styles.rotulo}>pendentes</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    gap: espaco.md,
    padding: espaco.lg,
    backgroundColor: cores.fundo,
  },
  titulo: { ...tipografia.titulo, fontSize: 28 },
  descricao: tipografia.corpo,
  cartao: {
    flex: 1,
    justifyContent: 'center',
    gap: espaco.xs,
    padding: espaco.lg,
    borderRadius: espaco.md,
    backgroundColor: cores.cartao,
  },
  linha: { flex: 1, flexDirection: 'row', gap: espaco.md },
  cartaoMetade: { alignItems: 'center' },
  valor: { fontSize: 32, fontWeight: '700', color: cores.primaria },
  valorSucesso: { color: cores.sucesso },
  rotulo: { ...tipografia.legenda, fontSize: 14 },
});
