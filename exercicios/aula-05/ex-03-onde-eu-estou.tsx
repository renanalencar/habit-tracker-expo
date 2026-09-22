// Exercício 3 — Complete: o botão "Onde eu estou"
// Nível ⭐⭐ · 6 min
//
// Para pré-visualizar: descomente <TelaOndeEuEstou /> em App.tsx.
// Precisa de APARELHO FÍSICO (ou emulador Android com GPS simulado).
//
// CONFIRA, NESTA ORDEM:
//   1. Permissão concedida        → mostra coordenadas e raio?
//   2. Permissão negada           → mensagem de negada?
//   3. Negada + "não perguntar"   → a mensagem MUDA?
//   4. Permissão OK, GPS desligado → terceira mensagem, diferente das outras duas?
//
// Se as três mensagens forem iguais, o exercício não está feito. É esse o ponto dele.

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

type Local = { latitude: number; longitude: number; precisaoMetros: number };

type Falha = 'permissao-negada' | 'permissao-bloqueada' | 'servico-desligado';

const MENSAGENS: Record<Falha, string> = {
  // TODO 1: escreva as três mensagens. Elas precisam ser DIFERENTES entre si
  //         e dizer ao usuário o que ELE pode fazer.
  'permissao-negada': '',
  'permissao-bloqueada': '',
  'servico-desligado': '',
};

export default function TelaOndeEuEstou() {
  const [local, setLocal] = useState<Local | null>(null);
  const [falha, setFalha] = useState<Falha | null>(null);
  const [buscando, setBuscando] = useState(false);

  async function registrarLocal() {
    setFalha(null);
    setBuscando(true);

    // TODO 2: peça a permissão de foreground.
    //         Se não for concedida, decida entre 'permissao-negada' e
    //         'permissao-bloqueada' usando o campo certo da resposta,
    //         chame setBuscando(false) e saia.

    // TODO 3: confira se o SERVIÇO de localização está ligado.
    //         Se não estiver, é 'servico-desligado'. Não confunda com permissão.

    // TODO 4: peça a posição atual. Escolha a Accuracy sabendo justificar:
    //         o objetivo é "em que academia o treino aconteceu".

    // TODO 5: guarde latitude, longitude e o raio de precisão em `local`.
    //         Atenção: o campo de precisão pode vir null.

    setBuscando(false);
  }

  return (
    <View style={estilos.tela}>
      <Pressable
        onPress={registrarLocal}
        disabled={buscando}
        style={({ pressed }) => [estilos.botao, pressed && estilos.botaoPressionado]}
      >
        <Text style={estilos.textoBotao}>{buscando ? 'Buscando...' : 'Onde eu estou'}</Text>
      </Pressable>

      {/* TODO 6: mostre a mensagem de falha, quando houver. */}

      {local && (
        <Text style={estilos.info}>
          {local.latitude.toFixed(5)}, {local.longitude.toFixed(5)} (±
          {Math.round(local.precisaoMetros)} m)
        </Text>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  botaoPressionado: { opacity: 0.7 },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
  info: { fontSize: 16 },
  erro: { fontSize: 15, color: '#b00020' },
});
