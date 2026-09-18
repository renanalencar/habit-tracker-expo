export const cores = {
  fundo: '#FEF7EE',
  cartao: '#FFFFFF',
  // TODO 1: complete com texto, textoFraco, primaria, sucesso, erro
  texto: '#1A1A1A',
  textoFraco: '#7A7A7A',
  primaria: '#FF7F50',
  sucesso: '#4CAF50',
  erro: '#F44336'
} as const;

export const espaco = {
  // TODO 2: escala de no mínimo 4 degraus (xs, sm, md, lg).
  //         Escolha uma progressão e seja consistente — 4/8/16/24 é um bom default.
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const;

export const tipografia = {
  // TODO 3: titulo, corpo, legenda. Cada um é um objeto de estilo de TEXTO.
  //         A legenda pode reaproveitar `cores.textoFraco`.
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.texto,
  },
  corpo: {
    fontSize: 16,
    color: cores.texto,
  },
  legenda: {
    fontSize: 12,
    color: cores.textoFraco,
  },
} as const;

// TODO 4: por que este arquivo usa `as const` e o StyleSheet.create do componente NÃO usa?
//         Responda em um comentário de uma linha aqui mesmo.
// `as const` força os valores a serem literais exatos para o TypeScript, enquanto `StyleSheet.create` já tipa e otimiza os estilos internamente.
