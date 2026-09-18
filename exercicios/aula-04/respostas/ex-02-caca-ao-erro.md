# Exercício 2 — Caça ao erro

**Nível:** ⭐⭐ · **Tempo:** 5 min · **Sem computador**

O código abaixo tem **seis** erros relacionados ao conteúdo da Aula 4 (e um da Aula 3, de brinde).

```tsx
import { useState } from 'react';
import { ScrollView, FlatList, Pressable, Text, View, StyleSheet } from 'react-native';

const HABITOS: Habito[] = [ /* 200 itens */ ];

export default function TelaHabitos() {
  const [habitos, setHabitos] = useState(HABITOS);

  function concluir(id: string) {
    const alvo = habitos.find((h) => h.id === id);
    if (alvo) alvo.status = 'concluido';
    setHabitos(habitos);
  }

  return (
    <ScrollView>
      <Text style={styles.titulo}>Hábitos de hoje</Text>
      <FlatList
        data={habitos}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <Pressable
            onPressIn={() => concluir(item.id)}
            style={[styles.item, styles.itemPressionado]}
          >
            {item.titulo}
          </Pressable>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 20, fontWeight: '600' },
  item: { padding: 16, marginBottom: 8, backgroundColor: '#fff' },
  itemPressionado: { backgroundColor: '#eee' },
});
```

## Correção

> **Não basta dizer o que está errado — diga o que acontece na tela.**
> Se você não consegue descrever o que o usuário vê, provavelmente é preferência sua, não um erro.

<!-- TODO 5: preencha as seis linhas dos erros da Aula 4 (toque e listas). -->

| # | Linha / trecho | O que está errado | O que o usuário vê | Correção |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |

<!-- TODO 6: a sétima linha é o erro da Aula 3 — o que impede o arquivo de sequer rodar. -->

| # | Linha / trecho | O que está errado | O que o usuário vê | Correção |
|---|---|---|---|---|
| 7 | | | | *(o da Aula 3)* |
