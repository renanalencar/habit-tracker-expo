// Exercício 5 — Complete: a `FlatList` inteira
// Nível ⭐⭐ · 10 min
//
// Para pré-visualizar: troque temporariamente o conteúdo renderizado dentro de
// <View style={styles.conteudo}> em App.tsx por <TelaHabitos />, e desfaça antes de entregar.
//
// CONFIRA, NESTA ORDEM:
//   1. A lista aparece?                          (Se não: `flex: 1`.)
//   2. Tocar num item risca o título?            (Se não: você mutou o objeto.)
//   3. "esvaziar a lista" mostra o estado vazio? (Se aparece só branco: TODO 19.)
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { MOCK } from './dados-mock';
import type { Habito } from '../../src/types/habito';

// TODO 1: o componente do separador entre itens — uma View de 10 px de altura, sem cor.
//          O estilo `separador` já existe lá embaixo; troque o `null` pelo elemento.
export function Separador() {
  // return null;
  return (
    <View style={styles.separador} />
  )
}

// TODO 2: o componente do estado vazio — um título e uma frase de apoio.
//          Este componente É AVALIADO: uma tela em branco parece bug.
//          A frase precisa dizer ao usuário O QUE FAZER, não só que a lista está vazia.
//          Estilos prontos: `vazio`, `vazioTitulo`, `legenda`.
export function ListaVazia() {
  // return null;
  return (
    <View style={styles.vazio}>
      <Text style={styles.vazioTitulo}>Nenhum hábito por aqui</Text>
      <Text style={styles.legenda}>Toque em "Novo hábito" para começar.</Text>
    </View>
  )
}

// TODO 3: o cabeçalho da lista. Declare-o AQUI FORA, de um jeito que NÃO remonte a cada render.
//          Dica: não precisa ser uma função — pode ser o elemento pronto.
//          (Com um <Text> ninguém percebe a diferença; com o TextInput de busca da
//          Atividade 1 lá dentro, o campo perderia o foco a cada tecla.)
function Cabecalho() {
  return <Text style={styles.cabecalho}>Hábitos de hoje</Text>;
}

// A troca de status mora FORA do componente, como função pura, para o Exercício 6
// poder reaproveitá-la. O enunciado escreve isso dentro da tela; aqui é o mesmo código,
// só que sem `useState` no meio.
export function alternarStatus(habitos: Habito[], id: string): Habito[] {
  // TODO 4: devolva um array NOVO em que o hábito de `id` alterna entre
  //          'pendente' e 'concluido'. Os demais passam intactos.
  //          ATENÇÃO: se a lista não mudar de aparência na tela, você mutou o objeto
  //          em vez de criar um novo — e a FlatList, que é PureComponent, não viu diferença.
  // return habitos;
  return habitos.map(habito => {
    if (habito.id === id) {
      return {
        ...habito,
        status: habito.status === 'pendente' ? 'concluido' : 'pendente'
      };
    }
    return habito;
  });
}

type ItemProps = { habito: Habito; onAlternar: (id: string) => void };

export function ItemHabito({ habito, onAlternar }: ItemProps) {
  const concluido = habito.status === 'concluido';

  return (
    <Pressable
      // TODO 5: chamar `onAlternar` com o id do hábito — no callback CERTO.
      onPress={() => onAlternar(habito.id)}
      // TODO 6: evitar que o item pisque quando o dedo só está começando a rolar a lista.
      unstable_pressDelay={80}
      style={({pressed}) => [styles.item, pressed && styles.itemPressionado]}
      // TODO 7: `style` acima precisa virar uma função que recebe `{ pressed }` e soma
      //          `itemPressionado` ao estilo base enquanto o dedo estiver no item.
    >
      <View style={styles.itemTexto}>
        <Text style={[styles.titulo, concluido && styles.tituloConcluido]}>{habito.titulo}</Text>
        <Text style={styles.legenda}>
          {habito.categoria} · {habito.streakDias} dias
        </Text>
      </View>
      <Text style={styles.marcador}>{concluido ? '✓' : '○'}</Text>
    </Pressable>
  );
}

export function TelaHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>(MOCK);

  function alternar(id: string) {
    setHabitos((atuais) => alternarStatus(atuais, id));
  }

  return (
    <View style={styles.tela}>
      <FlatList
        data={habitos}
        renderItem={({ item }) => <ItemHabito habito={item} onAlternar={alternar} />}
        // TODO 8: precisa de `keyExtractor` aqui? Responda em um comentário de UMA LINHA,
        //          logo abaixo, com o motivo. (Cuidado: a resposta óbvia não é a certa —
        //          olhe o que o extractor padrão procura no item, e o que o `Habito` tem.)
        keyExtractor={item => item.id}
        // TODO 9: ligue o separador (TODO 1), o estado vazio (TODO 2) e o cabeçalho (TODO 3).
        //          São três props; nenhuma delas é `renderItem`.
        ItemSeparatorComponent={Separador}
        ListEmptyComponent={ListaVazia}
        ListHeaderComponent={Cabecalho}
        contentContainerStyle={styles.conteudo}
      />
      <Text style={styles.limpar} onPress={() => setHabitos([])}>
        esvaziar a lista
      </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#FEF7EE', borderRadius: 24 },
  conteudo: { padding: 16, paddingBottom: 32 },
  cabecalho: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  itemPressionado: { backgroundColor: '#F3E9DC' },
  itemTexto: { flex: 1, gap: 2 },
  titulo: { fontSize: 16, fontWeight: '600', color: '#191919' },
  tituloConcluido: { textDecorationLine: 'line-through', color: '#6b6459' },
  legenda: { fontSize: 13, color: '#6b6459' },
  marcador: { fontSize: 20, color: '#FF6002' },
  separador: { height: 10 },
  vazio: { alignItems: 'center', gap: 6, paddingVertical: 48 },
  vazioTitulo: { fontSize: 17, fontWeight: '600', color: '#191919' },
  limpar: { textAlign: 'center', padding: 12, color: '#6b6459', textDecorationLine: 'underline' },
});
