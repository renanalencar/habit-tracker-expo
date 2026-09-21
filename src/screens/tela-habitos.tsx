// Atividade 1 · Aula 4 — a tela principal: a lista de verdade.
//
// Ainda não está ligada a nenhuma navegação — a Aula 4 não cobre isso.
// Para pré-visualizar enquanto você desenvolve: troque temporariamente o conteúdo
// renderizado dentro de <View style={styles.conteudo}> em App.tsx por <TelaHabitos />,
// e desfaça a troca antes de entregar (ou promova-a, se a tela já for a principal).
//
// RESTRIÇÕES DA ENTREGA (é aqui que a nota se decide):
//   - Nenhuma ScrollView envolvendo a lista. Conteúdo antes/depois vai em
//     ListHeaderComponent / ListFooterComponent.
//   - Nenhuma mutação de estado. Toda mudança cria array novo e objeto novo.
//   - Nenhum <Button> nem <Text onPress> onde o Pressable é a resposta.
//   - Nenhum `margin` para espaçar itens de lista.
//   - Nenhum `any`.
//   - Agrupar e filtrar moram em `src/lib/`, não aqui.
import { useState } from 'react';
import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';

import { BotaoAcao } from '../components/botao-acao';
import { ItemHabito } from '../components/item-habito';
import { ListaVazia } from '../components/lista-vazia';
import { HABITOS } from '../data/habitos';
import { agrupar, filtrarPorTitulo, type Secao } from '../lib/agrupar';
import { cores, espaco, tipografia } from '../theme';
import type { Habito } from '../types/habito';

// TODO 4.14: o cabeçalho da lista — o <TextInput> de busca, com `styles.busca`.
//          Ele precisa ser declarado DE UM JEITO QUE NÃO REMONTE a cada render, senão
//          o campo perde o foco a cada tecla digitada. Esse é o sintoma exato do erro;
//          se você vir o teclado fechando sozinho, é isto.
//          (Uma arrow anônima em `ListHeaderComponent={() => <.../>}` é o jeito errado.)
function Cabecalho({busca, onBuscaChange}: {busca: string; onBuscaChange: (busca: string) => void;}) {
  return (
    <TextInput
      style={styles.busca}
      placeholder="Buscar hábito"
      value={busca}
      onChangeText={onBuscaChange}
    />
);
}

export function TelaHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>(HABITOS);
  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);

  function alternar(id: string) {
    // TODO 4.15: alternar o status do hábito — array NOVO, objeto NOVO. Nada de mutação.
    //          Se a tela não mudar ao tocar, você mutou.
    setHabitos((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, status: h.status === 'pendente' ? 'concluido' : 'pendente' }
          : h
      )
    );
  }

  function remover(id: string) {
    // TODO 4.16: remover o hábito da lista — array novo.
    setHabitos((prev) => prev.filter((h) => h.id !== id));
  }

  function recarregar() {
    // TODO 4.17: volta ao mock e limpa a busca. Ligue `atualizando` durante a operação
    //          e desligue ao final, senão o indicador de refresh nunca some.
    setAtualizando(true);
    setHabitos(HABITOS);
    setBusca('');
    setAtualizando(false);
  }

  // TODO 4.18: filtrar E ENTÃO agrupar — nesta ordem, usando as funções de `../lib/agrupar`.
  //          A ordem importa e é uma das três perguntas do README (TODO 72).
  //          Dica de por que importa: pense no que acontece com um grupo cujos itens
  //          foram todos descartados pelo filtro.
  // const secoes: Secao[] = [];
  const secoes = agrupar(filtrarPorTitulo(habitos, busca));

  return (
    <View style={styles.tela}>
      <SectionList
        sections={secoes}
        // TODO 4.19: renderItem — o <ItemHabito>, recebendo `alternar` e `remover`.
        renderItem={({ item }) => (
          <ItemHabito
            habito={item}
            onAlternar={alternar}
            onRemover={remover}
          />
        )}
        // TODO 4.20: renderSectionHeader — o título da seção, com `styles.cabecalhoSecao`.
        //          A cor de fundo dele não é decoração: sem ela, o conteúdo passa por
        //          baixo do cabeçalho grudado e o texto vira uma sopa ilegível.
        renderSectionHeader={({ section }) => (
          <Text style={styles.cabecalhoSecao}>{section.title}</Text>
        )}
        // TODO 4.21: separador entre itens — `ItemSeparatorComponent`, nunca `margin`.
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        // TODO 4.22: ListEmptyComponent — a <ListaVazia>, recebendo o que ela precisa para
        //          distinguir "primeiro acesso" de "busca sem resultado" (TODO 4.21).
        ListEmptyComponent={() => <ListaVazia primeiroAcesso={false} onLimparBusca={recarregar} />}
        // TODO 4.23: `stickySectionHeadersEnabled` — declare explicitamente.
        //          O default é diferente em iOS e Android; não deixe a decisão de produto
        //          para o sistema operacional.
        stickySectionHeadersEnabled
        // TODO 4.24: `refreshing` e `onRefresh` — o estado "atualizando" da lista.
        refreshing={atualizando}
        onRefresh={recarregar}
        // TODO 4.25: ligue aqui o cabeçalho de busca declarado lá em cima.
        ListHeaderComponent={<Cabecalho busca={busca} onBuscaChange={setBusca} />}
        contentContainerStyle={styles.conteudo}
      />

      {/* TODO 1.26: o <BotaoAcao> precisa aparecer em PELO MENOS DOIS lugares desta tela,
          substituindo qualquer <Button> ou <Text onPress> que tenha sobrado da Aula 3.
          Sugestões: "Novo hábito" aqui no rodapé e "Limpar busca" dentro da <ListaVazia>. */}
        <BotaoAcao
          rotulo="Novo hábito"
          onPressionar={recarregar}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, borderRadius: espaco.lg },
  conteudo: { padding: espaco.md, paddingBottom: espaco.lg },
  busca: {
    borderWidth: 1,
    borderColor: cores.textoFraco,
    borderRadius: espaco.sm,
    padding: espaco.sm,
    marginBottom: espaco.sm,
    backgroundColor: cores.cartao,
    fontSize: 16,
  },
  cabecalhoSecao: {
    ...tipografia.legenda,
    fontWeight: '700',
    textTransform: 'uppercase',
    backgroundColor: cores.fundo,
    paddingVertical: espaco.sm,
  },
  separador: { height: espaco.sm },
  rodape: { padding: espaco.md, gap: espaco.sm },
});
