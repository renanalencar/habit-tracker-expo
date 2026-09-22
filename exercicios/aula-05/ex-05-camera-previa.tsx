// Exercício 5 — Complete: câmera e prévia
// Nível ⭐⭐ · 4 min
//
// Para pré-visualizar: descomente <TelaFotoHabito /> em App.tsx.
// Precisa de APARELHO FÍSICO: o iOS Simulator não tem câmera.
//
// CONFIRA, NESTA ORDEM:
//   1. Primeira abertura   → a tela de "sem permissão" NÃO pode piscar.
//   2. Conceda a permissão → a câmera ocupa o espaço? (Se estiver preta, é o estilo.)
//   3. Tire a foto         → a prévia aparece com transição suave?
//   4. Vire e tire outra   → a prévia troca?

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';

export default function TelaFotoHabito() {
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [lado, setLado] = useState<'back' | 'front'>('back');
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  async function tirarFoto() {
    // TODO 11: proteja contra a referência ainda null.
    // TODO 12: tire a foto com qualidade 0.7 e guarde o uri.
    //         Não peça base64 — você só vai exibir.
  }

  // TODO 13: primeiro estado — a resposta da permissão ainda não chegou.
  //         Sem isto, a tela de "sem permissão" PISCA para quem já autorizou.

  // TODO 14: segundo estado — sabemos, e não temos.
  //         Devolva uma tela que EXPLIQUE por que o app precisa da câmera,
  //         com um Pressable que chama pedirPermissao.

  // TODO 15: terceiro estado — temos.
  return (
    <View style={estilos.tela}>
      {/* TODO 16: renderize o CameraView. Ele precisa de:
                  - a referência (use o callback ref com setCamera)
                  - o estilo (que precisa dar ALTURA a ele)
                  - a prop de qual câmera usar */}

      <View style={estilos.painel}>
        <Pressable onPress={tirarFoto} style={estilos.botao}>
          <Text style={estilos.textoBotao}>Tirar foto</Text>
        </Pressable>

        <Pressable
          onPress={() => setLado((atual) => (atual === 'back' ? 'front' : 'back'))}
          style={estilos.botao}
        >
          <Text style={estilos.textoBotao}>Virar câmera</Text>
        </Pressable>

        {/* TODO 17: quando houver fotoUri, exiba a prévia com o Image do expo-image.
                    contentFit explícito e uma transição de 300 ms. */}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#111' },
  camera: { flex: 1 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  aviso: { color: '#fff', textAlign: 'center', fontSize: 16 },
  painel: { padding: 16, gap: 12, backgroundColor: '#1b1b1b' },
  botao: { backgroundColor: '#f26522', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700' },
  previa: { width: '100%', height: 160, borderRadius: 12, backgroundColor: '#222' },
});
