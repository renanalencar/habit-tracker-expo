// Exercício 3 — Reproduza: o botão tocável com feedback
// Nível ⭐ · 8 min
//
// Para pré-visualizar: troque temporariamente o conteúdo renderizado dentro de
// <View style={styles.conteudo}> em App.tsx por <TelaBotaoAcao />, e desfaça antes de entregar.
//
// O BotaoAcao deve:
//   - mudar de aparência ENQUANTO está pressionado;
//   - ter área de toque maior que o desenho;
//   - mostrar a ondinha nativa no Android;
//   - anunciar-se corretamente para leitores de tela;
//   - ficar apagado e sem reagir quando `desabilitado` for true.
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type BotaoAcaoProps = {
  rotulo: string;
  onPressionar: () => void;
  desabilitado?: boolean;
};

export function BotaoAcao({ rotulo, onPressionar, desabilitado = false }: BotaoAcaoProps) {
  return (
    <Pressable
      // TODO 1: qual callback recebe a AÇÃO (`onPressionar`)?
      //         Cuidado: não é o que dispara no instante em que o dedo encosta.
      onPress={onPressionar}
      // TODO 2: desabilitar o toque quando `desabilitado` for true.
      disabled={desabilitado}
      // TODO 3: aumentar a área sensível em 10 px SEM mudar o layout.
      //         (padding mudaria o tamanho do botão e quebraria o `gap` do contêiner.)
      hitSlop={10}
      // TODO 4: ondinha nativa do Android com a cor '#FFB132'.
      android_ripple={{color: '#FFB132'}}
      // TODO 5: as duas props de acessibilidade — o papel e o rótulo falado.
      accessibilityRole='button'
      accessibilityLabel={rotulo}
      style={({pressed}) => [styles.botao, pressed && styles.botaoPressionado, desabilitado && styles.botaoDesabilitado]}
      // TODO 6: `style` acima precisa virar uma FUNÇÃO que devolve o array de estilos:
      //          `botao` sempre; `botaoPressionado` só enquanto pressionado;
      //          `botaoDesabilitado` quando a prop for true.
      //          A ordem do array importa — pense em quem deve vencer se os dois forem true.
    >
      <Text style={styles.rotulo}>{rotulo}</Text>
    </Pressable>
  );
}

// Tela de teste do enunciado. Não precisa mexer aqui.
//
// CONFIRA: ao ARRASTAR O DEDO PARA FORA do botão antes de soltar, o texto NÃO pode
// mudar para "Salvo!". Se mudar, o TODO 7 está no callback errado.
export default function TelaBotaoAcao() {
  const [salvo, setSalvo] = useState(false);

  return (
    <View style={styles.demo}>
      <BotaoAcao rotulo="Salvar hábito" onPressionar={() => setSalvo(true)} />
      <BotaoAcao rotulo="Salvar hábito" onPressionar={() => setSalvo(true)} desabilitado />
      <Text>{salvo ? 'Salvo!' : 'Ainda não salvo'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  demo: { flex: 1, justifyContent: 'center', padding: 24, gap: 16, borderRadius: 24 },
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#FF6002',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  botaoPressionado: {
    // TODO 7: como o botão fica ENQUANTO o dedo está nele.
    //          Escolha uma mudança visível mas discreta.
    backgroundColor: '#D14E00',
    boxShadow: '0 1px 3px rgba(0,0,0,0,2)'
  },
  botaoDesabilitado: {
    // TODO 8: aparência de desligado.
    backgroundColor: '#E4D6C3',
    boxShadow: 'none'
  },
  rotulo: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
