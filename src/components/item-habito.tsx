import { Pressable, StyleSheet, Text } from 'react-native';

import { CardHabito } from './CardHabito';
import { cores, espaco, tipografia } from '../theme';
import type { Habito } from '../types/habito';
import { rotuloDoStatus } from '../utils/status-habito';

export type ItemHabitoProps = {
  habito: Habito;
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
};

export function ItemHabito({ habito, onAlternar, onRemover }: ItemHabitoProps) {
  return (
    <Pressable
      onPress={() => onAlternar(habito.id)}
      onLongPress={() => onRemover(habito.id)}
      accessibilityRole="button"
      accessibilityLabel={`${habito.titulo}, status ${rotuloDoStatus(habito.status)}, ${habito.streakDias} dias`}
      hitSlop={{
        top: espaco.md,
        bottom: espaco.md,
        left: espaco.md,
        right: espaco.md,
      }}
      unstable_pressDelay={300}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressionado,
      ]}
    >      
      {/* TODO 5.23: o <CardHabito> agora aceita `fotoUri`, `local` e `recyclingKey`.
          Repasse os três a partir do `habito`.
          O `recyclingKey` não é opcional por preguiça: sem ele, a célula reciclada pela
          SectionList mostra a foto do item ANTERIOR durante a rolagem — o usuário vê a
          foto errada ao lado do título certo.
          Pense também se o `accessibilityLabel` ainda está completo depois disso. */}
      <CardHabito
        titulo={habito.titulo}
        categoria={habito.categoria}
        status={habito.status}
        onPress={() => onAlternar(habito.id)}
        destacado={habito.destacado}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: cores.cartao,
    borderRadius: espaco.sm,
    padding: espaco.md,
    gap: espaco.xs,
  },
  itemPressionado: {
    opacity: 0.9,
    transform: [{ scale: 0.95 }],
  },
  titulo: tipografia.corpo,
  legenda: tipografia.legenda,
});
