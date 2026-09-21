// Atividade 1 · Aula 4 — o item tocável da lista.
//
// Toque curto alterna o status; toque longo remove. O Card da Aula 3 é reaproveitado
// POR DENTRO do Pressable — quem recebe o toque é o Pressable, não o Card.
import { Pressable, StyleSheet, Text } from 'react-native';

import { CardHabito } from './CardHabito';
import { cores, espaco, tipografia } from '../theme';
import type { Habito } from '../types/habito';
import { corDoStatus, rotuloDoStatus } from '../utils/status-habito';

export type ItemHabitoProps = {
  habito: Habito;
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
};

export function ItemHabito({ habito, onAlternar, onRemover }: ItemHabitoProps) {
  return (
    <Pressable
      // TODO 4.6: toque curto chama `onAlternar`, toque longo chama `onRemover` — os dois
      //          com o id do hábito. Lembre do Exercício 4: quando o longo dispara,
      //          ele SUBSTITUI o curto naquele gesto. Isso é o comportamento desejado aqui.
      onPress={() => onAlternar(habito.id)}
      onLongPress={() => onRemover(habito.id)}
      // TODO 4.7: acessibilidade — o papel do elemento e o rótulo falado.
      //          O rótulo fixo mentiria: ele precisa descrever ESTE hábito.
      accessibilityRole="button"
      accessibilityLabel={`${habito.titulo}, status ${rotuloDoStatus(habito.status)}, ${habito.streakDias} dias`}
      // TODO 4.8: `hitSlop` e `unstable_pressDelay`. Justifique CADA valor num comentário —
      //          o que o usuário sente com o valor que você escolheu, e o que sentiria sem ele.
      // style={styles.item}
      hitSlop={{
        top: espaco.md,
        bottom: espaco.md,
        left: espaco.md,
        right: espaco.md,
      }}
      unstable_pressDelay={300}
      // TODO 4.9: `style` acima precisa virar uma função de `{ pressed }`, somando
      //          `itemPressionado` ao estilo base enquanto o dedo estiver no item.
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressionado,
      ]}
    >
      {/* TODO 4.10: reaproveite o <CardHabito> da Aula 3 aqui dentro, envolvendo os dois textos.
          Se o Card não couber (por exemplo, se o padding dele brigar com o toque),
          explique no README por que você mudou — mudar não é erro; mudar sem dizer, é. */}
      
      {/* <Text style={styles.titulo}>{habito.titulo}</Text>
      <Text style={[styles.legenda, { color: corDoStatus(habito.status) }]}>
        {habito.categoria} · {rotuloDoStatus(habito.status)} · {habito.streakDias} dias
      </Text> */}
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
    // TODO 4.11: o feedback visual do toque. Uma mudança, não três.
    opacity: 0.9,
    transform: [{ scale: 0.95 }],
  },
  titulo: tipografia.corpo,
  legenda: tipografia.legenda,
});
