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
  // TODO 4.13: traga a implementação que você fez no Exercício 3
  //          (`exercicios/aula-04/ex-03-botao-acao.tsx`, TODOs 7 a 14) e adapte-a:
  //          aqui NÃO pode haver hex solto — as cores vêm de `../theme`.
  //          São os mesmos oito pontos: a ação em `onPress`, `disabled`, `hitSlop`,
  //          `android_ripple`, papel e rótulo de acessibilidade, `style` como função
  //          de `{ pressed }`, e os dois estilos de variante abaixo.
  // return (
  //   <Pressable style={styles.botao}>
  //     <Text style={styles.rotulo}>{rotulo}</Text>
  //   </Pressable>
  // );
    return (
    <Pressable
      style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
      onPress={onPressionar}
      disabled={desabilitado}
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      hitSlop={{ top: espaco.md, bottom: espaco.md, left: espaco.md, right: espaco.md }}
      android_ripple={{ color: 'rgba(255,255,255,0.2)', foreground: true }}
    >
      <Text style={styles.rotulo}>{rotulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    paddingVertical: espaco.sm + espaco.xs,
    paddingHorizontal: espaco.md,
    borderRadius: espaco.lg,
    backgroundColor: cores.primaria,
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    marginVertical: espaco.xs,  
  },
  botaoPressionado: {
    // TODO 4.14: como o botão fica ENQUANTO o dedo está nele. Visível, mas discreto.
    opacity: 0.8,
  },
  botaoDesabilitado: {
    // TODO 4.15: aparência de desligado.
    opacity: 0.5,
  },
  rotulo: { color: cores.cartao, fontSize: 16, fontWeight: '600' },
});
