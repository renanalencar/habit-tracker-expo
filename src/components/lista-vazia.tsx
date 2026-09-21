// Atividade 1 · Aula 4 — o estado vazio da lista.
//
// São DOIS vazios diferentes, e o usuário precisa saber em qual deles está:
//   - primeiro acesso: ainda não existe nenhum hábito;
//   - busca sem resultado: existem hábitos, mas nenhum casa com o termo digitado.
// Repetir a mesma frase nos dois casos é erro de produto, e é cobrado na avaliação.
import { StyleSheet, Text, View } from 'react-native';

import { cores, espaco, tipografia } from '../theme';
import { BotaoAcao } from './botao-acao';

type ListaVaziaProps = {
  // TODO 4.12: declare a prop (ou as props) que permitem distinguir os dois casos.
  //          Pense no que o TODO 4.12 precisa ter em mãos para mencionar o termo procurado.
  primeiroAcesso: boolean;
  termo?: string;
  onLimparBusca: () => void;
};

export function ListaVazia(props: ListaVaziaProps) {
  // TODO 4.13: dois textos diferentes — um título e uma frase de apoio em cada caso.
  //          O do primeiro acesso diz ao usuário O QUE FAZER para sair dali.
  //          O da busca MENCIONA o termo procurado e sugere a saída (limpar a busca).
  // return (
  //   <View style={styles.vazio}>
  //     <Text style={styles.titulo}>—</Text>
  //     <Text style={styles.apoio}>—</Text>
  //   </View>
  // );
  if (props.primeiroAcesso) { 
    return (
      <View style={styles.vazio}>
        <Text style={styles.titulo}>Nenhum hábito cadastrado</Text>
        <Text style={styles.apoio}>Toque em “Novo hábito” para começar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.vazio}>
      <Text style={styles.titulo}>Nenhum hábito encontrado</Text>
      <Text style={styles.apoio}>Limpe o campo de busca para ver todos os hábitos.</Text>
      <BotaoAcao
        rotulo="Limpar busca"
        onPressionar={props.onLimparBusca}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  vazio: { alignItems: 'center', gap: espaco.xs, paddingVertical: espaco.lg * 2 },
  titulo: { ...tipografia.corpo, fontWeight: '600', color: cores.texto },
  apoio: { ...tipografia.legenda, textAlign: 'center' },
});
