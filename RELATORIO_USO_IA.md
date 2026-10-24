# Relatório de uso de Inteligência Artificial

## Ferramenta e finalidade

Foi utilizado o Copilot SDK no VS Code para apoiar a leitura das instruções da Aula 6, localizar os TODOs da Parte 2, propor e implementar um rascunho de solução para navegação, câmera, galeria e documentação.

**Skill utilizada:** `vercel-react-native-skills`, como referência às práticas de Expo/React Native. Nenhum agente especializado foi utilizado.

**Modelo e versão para a declaração:** confirme no Catálogo de IA do CESAR e na identificação do modelo exibida pela ferramenta antes de entregar. Esta sessão não informa o identificador nem a versão exata do modelo, portanto esses dados não foram presumidos.

## Análise crítica do resultado

O código sugerido foi conferido em relação aos requisitos escritos dos exercícios e aos tipos das bibliotecas instaladas. A implementação cobre seleção de foto por câmera ou galeria, diferencia a permissão de câmera negada daquela bloqueada, não exibe erro quando a pessoa cancela, permite selecionar até seis imagens sem recorte, apresenta as miniaturas em grade e fornece telas e atalhos para hábitos, fotos, galeria e informações do app.

A seleção múltipla e o recorte foram mantidos em fluxos separados porque a API do ImagePicker não oferece recorte para várias imagens ao mesmo tempo. A navegação originalmente baseada em Stack foi substituída por abas, conforme a exigência adicional da atividade; por isso, as telas são destinos das abas e os títulos foram mantidos nos cabeçalhos, sem depender de um botão de voltar do Stack.

O resultado da IA é um rascunho útil, mas não substitui a validação humana. Em particular, câmera e seletor de imagens dependem de permissões e comportamento do sistema operacional e precisam ser testados em aparelho/emulador compatível. Também é necessário confirmar se a ferramenta e o modelo utilizados constam no Catálogo de IA do CESAR com aprovação vigente. A pessoa estudante deve revisar o relatório, completar os dados da ferramenta e assumir a responsabilidade pela versão submetida.

**Grau de acerto observado:** alto para os requisitos verificáveis por código: as rotas, os textos, os fluxos de seleção e a grade foram implementados; o TypeScript e a verificação de dependências do Expo passaram. Não foi possível comprovar nesta validação a experiência real de câmera e permissões em um aparelho físico. Esse limite deve ser considerado na revisão final.

## Declaração obrigatória

Declaro que utilizei a(s) ferramenta(s) de Inteligência Artificial [informar nome e versão da ferramenta, conforme constante no Catálogo de IA do CESAR] nesta atividade, com a finalidade de gerar um rascunho sobre [implementação de navegação por abas, captura e seleção de fotos e galeria no aplicativo], sobre o qual realizei análise crítica (curadoria) das informações apresentadas. Não tratei dados pessoais no uso desta ferramenta. Revisei criticamente o conteúdo gerado, identificando seus acertos e eventuais imprecisões, e assumo a responsabilidade integral pela versão final apresentada.
