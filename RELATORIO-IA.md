# Relatório de uso de Inteligência Artificial

## Ferramenta utilizada

- **Ferramenta:** GitHub Copilot, integrado ao VS Code por meio do Copilot SDK.
- **Modelo de linguagem:** não identificado. Os metadados desta sessão não
  disponibilizam o nome nem a versão do modelo principal utilizado; por isso,
  não atribuo à atividade um modelo que não consigo confirmar. Antes da entrega,
  confira o seletor/histórico de modelos do Copilot no VS Code e compare a
  ferramenta e sua versão com o Catálogo de IA vigente do CESAR.
- **Skills:** `vercel-react-native-skills`, consultada como referência para
  práticas de React Native, estado e hooks.
- **Agentes auxiliares:** não foram utilizados.

## Finalidade e contribuição da IA

Usei o Copilot como apoio para produzir um primeiro rascunho de implementação
dos Exercícios 1 a 5 e da atividade aplicada da Aula 8 do rastreador de hábitos.
As sugestões ajudaram a completar:

- operações imutáveis de adicionar, concluir e remover hábitos;
- o cronômetro com `useEffect`, `setInterval` e limpeza do intervalo;
- o contexto de tema e a leitura/gravação da preferência com AsyncStorage;
- as ações e a persistência da store Zustand;
- a criação da tabela, gravação e consulta de sessões no SQLite;
- a ligação entre Home, Estatísticas, Configurações e Detalhe, incluindo tema,
  navegação e estado compartilhado.

A IA acelerou a elaboração e organização do código, mas não substituiu a leitura
do enunciado nem a decisão sobre o que deveria ser entregue. Não utilizei IA
para tratar dados pessoais.

## Revisão crítica e avaliação do resultado

Revisei as sugestões comparando-as com os requisitos da atividade e com os
arquivos e dependências do projeto. Conferi especialmente a imutabilidade das
listas, o uso de atualização funcional quando o próximo estado depende do
estado atual, as dependências do efeito do cronômetro e seu cleanup, a validação
do contexto fora do Provider, os seletores da store e os parâmetros SQL
posicionais.

Também revisei a inicialização do tema: uma alternância feita antes de terminar
a leitura do AsyncStorage não deve ser substituída pela preferência carregada
depois. Adicionei uma proteção para preservar essa escolha. Na tela de detalhe,
incluí um estado explícito para hábito inexistente e conectei as ações de
concluir e excluir ao retorno à tela anterior. Na Home, mantive o texto do novo
hábito como estado local e conectei a lista ao estado persistido compartilhado.

Considero que a contribuição foi **alta para produzir o rascunho e resolver os
requisitos verificáveis por tipos**, mas a aprovação na checagem de TypeScript
não prova todos os comportamentos em execução. `npx tsc --noEmit` concluiu sem
erros; ainda é importante testar em um aparelho ou emulador a hidratação do
AsyncStorage, a navegação, o cronômetro e as operações de SQLite. A gravação
automática de uma sessão pelo cronômetro ficou de fora porque o enunciado a
descreve como opcional; o serviço SQLite de registro e consulta foi
implementado. A decisão final, os testes adicionais e a responsabilidade pelo
código entregue são humanos.

## Declaração

Declaro que utilizei a ferramenta de Inteligência Artificial **GitHub Copilot
(Copilot SDK no VS Code; modelo e versão do modelo não identificados nos
metadados desta sessão, a confirmar no seletor do VS Code e no Catálogo de IA
vigente do CESAR)** nesta atividade, com a finalidade de gerar um rascunho sobre
a implementação dos Exercícios 1 a 5 e da atividade aplicada da Aula 8 (Hooks,
Context, Zustand e persistência local), sobre o qual realizei análise crítica
(curadoria) das informações apresentadas. Não tratei dados pessoais no uso
desta ferramenta. Revisei criticamente o conteúdo gerado, identificando seus
acertos e eventuais imprecisões, e assumo a responsabilidade integral pela
versão final apresentada.
