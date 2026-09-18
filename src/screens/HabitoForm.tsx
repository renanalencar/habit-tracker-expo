// Tela de criar/editar Habito (Aula 3 · Atividade 1).
// Ainda não está ligada a nenhuma navegação — a Aula 3 não cobre isso.
// Para pré-visualizar enquanto você desenvolve: troque temporariamente o conteúdo
// renderizado dentro de <View style={styles.conteudo}> em App.tsx por <HabitoForm />,
// e desfaça a troca antes de entregar.
import { useState } from 'react';
import { ScrollView, View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import { cores, espaco, tipografia } from '../theme';

// import { cores, espaco, tipografia } from '../theme'; // TODO: descomente ao usar os tokens

export function HabitoForm() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [lembrete, setLembrete] = useState(false);

  // TODO 11: o formulário é válido quando o título não está vazio (sem contar espaços).
  //          Troque o `false` abaixo pela expressão real.
  const tituloVazio = titulo.trim().length == 0;

  return (
    <ScrollView style={styles.tela}>
      {/* TODO 12: qual das duas props do ScrollView recebe o padding do conteúdo — `style` ou
          `contentContainerStyle`? Adicione a que faltar, apontando para `styles.conteudo`. */}
      <View style={styles.conteudo}>
        <Text style={styles.rotulo}>Título</Text>
        {/* TODO 13: torne este TextInput controlado — `value={titulo}` e `onChangeText={setTitulo}`. */}
        {/* TODO 14: array de estilos — some `styles.inputInvalido` quando `tituloVazio` for true. */}
        <TextInput 
          style={[styles.input, tituloVazio && styles.inputInvalido]} 
          placeholder="Ex.: Beber 2L de água"
          value={titulo}
          onChangeText={setTitulo}
          />

        <Text style={styles.rotulo}>Descrição</Text>
        {/* TODO 15: o segundo input controlado, ligado a `descricao` / `setDescricao`. */}
        <TextInput 
          style={styles.input} 
          placeholder="Opcional"
          value={descricao}
          onChangeText={setDescricao}
          />

        <View style={styles.linha}>
          <Text style={styles.rotulo}>Lembrete diário</Text>
          {/* TODO 16: ligue o Switch ao estado `lembrete` — falta `value` e `onValueChange`.
              Lembre: sem `value`, ele volta sozinho ao valor anterior. */}
          <Switch 
            value={lembrete}
            onValueChange={setLembrete} />
        </View>

        {/* TODO 17: o Button não aceita `style` — por isso ele já está dentro da View estilizada abaixo. */}
        {/* TODO 18: desabilite o botão enquanto o título estiver vazio (`disabled={tituloVazio}`). */}
        <View style={styles.areaBotao}>
          <Button title="Salvar" onPress={() => {}} disabled={tituloVazio} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    // TODO 19: flex e cor de fundo (vindos de `cores`, em ../theme).
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    // TODO 20: padding e gap — daqui saem TODOS os espaçamentos do formulário.
    //          Se você precisar de margin em algum filho, algo está errado.
    padding: espaco.md,
    gap: espaco.sm,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    // TODO 21: borderColor, borderRadius e fontSize — todos vindos dos tokens.
    borderColor: cores.primaria,
    borderRadius: espaco.sm,
    fontSize: tipografia.corpo.fontSize,
  },
  inputInvalido: {
    // TODO 22: só o que MUDA em relação ao `input` normal. Não repita o resto.
    borderColor: cores.erro,
  },
  linha: {
    // TODO 23: os dois filhos nas pontas, alinhados verticalmente.
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rotulo: {
    fontSize: 14,
  },
  areaBotao: {
    borderRadius: 8,
    overflow: 'hidden',
    // TODO 24: margin AQUI é legítima. Por quê? (é espaço em volta do grupo).
    marginTop: espaco.md,
  },
});
