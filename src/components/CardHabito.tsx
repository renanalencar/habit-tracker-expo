import { Pressable, StyleSheet, Text, View } from 'react-native';
// Aula 5 — CUIDADO COM ESTE IMPORT: `react-native` também exporta um `Image`.
// O do `expo-image` é o que tem cache em disco, `contentFit`, `placeholder`,
// `transition` e `recyclingKey`. O outro não tem nenhum dos cinco.
import { Image } from 'expo-image';

import type { Habito } from '../types/habito';
import { corDoStatus, rotuloDoStatus } from '../utils/status-habito';
import { formatarLocal } from '../lib/formatar-local';
import { cores, espaco, tipografia } from '../theme';

export type CardHabitoProps = Pick<Habito, 'titulo' | 'categoria' | 'status'> & {
  onPress: () => void;
  destacado?: boolean;
  // Aula 5 — os dois novos campos do domínio. Opcionais aqui pelo mesmo motivo que são
  // opcionais no tipo: o usuário pode ter negado a câmera, o GPS, ou os dois.
  fotoUri?: Habito['fotoUri'];
  local?: Habito['local'];
  /** O id do hábito, usado como `recyclingKey` da foto. */
  recyclingKey?: string;
};

export function CardHabito({
  titulo,
  categoria,
  status,
  onPress,
  destacado = false,
  fotoUri,
  local,
  recyclingKey,
}: CardHabitoProps) {
  return (
    <Pressable onPress={onPress} style={[styles.card, destacado && styles.destaque]}>
      {fotoUri ? (
        <Image
          source={{ uri: fotoUri }}
          style={styles.miniatura}
          contentFit="cover"
          transition={200}
          recyclingKey={recyclingKey}
          accessibilityLabel={`Foto do hábito ${titulo}`}
        />
      ) : (
        // Hábito sem foto ainda é um hábito: o espaço é reservado do mesmo tamanho para
        // que a lista não fique com cards de alturas diferentes.
        <View style={[styles.miniatura, styles.miniaturaVazia]} />
      )}

      <View style={styles.corpo}>
        <Text style={tipografia.titulo} numberOfLines={2}>
          {titulo}
        </Text>
        <Text style={[styles.meta, { color: corDoStatus(status) }]}>
          {categoria} · {rotuloDoStatus(status)}
        </Text>

        {/* TODO 5.1: quando houver local, mostre-o de forma legível para HUMANOS,
                  incluindo o raio de precisão. Coordenada crua com 14 casas
                  decimais não é informação para o usuário.
                  A formatação é função pura e mora em `lib/formatar-local.ts`
                  (TODO 5.2) — não escreva a formatação aqui dentro. */}

        {/* A formatação é função pura e mora em `lib/formatar-local.ts`: o card só
            decide SE mostra, não COMO. Sem local, nada é renderizado — um hábito sem
            local ainda é um hábito. */}
        {local && (
          <Text style={styles.local} numberOfLines={1}>
            {formatarLocal(local)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cores.cartao,
    borderRadius: espaco.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cores.textoFraco,
    padding: espaco.md,
    gap: espaco.sm,
  },
  destaque: {
    borderColor: cores.primaria,
    borderWidth: 2,
  },
  miniatura: {
    width: 64,
    height: 64,
    borderRadius: espaco.sm,
    backgroundColor: cores.fundo,
  },
  miniaturaVazia: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cores.textoFraco,
    borderStyle: 'dashed',
  },
  corpo: { flex: 1, gap: espaco.xs },
  meta: {
    fontSize: tipografia.legenda.fontSize,
    textTransform: 'capitalize',
  },
  local: tipografia.legenda,
});
