// Exercício 7 — Corrija: a lista que não atualiza
// Nível ⭐⭐⭐ · 5 min
//
// Para pré-visualizar: troque temporariamente o conteúdo renderizado dentro de
// <View style={styles.conteudo}> em App.tsx por <TelaSelecao />, e desfaça antes de entregar.
//
// Rode. NADA ACONTECE AO TOCAR. Há DOIS motivos independentes, e cada um exige
// uma correção diferente. O código abaixo está quebrado de propósito.
//
// ─────────────────────────────────────────────────────────────────────────────
// TODO 39: descreva o PRIMEIRO motivo — o que impede o `useState` de perceber a
//          mudança — e corrija `alternarSelecao`.
//          Pista: rode e olhe o contador "N selecionado(s)" no topo. Ele muda?
//
// TODO 40: descreva o SEGUNDO motivo — o que impede a FlatList de perceber a mudança
//          MESMO DEPOIS de corrigir o primeiro — e corrija.
//          Pista: depois do TODO 39 o contador passa a funcionar e os itens continuam parados.
//          Que prova a FlatList faz antes de decidir re-renderizar as linhas?
//
// TODO 41: existem DUAS correções possíveis para o segundo motivo. Escreva as duas e
//          diga qual você escolheria, com o motivo.
//          A pergunta que decide é sempre a mesma: isso é DADO DO DOMÍNIO ou ESTADO DE TELA?
//          Compare com o Exercício 5, onde a resposta certa foi a outra.
//
// TODO 42: falta ainda uma coisa neste arquivo que as regras da Aula 4 exigem. Qual?
//          Implemente.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { MOCK } from './dados-mock';
import type { Habito } from '../../src/types/habito';

export default function TelaSelecao() {
  const [habitos] = useState<Habito[]>(MOCK);
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());

  function alternarSelecao(id: string) {
    selecionados.has(id) ? selecionados.delete(id) : selecionados.add(id);
    setSelecionados(selecionados);
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.contador}>{selecionados.size} selecionado(s)</Text>
      <FlatList
        data={habitos}
        renderItem={({ item }) => (
          <Pressable onPress={() => alternarSelecao(item.id)} style={styles.item}>
            <Text>
              {selecionados.has(item.id) ? '☑' : '☐'} {item.titulo}
            </Text>
          </Pressable>
        )}
        contentContainerStyle={styles.conteudo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#FEF7EE', padding: 16 },
  contador: { fontSize: 16, fontWeight: '600', paddingBottom: 12 },
  conteudo: { gap: 8 },
  item: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12 },
});
