// Atividade 3 · Aula 5 (bônus, opcional) — o nível de bolha do bom hábito.
//
// Micro-hábito de postura: o app mostra uma bolha que só fica VERDE e CENTRALIZADA
// quando o telefone está apoiado na mesa perfeitamente plano.
//
// Para pré-visualizar: descomente <TelaNivelBolha /> em App.tsx.
//
// TODO 5.28: preencha o contrato de três tempos DESTE arquivo.
// 1. PEDIR   → ______________________________
// 2. LER     → ______________________________
// 3. PARAR   → ______________________________  (ou: "não se aplica, porque ___")
//
// TODO 5.29: o enunciado manda usar o ACELERÔMETRO, não o giroscópio. Escreva aqui por
//           quê, em uma ou duas linhas. (Dica: o que cada um dos dois mede quando o
//           aparelho está PARADO? Qual dos dois consegue dizer a inclinação?)
//
//   Resposta: ________________________________________________________________
//   _________________________________________________________________________
//
// RESTRIÇÕES: sem animação. A bolha se move por `StyleSheet` e Flexbox, como na Aula 3.
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { EventSubscription } from 'expo-modules-core';

import { cores, espaco, tipografia } from '../theme';

// TODO 5.30: escolha o intervalo de atualização CONSCIENTEMENTE e justifique aqui.
//           O comentário vale nota, e o que se avalia nele é se você entendeu a troca:
//           16 ms dá ~60 leituras por segundo (bolha fluida, 60 re-renderizações por
//           segundo); 500 ms dá uma bolha que parece travada. Onde fica o meio-termo,
//           sabendo que NÃO há animação suavizando as posições intermediárias?
// const INTERVALO_MS = ???;

// Abaixo desta inclinação em AMBOS os eixos o aparelho está plano o bastante.
// Em g: 0.05 g ≈ 3 graus.
const TOLERANCIA_G = 0.05;

// Metade do lado da área onde a bolha anda, em pixels. Ver `estilos.area`.
const RAIO_AREA = 110;
const RAIO_BOLHA = 20;

export function TelaNivelBolha() {
  const [assinatura, setAssinatura] = useState<EventSubscription | null>(null);
  const [inclinacao, setInclinacao] = useState({ x: 0, y: 0 });
  const [indisponivel, setIndisponivel] = useState(false);

  async function ligar() {
    // TODO 5.31: cheque a disponibilidade do acelerômetro, peça o intervalo do TODO 5.30,
    //           assine o sensor guardando `x` e `y` no estado, e guarde a assinatura.
    //           Mesmo padrão dos Exercícios 4 e 6 — inclusive o `isAvailableAsync`.
  }

  function desligar() {
    // TODO 5.32: encerre a assinatura e volte a bolha ao centro.
    //           Regra nº 9 da aula: todo `addListener` tem um `remove()` no mesmo arquivo.
  }

  const plano = Math.abs(inclinacao.x) < TOLERANCIA_G && Math.abs(inclinacao.y) < TOLERANCIA_G;

  // TODO 5.33: transforme a inclinação em pixels de deslocamento da bolha.
  //           Três coisas a resolver:
  //           a) quantos pixels por g? (1 g é o aparelho DE PÉ, ou seja 90 graus);
  //           b) limite o valor para a bolha não sair da área;
  //           c) um dos dois eixos precisa ser INVERTIDO — descubra qual, testando:
  //              no acelerômetro o y positivo aponta para o topo do aparelho, e na tela
  //              o y positivo desce.
  const deslocamento = { left: RAIO_AREA - RAIO_BOLHA, top: RAIO_AREA - RAIO_BOLHA };

  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Nível de bolha</Text>
      <Text style={estilos.legenda}>
        Apoie o telefone na mesa. A bolha fica verde quando ele está plano.
      </Text>

      {indisponivel && <Text style={estilos.erro}>Este aparelho não tem acelerômetro.</Text>}

      <View style={estilos.area}>
        <View style={estilos.mira} />
        <View
          style={[estilos.bolha, plano ? estilos.bolhaPlana : estilos.bolhaTorta, deslocamento]}
        />
      </View>

      <Text style={estilos.leitura}>
        x: {inclinacao.x.toFixed(2)} g · y: {inclinacao.y.toFixed(2)} g
      </Text>
      <Text style={estilos.status}>{plano ? '✅ plano' : '↔️ inclinado'}</Text>

      <View style={estilos.botoes}>
        <Pressable
          onPress={ligar}
          disabled={assinatura !== null}
          accessibilityRole="button"
          accessibilityLabel="Ligar o nível de bolha"
          style={({ pressed }) => [
            estilos.botao,
            pressed && estilos.pressionado,
            assinatura !== null && estilos.desabilitado,
          ]}
        >
          <Text style={estilos.textoBotao}>Ligar</Text>
        </Pressable>

        <Pressable
          onPress={desligar}
          disabled={assinatura === null}
          accessibilityRole="button"
          accessibilityLabel="Desligar o nível de bolha"
          style={({ pressed }) => [
            estilos.botao,
            pressed && estilos.pressionado,
            assinatura === null && estilos.desabilitado,
          ]}
        >
          <Text style={estilos.textoBotao}>Desligar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    padding: espaco.lg,
    gap: espaco.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
  titulo: tipografia.titulo,
  legenda: { ...tipografia.legenda, textAlign: 'center' },
  erro: { ...tipografia.legenda, color: cores.erro },
  area: {
    width: RAIO_AREA * 2,
    height: RAIO_AREA * 2,
    borderRadius: RAIO_AREA,
    borderWidth: 2,
    borderColor: cores.textoFraco,
    backgroundColor: cores.cartao,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mira: {
    width: RAIO_BOLHA * 2 + espaco.sm,
    height: RAIO_BOLHA * 2 + espaco.sm,
    borderRadius: RAIO_BOLHA + espaco.xs,
    borderWidth: 1,
    borderColor: cores.textoFraco,
  },
  bolha: {
    position: 'absolute',
    width: RAIO_BOLHA * 2,
    height: RAIO_BOLHA * 2,
    borderRadius: RAIO_BOLHA,
  },
  bolhaPlana: { backgroundColor: cores.sucesso },
  bolhaTorta: { backgroundColor: cores.primaria },
  leitura: { ...tipografia.corpo, fontVariant: ['tabular-nums'] },
  status: { ...tipografia.corpo, fontWeight: '700' },
  botoes: { flexDirection: 'row', gap: espaco.sm },
  botao: {
    backgroundColor: cores.primaria,
    paddingVertical: espaco.sm + espaco.xs,
    paddingHorizontal: espaco.lg,
    borderRadius: espaco.sm,
  },
  pressionado: { opacity: 0.7 },
  desabilitado: { opacity: 0.4 },
  textoBotao: { ...tipografia.corpo, color: cores.cartao, fontWeight: '700' },
});
