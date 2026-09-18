import { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { cores, espaco } from '../theme'; // TODO: descomente ao usar os tokens no TODO 8

type CardProps = {
  children: ReactNode;
  // TODO 5: a prop opcional que muda a aparência do card
  destacado?: boolean;
};

export function Card({ children, destacado /* TODO 6: desestruture a prop do TODO 5 aqui */ }: CardProps) {
  // TODO 7: troque `styles.card` por um array — base sempre, variante só quando a prop for true.
  //         Cuidado: com ternário você TROCA o estilo; com array você SOMA.
  return <View style={[styles.card, destacado && styles.cardDestacado]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    // TODO 8: padding, borderRadius e backgroundColor — TODOS vindos de `cores` e `espaco` (../theme).
    //         Nenhum hex e nenhum número solto neste arquivo.
    padding: espaco.md,
    borderRadius: espaco.sm,
    backgroundColor: cores.cartao,
    // TODO 9: sombra com boxShadow (uma linha) e espaçamento interno com gap.
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    gap: espaco.sm,
  },
  cardDestacado: {
    // TODO 10: o que muda no destaque? Borda? Fundo? Escolha e justifique no README.
    borderColor: cores.primaria,
    borderWidth: 2,
  },
});
