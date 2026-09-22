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
    // TODO 12: proteja contra a referência ainda null.
    // TODO 13: tire a foto com qualidade 0.7 e guarde o uri.
    //         Não peça base64 — você só vai exibir.
    // No primeiro render a referência ainda é `null` — o TypeScript exige esta guarda,
    // e ele está certo.
    if (!camera) return;

    // Sem `base64`: a foto só vai ser EXIBIDA, e para isso o `uri` basta. `base64`
    // carregaria a imagem inteira como texto na memória.
    const foto = await camera.takePictureAsync({ quality: 0.7 });
    if (foto) setFotoUri(foto.uri);
  }

  // TODO 14: primeiro estado — a resposta da permissão ainda não chegou.
  //         Sem isto, a tela de "sem permissão" PISCA para quem já autorizou.
  // PRIMEIRO estado: a resposta da permissão ainda não chegou. `null` NÃO é "negado" —
  // sem este caso a tela de convencimento pisca para quem já autorizou há semanas.
  if (!permissao) return <View style={estilos.tela} />;

  // TODO 15: segundo estado — sabemos, e não temos.
  //         Devolva uma tela que EXPLIQUE por que o app precisa da câmera,
  //         com um Pressable que chama pedirPermissao.
  // SEGUNDO estado: sabemos, e não temos. São DOIS casos, não um: com
  // `canAskAgain: false` o diálogo do sistema não aparece mais, e oferecer um botão que
  // não faz nada é enganar o usuário.
  if (!permissao.granted) {
    return (
      <View style={[estilos.tela, estilos.centro]}>
        <Text style={estilos.aviso}>
          Precisamos da câmera para você registrar a foto do seu progresso. A foto fica só
          no seu aparelho.
        </Text>

        {permissao.canAskAgain ? (
          <Pressable onPress={pedirPermissao} style={estilos.botao}>
            <Text style={estilos.textoBotao}>Permitir câmera</Text>
          </Pressable>
        ) : (
          <Text style={estilos.aviso}>
            A permissão está bloqueada. Abra Configurações {'>'} Habit Tracker {'>'} Câmera e
            autorize o acesso.
          </Text>
        )}
      </View>
    );
  }

  // TODO 16: terceiro estado — temos.
  // TERCEIRO estado: temos.
  return (
    <View style={estilos.tela}>
      {/* TODO 17: renderize o CameraView. Ele precisa de:
                  - a referência (use o callback ref com setCamera)
                  - o estilo (que precisa dar ALTURA a ele)
                  - a prop de qual câmera usar */}
      {/* `ref` aceita uma função, e `setCamera` é uma função: o React a chama com o
          componente montado (e com `null` ao desmontar). A forma canônica seria
          `useRef`, que é Aula 6. O `flex: 1` do estilo é o que dá ALTURA à câmera —
          sem ele a tela fica preta. */}
      <CameraView ref={setCamera} style={estilos.camera} facing={lado} />

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

        {/* TODO 18: quando houver fotoUri, exiba a prévia com o Image do expo-image.
                    contentFit explícito e uma transição de 300 ms. */}

        {fotoUri && (
          <Image
            source={{ uri: fotoUri }}
            style={estilos.previa}
            contentFit="cover"
            transition={300}
          />
        )}
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
