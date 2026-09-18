// Atividade 1 · Aula 4 — o botão de ação reutilizável.
//
// Substitui todo `<Button>` e todo `<Text onPress>` que sobrou da Aula 3.
// Precisa ser usado em PELO MENOS DOIS lugares da tela para valer a entrega.
import { Pressable, StyleSheet, Text } from 'react-native';

import { cores, espaco } from '../theme';

export type BotaoAcaoProps = {
  rotulo: string;
  onPressionar: () => void;
  desabilitado?: boolean;
};

export function BotaoAcao({ rotulo, onPressionar, desabilitado = false }: BotaoAcaoProps) {
  // TODO 48: traga a implementação que você fez no Exercício 3
  //          (`exercicios/aula-04/ex-03-botao-acao.tsx`, TODOs 7 a 14) e adapte-a:
  //          aqui NÃO pode haver hex solto — as cores vêm de `../theme`.
  //          São os mesmos oito pontos: a ação em `onPress`, `disabled`, `hitSlop`,
  //          `android_ripple`, papel e rótulo de acessibilidade, `style` como função
  //          de `{ pressed }`, e os dois estilos de variante abaixo.
  return (
    <Pressable style={styles.botao}>
      <Text style={styles.rotulo}>{rotulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: espaco.sm + espaco.xs,
    paddingHorizontal: espaco.md,
    borderRadius: espaco.sm,
    backgroundColor: cores.primaria,
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  botaoPressionado: {
    // TODO 49: como o botão fica ENQUANTO o dedo está nele. Visível, mas discreto.
  },
  botaoDesabilitado: {
    // TODO 50: aparência de desligado.
  },
  rotulo: { color: cores.cartao, fontSize: 16, fontWeight: '600' },
});
