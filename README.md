# Habit Tracker Expo

Projeto base para a **1ª Verificação de Aprendizagem** da disciplina de Desenvolvimento Mobile — 2026.1.

## Sobre o projeto

Aplicativo de rastreamento de hábitos diários desenvolvido com **Expo + TypeScript**. Permite visualizar, marcar como concluídos e excluir hábitos.

## Estrutura

```
habit-tracker-expo/
├── App.tsx
├── src/
│   ├── components/
│   │   ├── HabitItem.tsx
│   │   └── HabitList.tsx
│   ├── types/
│   │   └── Habit.ts
│   └── utils/
│       └── handle-api.ts
├── assets/
├── app.json
└── package.json
```

## Como executar

```bash
npm install
npx expo start
```

> O app utiliza dados mockados automaticamente caso a API não esteja disponível.

## Entrega da prova

1. Faça um **fork** ou clone deste repositório para um repositório **privado** na sua conta GitHub.
2. Resolva os quesitos indicados pelos comentários `TODO` no código.
3. Adicione o usuário **`mr-costaalencar`** como colaborador do repositório privado.
4. Mantenha um histórico de commits evidenciando o progresso.

<!-- TODO Q6d — adicionar seção "Deploy com EAS" aqui -->
