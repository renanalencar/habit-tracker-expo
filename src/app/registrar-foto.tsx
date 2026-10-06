// GALERIA → PEDIR: ______________  LER: ______________  PARAR: ______________
// CÂMERA  → PEDIR: ______________  LER: ______________  PARAR: ______________
//
// Atividade 1 — Registrar Foto do Hábito (Galeria + Câmera)
// Onde: src/app/registrar-foto.tsx
//
// Requisitos:
//   1. Preencha o contrato de três tempos acima (vale nota).
//   2. Opção de escolher da galeria OU tirar com a câmera.
//   3. Prévia com expo-image (contentFit="cover", transition={300}).
//   4. Tratar cancelamento SEM mensagem de erro.
//   5. Tratar câmera negada e bloqueada com mensagens distintas.
//   6. Manter galeria sempre disponível.
//   7. Botão "Concluir" volta para a tela anterior (desabilitado sem foto).

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

type Falha = 'camera-negada' | 'camera-bloqueada';

const MENSAGENS: Record<Falha, string> = {
  // TODO A1.1: escreva duas mensagens distintas explicando o que o usuário pode fazer.
  //           A bloqueada precisa indicar o caminho nas Configurações do aparelho.
  //           Ambas devem lembrar que a galeria continua disponível.
  'camera-negada': '',
  'camera-bloqueada': '',
};

// TODO A1.2: declare aqui as opções do picker (apenas imagens, recorte 4:3, qualidade 0.7),
//           tipadas como ImagePicker.ImagePickerOptions, para reutilizar na câmera e na galeria.

export default function TelaRegistrarFoto() {
  const router = useRouter();
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [falha, setFalha] = useState<Falha | null>(null);

  async function tirarFoto() {
    setFalha(null);

    // TODO A1.3: peça a permissão de câmera. Se não for concedida, defina a falha
    //           usando canAskAgain ('camera-negada' vs 'camera-bloqueada') e encerre.

    // TODO A1.4: abra a câmera com as opções declaradas.
    //           Se o usuário cancelou, não mostre erro e saia.
    //           Se capturou, guarde o uri em fotoUri.
  }

  async function escolherDaGaleria() {
    setFalha(null);

    // TODO A1.5: abra a galeria com as mesmas opções (sem pedir permissão prévia).
    //           Trate o cancelamento e guarde o uri da foto escolhida.
  }

  return (
    <View style={estilos.tela}>
      {fotoUri ? (
        // TODO A1.6: mostre a prévia com expo-image, contentFit="cover" e transition de 300ms.
        <View />
      ) : (
        <View style={[estilos.previa, estilos.semFoto]}>
          <Text>Nenhuma foto ainda</Text>
        </View>
      )}

      <Pressable onPress={tirarFoto} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Tirar foto</Text>
      </Pressable>

      <Pressable onPress={escolherDaGaleria} style={estilos.botaoSecundario}>
        <Text style={estilos.textoBotaoSecundario}>Escolher da galeria</Text>
      </Pressable>

      {/* TODO A1.7: mostre a mensagem de falha quando houver */}

      <Pressable
        // TODO A1.8: ao tocar em Concluir, volte para a tela anterior via router.back().
        //           O botão fica desabilitado (e com estilo desligado) enquanto não houver foto.
        style={estilos.botao}
      >
        <Text style={estilos.textoBotao}>Concluir</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  previa: { width: '100%', aspectRatio: 4 / 3, borderRadius: 12 },
  semFoto: { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  botaoSecundario: { borderWidth: 2, borderColor: '#f26522', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
  textoBotaoSecundario: { color: '#f26522', fontWeight: '700', fontSize: 16 },
  desligado: { opacity: 0.4 },
  erro: { fontSize: 15, color: '#b00020' },
});
