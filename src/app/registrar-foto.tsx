// GALERIA → PEDIR: nenhuma permissão prévia  LER: resultado da seleção  PARAR: ao concluir
// CÂMERA  → PEDIR: permissão de câmera       LER: resultado da captura   PARAR: ao concluir
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
  'camera-negada':
    'A permissão da câmera foi negada. Você pode tentar novamente ou escolher uma foto da galeria.',
  'camera-bloqueada':
    'A permissão da câmera está bloqueada. Ative-a em Configurações > Aplicativos > Habit Tracker > Permissões. Você também pode escolher uma foto da galeria.',
};

const OPCOES_PICKER: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.7,
};

export default function TelaRegistrarFoto() {
  const router = useRouter();
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [falha, setFalha] = useState<Falha | null>(null);

  async function tirarFoto() {
    setFalha(null);

    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      setFalha(permissao.canAskAgain ? 'camera-negada' : 'camera-bloqueada');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync(OPCOES_PICKER);
    if (!resultado.canceled) {
      setFotoUri(resultado.assets[0].uri);
    }
  }

  async function escolherDaGaleria() {
    setFalha(null);

    const resultado = await ImagePicker.launchImageLibraryAsync(OPCOES_PICKER);
    if (!resultado.canceled) {
      setFotoUri(resultado.assets[0].uri);
    }
  }

  return (
    <View style={estilos.tela}>
      {fotoUri ? (
        <Image
          source={{ uri: fotoUri }}
          style={estilos.previa}
          contentFit="cover"
          transition={300}
        />
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

      {falha && <Text style={estilos.erro}>{MENSAGENS[falha]}</Text>}

      <Pressable
        onPress={() => router.back()}
        disabled={!fotoUri}
        style={[estilos.botao, !fotoUri && estilos.desligado]}
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
