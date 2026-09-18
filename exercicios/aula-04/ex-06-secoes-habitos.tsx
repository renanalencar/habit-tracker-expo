// Exercício 6 — Complete: `SectionList` a partir de dados planos
// Nível ⭐⭐ · 7 min
//
// Reaproveita o mesmo MOCK e o mesmo ItemHabito do Exercício 5 — de propósito.
// Para pré-visualizar: troque temporariamente o conteúdo renderizado dentro de
// <View style={styles.conteudo}> em App.tsx por <TelaSecoesDemo />, e desfaça antes de entregar.
import { useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import { MOCK } from './dados-mock';
import { ItemHabito, ListaVazia, alternarStatus } from './ex-05-lista-habitos';
import type { Habito, StatusHabito } from '../../src/types/habito';

type Secao = { title: string; data: Habito[] };

function agruparPorStatus(habitos: Habito[]): Secao[] {
  const rotulos: Record<StatusHabito, string> = {
    // TODO 27: um rótulo legível por status. O usuário lê isto, não o valor do enum.
    pendente: '',
    concluido: '',
    pulado: '',
  };

  // TODO 28: a ordem em que os grupos aparecem na tela. Isso é uma DECISÃO, não um detalhe —
  //          escreva num comentário qual você escolheu e por quê.
  //          (Ordem alfabética é uma escolha. Só raramente é a boa.)
  const ordem: StatusHabito[] = [];

  // TODO 29: monte o array de seções a partir de `ordem` e `rotulos`.
  //          Cada seção precisa do campo OBRIGATÓRIO da API (aquele que a SectionList lê
  //          para saber quais itens renderizar) e do campo que VOCÊ inventou para o título.
  // TODO 30: não exibir grupo vazio. Uma linha, encadeada no TODO 29.
  return [];
}

type TelaSecoesProps = {
  habitos: Habito[];
  onAlternar: (id: string) => void;
};

export function TelaSecoes({ habitos, onAlternar }: TelaSecoesProps) {
  // TODO 31: as seções saem de `agruparPorStatus(habitos)`, não deste array vazio.
  const secoes: Secao[] = [];

  return (
    <View style={styles.tela}>
      <SectionList
        sections={secoes}
        // TODO 32: renderItem — reaproveite o `ItemHabito` do Exercício 5, sem mudá-lo.
        // TODO 33: renderSectionHeader — leia o campo que você inventou no TODO 29.
        //          Estilo pronto: `cabecalhoSecao`.
        // TODO 34: renderSectionFooter — "N hábito(s)".
        //          Dica: a seção conhece o próprio conjunto de itens. Estilo: `rodapeSecao`.
        // TODO 35: fazer o cabeçalho grudar no topo — nas DUAS plataformas.
        //          Não confie no default: ele é diferente em cada uma.
        // TODO 36: estado vazio (regra 8: toda lista tem um). Reaproveite o do Exercício 5.
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
// TODO 37: escreva aqui por que a cor de fundo é NECESSÁRIA (não decorativa) neste caso.
//
// TODO 38 (pergunta final): você precisou mudar ALGUMA COISA dentro do `ItemHabito`
//          para ele funcionar no SectionList? O que isso te diz sobre a diferença
//          entre FlatList e SectionList?
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#FEF7EE' },
  conteudo: { padding: 16, paddingBottom: 32 },
  cabecalhoSecao: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#6b6459',
    backgroundColor: '#FEF7EE',
    paddingVertical: 8,
  },
  rodapeSecao: { fontSize: 12, color: '#6b6459', paddingBottom: 16 },
});
