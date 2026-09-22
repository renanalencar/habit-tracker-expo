// Atividade 1 · Aula 5 — a tela "Registrar hábito".
//
// Até a Aula 4 todo dado nascia do teclado. Aqui o app passa a saber ONDE o treino
// aconteceu e COM O QUE ele se parecia, sem ninguém digitar nada.
//
// TODO 5.15: preencha o contrato de três tempos DESTA tela. Ele vale nota.
// 1. PEDIR   → ______________________________
// 2. LER     → ______________________________
// 3. PARAR   → ______________________________  (ou: "não se aplica, porque ___")
//
// RESTRIÇÕES DA ENTREGA (é aqui que a nota se decide):
//   - Sem `useEffect`, `useRef` ou qualquer hook do React além do `useState`. Os hooks de
//     permissão das bibliotecas (`useCameraPermissions`) são permitidos — são delas.
//   - Sem navegação. A tela aparece por condicional com `useState`, como no Exercício 5.
//   - Sem mapa. A coordenada é TEXTO.
//   - Sem salvar na galeria e sem escolher foto do rolo.
//   - Sem rede. Nada de enviar a foto para lugar nenhum.
//   - Um hábito sem foto e sem local AINDA É UM HÁBITO. Se negar tudo quebrar a tela,
//     a entrega perde os 15% de "degradação graciosa".
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { BotaoAcao } from '../components/botao-acao';
import { type FalhaLocal } from '../services/localizacao';
import { cores, espaco, tipografia } from '../theme';
import type { CategoriaHabito, Habito, LocalHabito } from '../types/habito';

export type TelaRegistrarHabitoProps = {
  onSalvar: (habito: Habito) => void;
  onCancelar: () => void;
};

const CATEGORIAS: CategoriaHabito[] = ['saude', 'produtividade', 'mentalidade', 'sono'];

export function TelaRegistrarHabito({ onSalvar, onCancelar }: TelaRegistrarHabitoProps) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState<CategoriaHabito>('saude');

  const [local, setLocal] = useState<LocalHabito | null>(null);
  const [falhaLocal, setFalhaLocal] = useState<FalhaLocal | null>(null);
  const [buscandoLocal, setBuscandoLocal] = useState(false);

  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [cameraAberta, setCameraAberta] = useState(false);

  async function registrarLocal() {
    // TODO 5.16: chame `obterLocalAtual()` e trate os DOIS ramos do resultado.
    //           Ligue e desligue `buscandoLocal` em volta da chamada, senão o botão
    //           fica mudo enquanto o GPS busca o sinal — e buscar sinal demora.
    //           Limpe a falha anterior ANTES de tentar de novo.
  }

  function salvar() {
    // TODO 5.17: monte o Habito novo e entregue por `onSalvar`.
    //           - id: pense em como gerar um que não colida (o `length` do array foi o
    //             problema de `keyExtractor` da Aula 4);
    //           - `local` e `fotoUri` só entram no objeto QUANDO EXISTEM — é isso que faz
    //             o app continuar funcionando para quem negou as duas permissões;
    //           - título vazio não deveria virar hábito.
  }

  // TODO 5.18: quando `cameraAberta` for true, devolva o <CameraHabito /> ocupando a tela
  //           inteira, em vez do formulário. Ele precisa de duas funções:
  //           - o que fazer com o uri capturado (guardar e fechar a câmera);
  //           - o que fazer no cancelamento (só fechar).
  //           Enquanto o <CameraHabito> NÃO está montado, a câmera está desligada — é
  //           esse o liga/desliga que temos antes da Aula 6.

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.titulo}>Registrar hábito</Text>

      <TextInput
        style={estilos.campo}
        placeholder="O que você fez? (ex.: Treino de perna)"
        value={titulo}
        onChangeText={setTitulo}
        accessibilityLabel="Título do hábito"
      />

      <View style={estilos.grupoCategorias}>
        {CATEGORIAS.map((opcao) => (
          <Pressable
            key={opcao}
            onPress={() => setCategoria(opcao)}
            accessibilityRole="radio"
            accessibilityState={{ selected: categoria === opcao }}
            accessibilityLabel={`Categoria ${opcao}`}
            style={({ pressed }) => [
              estilos.chip,
              categoria === opcao && estilos.chipAtivo,
              pressed && estilos.pressionado,
            ]}
          >
            <Text style={[estilos.chipTexto, categoria === opcao && estilos.chipTextoAtivo]}>
              {opcao}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* ---------- Localização ---------- */}
      <View style={estilos.bloco}>
        <Text style={estilos.rotuloBloco}>Onde foi</Text>

        <BotaoAcao
          rotulo={buscandoLocal ? 'Buscando localização...' : 'Usar minha localização'}
          onPressionar={registrarLocal}
          desabilitado={buscandoLocal}
        />

        {/* TODO 5.19: mostre TRÊS coisas diferentes aqui, cada uma no seu caso:
                      - quando houver `local`: o texto legível (use `formatarLocal`);
                      - quando houver `falhaLocal`: a mensagem daquela falha específica,
                        com `estilos.erro` — e são QUATRO mensagens possíveis, não uma;
                      - quando não houver nem um nem outro: avise que é opcional, para o
                        usuário não achar que precisa autorizar para seguir. */}
      </View>

      {/* ---------- Foto ---------- */}
      <View style={estilos.bloco}>
        <Text style={estilos.rotuloBloco}>Como foi</Text>

        <BotaoAcao
          rotulo={fotoUri ? 'Tirar outra foto' : 'Tirar foto'}
          onPressionar={() => setCameraAberta(true)}
        />

        {/* TODO 5.20: quando houver `fotoUri`, exiba a prévia com o <Image> do expo-image
                      (`estilos.previa`), com `contentFit` explícito e uma transição.
                      Sem foto, diga ao usuário que é opcional E onde a foto vai parar —
                      "fica no cache do app, não vai para a galeria nem para a internet"
                      é informação que ele tem o direito de ter antes de tirar. */}
      </View>

      <View style={estilos.rodape}>
        <BotaoAcao
          rotulo="Salvar hábito"
          onPressionar={salvar}
          desabilitado={titulo.trim().length === 0}
        />
        <BotaoAcao rotulo="Cancelar" onPressionar={onCancelar} />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: espaco.md, gap: espaco.md, paddingBottom: espaco.lg * 2 },
  titulo: tipografia.titulo,
  campo: {
    borderWidth: 1,
    borderColor: cores.textoFraco,
    borderRadius: espaco.sm,
    padding: espaco.sm,
    backgroundColor: cores.cartao,
    fontSize: 16,
  },
  grupoCategorias: { flexDirection: 'row', flexWrap: 'wrap', gap: espaco.sm },
  chip: {
    paddingVertical: espaco.xs,
    paddingHorizontal: espaco.sm + espaco.xs,
    borderRadius: espaco.lg,
    borderWidth: 1,
    borderColor: cores.textoFraco,
    backgroundColor: cores.cartao,
  },
  chipAtivo: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  chipTexto: { ...tipografia.legenda, color: cores.texto, textTransform: 'capitalize' },
  chipTextoAtivo: { color: cores.cartao, fontWeight: '700' },
  pressionado: { opacity: 0.8 },
  bloco: {
    backgroundColor: cores.cartao,
    borderRadius: espaco.sm,
    padding: espaco.md,
    gap: espaco.sm,
  },
  rotuloBloco: { ...tipografia.corpo, fontWeight: '700' },
  info: tipografia.corpo,
  legenda: tipografia.legenda,
  erro: { ...tipografia.legenda, color: cores.erro },
  previa: {
    width: '100%',
    height: 200,
    borderRadius: espaco.sm,
    backgroundColor: cores.fundo,
  },
  rodape: { gap: espaco.sm },
});
