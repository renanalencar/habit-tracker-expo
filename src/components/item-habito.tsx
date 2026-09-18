// Atividade 1 · Aula 4 — o item tocável da lista.
//
// Toque curto alterna o status; toque longo remove. O Card da Aula 3 é reaproveitado
// POR DENTRO do Pressable — quem recebe o toque é o Pressable, não o Card.
import { Pressable, StyleSheet, Text } from 'react-native';

import { Card } from './Card';
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
      // TODO 51: toque curto chama `onAlternar`, toque longo chama `onRemover` — os dois
      //          com o id do hábito. Lembre do Exercício 4: quando o longo dispara,
      //          ele SUBSTITUI o curto naquele gesto. Isso é o comportamento desejado aqui.
      // TODO 52: acessibilidade — o papel do elemento e o rótulo falado.
      //          O rótulo fixo mentiria: ele precisa descrever ESTE hábito.
      // TODO 53: `hitSlop` e `unstable_pressDelay`. Justifique CADA valor num comentário —
      //          o que o usuário sente com o valor que você escolheu, e o que sentiria sem ele.
      style={styles.item}
      // TODO 54: `style` acima precisa virar uma função de `{ pressed }`, somando
      //          `itemPressionado` ao estilo base enquanto o dedo estiver no item.
    >
      {/* TODO 55: reaproveite o <Card> da Aula 3 aqui dentro, envolvendo os dois textos.
          Se o Card não couber (por exemplo, se o padding dele brigar com o toque),
          explique no README por que você mudou — mudar não é erro; mudar sem dizer, é. */}
      <Text style={styles.titulo}>{habito.titulo}</Text>
      <Text style={[styles.legenda, { color: corDoStatus(habito.status) }]}>
        {habito.categoria} · {rotuloDoStatus(habito.status)} · {habito.streakDias} dias
      </Text>
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
    // TODO 56: o feedback visual do toque. Uma mudança, não três.
  },
  titulo: tipografia.corpo,
  legenda: tipografia.legenda,
});
