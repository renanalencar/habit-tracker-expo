import { Pressable, StyleSheet, Text } from 'react-native';

import type { Habito } from '../types/habito';
import { corDoStatus, rotuloDoStatus } from '../utils/status-habito';

/**
 * Ex. 4 — props tipadas sem nenhum `any`.
 *
 * `titulo`, `categoria` e `status` vêm de `Habito` via `Pick`, então o card
 * acompanha automaticamente mudanças no domínio. `status` aceita apenas os
 * literais de `StatusHabito` — `status="PENDENTE"` não compila; `onPress`
 * é obrigatório, então omitir a prop também não compila.
 */
export type CardHabitoProps = Pick<Habito, 'titulo' | 'categoria' | 'status'> & {
  onPress: () => void;
  destacado?: boolean;
};

export function CardHabito({
  titulo,
  categoria,
  status,
  onPress,
  destacado = false,
}: CardHabitoProps) {
  return (
    <Pressable onPress={onPress} style={[styles.card, destacado && styles.destaque]}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={[styles.meta, { color: corDoStatus(status) }]}>
        {categoria} · {rotuloDoStatus(status)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
    padding: 16,
    gap: 4,
  },
  destaque: {
    borderColor: '#1e88e5',
    borderWidth: 2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
});
