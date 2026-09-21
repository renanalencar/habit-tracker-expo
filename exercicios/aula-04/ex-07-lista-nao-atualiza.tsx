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
// TODO 1: descreva o PRIMEIRO motivo — o que impede o `useState` de perceber a
//          mudança — e corrija `alternarSelecao`.
//          Pista: rode e olhe o contador "N selecionado(s)" no topo. Ele muda?
// R: O `useState` utiliza comparação de referência (`Object.is`). Como o código original estava mutando o mesmo objeto `Set` e chamando `setSelecionados` com a MESMA referência, o React não detecta nenhuma mudança e não re-renderiza a tela.
//
// TODO 2: descreva o SEGUNDO motivo — o que impede a FlatList de perceber a mudança
//          MESMO DEPOIS de corrigir o primeiro — e corrija.
//          Pista: depois do TODO 39 o contador passa a funcionar e os itens continuam parados.
//          Que prova a FlatList faz antes de decidir re-renderizar as linhas?
// R: A `FlatList` checa se as props `data` e `extraData` sofreram mudança de referência para re-renderizar. Como a prop `data` (`habitos`) não mudou e ela não estava sendo informada que deveria olhar para o Set `selecionados`, ela manteve os itens parados. Para resolver, usamos a prop `extraData={selecionados}`.
//
// TODO 3: existem DUAS correções possíveis para o segundo motivo. Escreva as duas e
//          diga qual você escolheria, com o motivo.
//          A pergunta que decide é sempre a mesma: isso é DADO DO DOMÍNIO ou ESTADO DE TELA?
//          Compare com o Exercício 5, onde a resposta certa foi a outra.
// R: 1) Usar `extraData={selecionados}` na FlatList; 2) Atualizar o array de `habitos` com cópias e alterá-los a cada seleção.
//    A escolha certa é a 1. A seleção (múltipla escolha visual) é puramente ESTADO DE TELA efêmero, portanto não deve mutar a lista que representa nosso DADO DO DOMÍNIO. No exercício 5, o toggle era DADO DO DOMÍNIO (status real), logo alteramos o array.
//
// TODO 4: falta ainda uma coisa neste arquivo que as regras da Aula 4 exigem. Qual?
//          Implemente.
// R: Faltava definir explicitamente a prop `keyExtractor` apontando para o `id` do hábito. O padrão procura por `.key`.
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { MOCK } from './dados-mock';
import type { Habito } from '../../src/types/habito';

export default function TelaSelecao() {
  const [habitos] = useState<Habito[]>(MOCK);
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());

  function alternarSelecao(id: string) {
    // TODO 1
    // selecionados.has(id) ? selecionados.delete(id) : selecionados.add(id);
    // setSelecionados(selecionados);
    setSelecionados((atuais) => {
      const novos = new Set(atuais);
      novos.has(id) ? novos.delete(id) : novos.add(id);
      return novos;
    });
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.contador}>{selecionados.size} selecionado(s)</Text>
      {/* TODO 2 e 4
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
      /> */}
      <FlatList
        data={habitos}
        extraData={selecionados}
        keyExtractor={(item) => item.id}
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
  tela: { flex: 1, backgroundColor: '#FEF7EE', padding: 16, borderRadius: 24 },
  contador: { fontSize: 16, fontWeight: '600', paddingBottom: 12 },
  conteudo: { gap: 8 },
  item: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12 },
});
