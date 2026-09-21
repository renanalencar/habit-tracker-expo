import { Pressable, StyleSheet, Text } from 'react-native';

import type { Habito } from '../types/habito';
import { corDoStatus, rotuloDoStatus } from '../utils/status-habito';
import { cores, espaco, tipografia } from '../theme';

export type CardHabitoProps = Pick<Habito, 'titulo' | 'categoria' | 'status'> & {
  onPress: () => void;
  // TODO 5: a prop opcional que muda a aparência do card
  destacado?: boolean;
};

export function CardHabito({
  titulo,
  categoria,
  status,
  onPress,
  destacado = false, /* TODO 6: desestruture a prop do TODO 5 aqui */
}: CardHabitoProps) {
    // TODO 7: troque `styles.card` por um array — base sempre, variante só quando a prop for true.
  //         Cuidado: com ternário você TROCA o estilo; com array você SOMA.
  return (
    <Pressable onPress={onPress} style={[styles.card, destacado && styles.destaque]}>
      <Text style={tipografia.titulo}>{titulo}</Text>
      <Text style={[styles.meta, { color: corDoStatus(status) }]}>
        {categoria} · {rotuloDoStatus(status)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    // TODO 8: padding, borderRadius e backgroundColor — TODOS vindos de `cores` e `espaco` (../theme).
    //         Nenhum hex e nenhum número solto neste arquivo.
    backgroundColor: cores.cartao,
    borderRadius: espaco.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
    padding: espaco.md,
    gap: espaco.xs,
  },
  destaque: {
    // TODO 10: o que muda no destaque? Borda? Fundo? Escolha e justifique no README.
    borderColor: cores.primaria,
    borderWidth: 2,
  },
  meta: {
    fontSize: tipografia.legenda.fontSize,
    textTransform: 'capitalize',
  },
});
