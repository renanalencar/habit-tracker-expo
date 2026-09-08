import { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

// import { cores, espaco } from '../theme'; // TODO: descomente ao usar os tokens no TODO 8

type CardProps = {
  children: ReactNode;
  // TODO 5: a prop opcional que muda a aparência do card
};

export function Card({ children /* TODO 6: desestruture a prop do TODO 5 aqui */ }: CardProps) {
  // TODO 7: troque `styles.card` por um array — base sempre, variante só quando a prop for true.
  //         Cuidado: com ternário você TROCA o estilo; com array você SOMA.
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    // TODO 8: padding, borderRadius e backgroundColor — TODOS vindos de `cores` e `espaco` (../theme).
    //         Nenhum hex e nenhum número solto neste arquivo.
    // TODO 9: sombra com boxShadow (uma linha) e espaçamento interno com gap.
  },
  cardDestacado: {
    // TODO 10: o que muda no destaque? Borda? Fundo? Escolha e justifique no README.
  },
});
