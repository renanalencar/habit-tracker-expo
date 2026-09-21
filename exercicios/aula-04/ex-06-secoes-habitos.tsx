// Exercício 6 — Complete: `SectionList` a partir de dados planos
// Nível ⭐⭐ · 7 min
//
// Reaproveita o mesmo MOCK e o mesmo ItemHabito do Exercício 5 — de propósito.
// Para pré-visualizar: troque temporariamente o conteúdo renderizado dentro de
// <View style={styles.conteudo}> em App.tsx por <TelaSecoesDemo />, e desfaça antes de entregar.
import { useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import { MOCK } from './dados-mock';
import { ItemHabito, ListaVazia, alternarStatus, Separador } from './ex-05-lista-habitos';
import type { Habito, StatusHabito } from '../../src/types/habito';

type Secao = { title: string; data: Habito[] };

function agruparPorStatus(habitos: Habito[]): Secao[] {
  const rotulos: Record<StatusHabito, string> = {
    // TODO 1: um rótulo legível por status. O usuário lê isto, não o valor do enum.
    pendente: 'Pendentes',
    concluido: 'Concluido',
    pulado: 'Pulado',
  };

  // TODO 2: a ordem em que os grupos aparecem na tela. Isso é uma DECISÃO, não um detalhe —
  //          escreva num comentário qual você escolheu e por quê.
  //          (Ordem alfabética é uma escolha. Só raramente é a boa.)
  const ordem: StatusHabito[] = ['pendente', 'concluido', 'pulado'];
  // TODO 3: monte o array de seções a partir de `ordem` e `rotulos`.
  //          Cada seção precisa do campo OBRIGATÓRIO da API (aquele que a SectionList lê
  //          para saber quais itens renderizar) e do campo que VOCÊ inventou para o título.
  const secoes = ordem.map((status) => ({
    title: rotulos[status],
    data: habitos.filter((h) => h.status === status),
  }));
  // TODO 4: não exibir grupo vazio. Uma linha, encadeada no TODO 2.
  return secoes.filter((secao) => secao.data.length > 0);
}

type TelaSecoesProps = {
  habitos: Habito[];
  onAlternar: (id: string) => void;
};

export function TelaSecoes({ habitos, onAlternar }: TelaSecoesProps) {
  // TODO 5: as seções saem de `agruparPorStatus(habitos)`, não deste array vazio.
  const secoes = agruparPorStatus(habitos);

  return (
    <View style={styles.tela}>
      <SectionList
        sections={secoes}
        // TODO 6: renderItem — reaproveite o `ItemHabito` do Exercício 5, sem mudá-lo.
        renderItem={({ item }) => <ItemHabito habito={item} onAlternar={onAlternar} />}
        // TODO 7: renderSectionHeader — leia o campo que você inventou no TODO 2.
        //          Estilo pronto: `cabecalhoSecao`.
        renderSectionHeader={({ section }) => (
          <Text style={styles.cabecalhoSecao}>{section.title}</Text>
        )}
        // TODO 8: renderSectionFooter — "N hábito(s)".
        //          Dica: a seção conhece o próprio conjunto de itens. Estilo: `rodapeSecao`.
        renderSectionFooter={({ section }) => (
          <Text style={styles.rodapeSecao}>
            {section.data.length} hábito{section.data.length !== 1 ? 's' : ''}
          </Text>
        )}
        // TODO 9: fazer o cabeçalho grudar no topo — nas DUAS plataformas (Android e iOS).
        //          Não confie no default: ele é diferente em cada uma.
        stickySectionHeadersEnabled={true}
        // TODO 10: estado vazio (regra 8: toda lista tem um). Reaproveite o do Exercício 5.
        ItemSeparatorComponent={Separador}
        ListEmptyComponent={ListaVazia}
        contentContainerStyle={styles.conteudo}
      />
    </View>
  );
}

// Wrapper só para pré-visualizar este arquivo direto do App.tsx.
export default function TelaSecoesDemo() {
  const [habitos, setHabitos] = useState<Habito[]>(MOCK);

  return (
    <TelaSecoes
      habitos={habitos}
      onAlternar={(id) => setHabitos((atuais) => alternarStatus(atuais, id))}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIRA: `cabecalhoSecao` tem `backgroundColor` de propósito.
// Remova-o, role a lista e veja o que acontece com o cabeçalho grudado.
//
// TODO 11: escreva aqui por que a cor de fundo é NECESSÁRIA (não decorativa) neste caso.
// Porque sem ela o fundo seria transparente e os itens da lista ficariam visíveis atrás
// do cabeçalho enquanto a lista é rolada, deixando o texto ilegível.
//
// TODO 12 (pergunta final): você precisou mudar ALGUMA COISA dentro do `ItemHabito`
//          para ele funcionar no SectionList? O que isso te diz sobre a diferença
//          entre FlatList e SectionList?
// Não foi preciso mudar nada. Isso mostra que tanto FlatList quanto SectionList
// utilizam a mesma assinatura de renderização de item (recebendo { item }), diferindo
// apenas na forma de agrupar os dados e renderizar os cabeçalhos.
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#FEF7EE', borderRadius: 24 },
  conteudo: { padding: 16, paddingBottom: 32 },
  cabecalhoSecao: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#6b6459',
    backgroundColor: '#FEF7EE',
    paddingVertical: 8,
  },
  rodapeSecao: { fontSize: 12, color: '#6b6459', paddingTop: 8, paddingBottom: 16 },
  limpar: { textAlign: 'center', padding: 12, color: '#6b6459', textDecorationLine: 'underline' },
});
