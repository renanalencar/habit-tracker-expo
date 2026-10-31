import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CardHabito } from './CardHabito';
import { cores, espaco, tipografia } from '../theme';
import type { Habito } from '../types/habito';
import { rotuloDoStatus } from '../utils/status-habito';

export type ItemHabitoProps = {
  habito: Habito;
  onAbrir: (id: string) => void;
  onAlternar: (id: string) => void;
  onRemover: (id: string) => void;
};

// O leitor de tela não enxerga a miniatura nem lê a coordenada formatada: o rótulo
// precisa dizer, em palavras, o que a tela mostra em pixels.
function descrever(habito: Habito): string {
  const partes = [
    habito.titulo,
    `status ${rotuloDoStatus(habito.status)}`,
    `${habito.streakDias} dias`,
    habito.fotoUri ? 'com foto' : 'sem foto',
    habito.local ? `registrado com localização, precisão de ${Math.round(habito.local.precisaoMetros)} metros` : 'sem localização',
  ];

  return partes.join(', ');
}

export function ItemHabito({ habito, onAbrir, onAlternar, onRemover }: ItemHabitoProps) {
  return (
    <View style={styles.item}>
      <CardHabito
        titulo={habito.titulo}
        categoria={habito.categoria}
        status={habito.status}
        onPress={() => onAbrir(habito.id)}
        onLongPress={() => onRemover(habito.id)}
        destacado={habito.destacado}
        fotoUri={habito.fotoUri}
        local={habito.local}
        recyclingKey={habito.id}
      />
      <Pressable
        onPress={() => onAlternar(habito.id)}
        accessibilityRole="button"
        accessibilityLabel={`${descrever(habito)}. Toque para ${
          habito.status === 'concluido' ? 'marcar como pendente' : 'marcar como concluído'
        }`}
        style={({ pressed }) => [styles.botaoStatus, pressed && styles.botaoStatusPressionado]}
      >
        <Text style={styles.textoStatus}>
          {habito.status === 'concluido' ? 'Marcar como pendente' : 'Marcar como concluído'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    gap: espaco.sm,
  },
  botaoStatus: {
    alignSelf: 'flex-end',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: espaco.md,
    borderRadius: espaco.sm,
    backgroundColor: `${cores.primaria}14`,
  },
  botaoStatusPressionado: {
    opacity: 0.9,
  },
  textoStatus: {
    ...tipografia.legenda,
    color: cores.primaria,
    fontWeight: '700',
  },
});
