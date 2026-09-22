// Atividade 1 · Aula 5 — a câmera do registro.
//
// Vive num componente separado da tela de registro por um motivo prático: enquanto este
// componente NÃO está montado, a câmera do aparelho está desligada. Montar e desmontar
// por `useState` é o "liga/desliga" que temos antes da Aula 6.
//
// TODO 5.9: preencha o contrato de três tempos DESTE arquivo. Ele vale nota.
// 1. PEDIR   → ______________________________
// 2. LER     → ______________________________
// 3. PARAR   → ______________________________  (ou: "não se aplica, porque ___")
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { cores, espaco, tipografia } from '../theme';

export type CameraHabitoProps = {
  onCapturar: (fotoUri: string) => void;
  onCancelar: () => void;
};

export function CameraHabito({ onCapturar, onCancelar }: CameraHabitoProps) {
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [lado, setLado] = useState<'back' | 'front'>('back');

  async function tirarFoto() {
    // TODO 5.10: proteja contra a referência ainda null, tire a foto com qualidade 0.7
    //           e entregue o uri por `onCapturar`.
    //           Não peça base64 — a foto só vai ser EXIBIDA, e o uri basta.
    //           Pense também no que fazer se a captura falhar (câmera ocupada por outro
    //           app acontece de verdade): o usuário precisa saber.
  }

  // TODO 5.11: PRIMEIRO estado — a resposta da permissão ainda não chegou.
  //           `null` não é "negado". Sem este caso, a tela de convencimento PISCA para
  //           quem já autorizou há semanas.

  // TODO 5.12: SEGUNDO estado — sabemos, e não temos.
  //           Devolva uma tela que EXPLIQUE por que o app precisa da câmera, com um
  //           Pressable que chama `pedirPermissao`.
  //           Atenção: são DOIS casos aqui, não um. Quando o diálogo do sistema não vai
  //           mais aparecer, o texto e o botão têm que mudar — o campo que responde isso
  //           é o mesmo que você usou no `localizacao.ts` (TODO 5.6).
  //           Ofereça também uma saída: dá para salvar o hábito sem foto.

  // TODO 5.13: TERCEIRO estado — temos.
  return (
    <View style={estilos.tela}>
      {/* TODO 5.14: renderize o CameraView. Ele precisa de:
                    - a referência (use o callback ref com setCamera — `ref` aceita função)
                    - o estilo (que precisa dar ALTURA a ele, senão a tela fica preta)
                    - a prop de qual câmera usar */}

      <View style={estilos.painel}>
        <Pressable
          onPress={tirarFoto}
          accessibilityRole="button"
          accessibilityLabel="Tirar a foto do hábito"
          style={({ pressed }) => [estilos.botao, pressed && estilos.botaoPressionado]}
        >
          <Text style={estilos.textoBotao}>Tirar foto</Text>
        </Pressable>

        <Pressable
          onPress={() => setLado((atual) => (atual === 'back' ? 'front' : 'back'))}
          accessibilityRole="button"
          accessibilityLabel="Alternar entre a câmera frontal e a traseira"
          style={({ pressed }) => [estilos.botaoFantasma, pressed && estilos.botaoPressionado]}
        >
          <Text style={estilos.textoFantasma}>Virar câmera</Text>
        </Pressable>

        <Pressable
          onPress={onCancelar}
          accessibilityRole="button"
          accessibilityLabel="Fechar a câmera"
          style={({ pressed }) => [estilos.botaoFantasma, pressed && estilos.botaoPressionado]}
        >
          <Text style={estilos.textoFantasma}>Fechar câmera</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#111' },
  centro: { alignItems: 'center', justifyContent: 'center', padding: espaco.lg, gap: espaco.md },
  camera: { flex: 1 },
  aviso: { ...tipografia.corpo, color: cores.cartao, textAlign: 'center' },
  erro: { ...tipografia.legenda, color: '#ff8a80', padding: espaco.sm, textAlign: 'center' },
  painel: { padding: espaco.md, gap: espaco.sm, backgroundColor: '#1b1b1b' },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: espaco.sm + espaco.xs,
    borderRadius: espaco.sm,
    alignItems: 'center',
  },
  botaoFantasma: {
    borderWidth: 1,
    borderColor: cores.primaria,
    paddingVertical: espaco.sm + espaco.xs,
    borderRadius: espaco.sm,
    alignItems: 'center',
  },
  botaoPressionado: { opacity: 0.7 },
  botaoDesabilitado: { opacity: 0.5 },
  textoBotao: { ...tipografia.corpo, color: cores.cartao, fontWeight: '700' },
  textoFantasma: { ...tipografia.corpo, color: cores.primaria, fontWeight: '600' },
});
