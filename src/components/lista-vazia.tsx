// Atividade 1 · Aula 4 — o estado vazio da lista.
//
// São DOIS vazios diferentes, e o usuário precisa saber em qual deles está:
//   - primeiro acesso: ainda não existe nenhum hábito;
//   - busca sem resultado: existem hábitos, mas nenhum casa com o termo digitado.
// Repetir a mesma frase nos dois casos é erro de produto, e é cobrado na avaliação.
import { StyleSheet, Text, View } from 'react-native';

import { cores, espaco, tipografia } from '../theme';

type ListaVaziaProps = {
  // TODO 57: declare a prop (ou as props) que permitem distinguir os dois casos.
  //          Pense no que o TODO 58 precisa ter em mãos para mencionar o termo procurado.
};

export function ListaVazia(props: ListaVaziaProps) {
  // TODO 58: dois textos diferentes — um título e uma frase de apoio em cada caso.
  //          O do primeiro acesso diz ao usuário O QUE FAZER para sair dali.
  //          O da busca MENCIONA o termo procurado e sugere a saída (limpar a busca).
  return (
    <View style={styles.vazio}>
      <Text style={styles.titulo}>—</Text>
      <Text style={styles.apoio}>—</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  vazio: { alignItems: 'center', gap: espaco.xs, paddingVertical: espaco.lg * 2 },
  titulo: { ...tipografia.corpo, fontWeight: '600', color: cores.texto },
  apoio: { ...tipografia.legenda, textAlign: 'center' },
});
