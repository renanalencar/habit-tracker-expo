// Exercício 7 — Corrija: a galeria de hábitos que pisca (casa)
// Nível ⭐⭐⭐ · 15 min
//
// Para pré-visualizar: descomente <TelaGaleria /> em App.tsx.
//
// Este código RODA. Mas com 60 itens e rolagem rápida ele tinha QUATRO defeitos visíveis:
//   a) a lista PULA quando as imagens chegam;
//   b) aparece por um instante a FOTO DO ITEM ANTERIOR;
//   c) a mesma imagem é RECARREGADA toda vez que volta à tela;
//   d) uma prop NÃO FAZ NADA.
//
// A DICA do enunciado: três dos quatro defeitos se resolvem trocando UM import e
// acrescentando TRÊS props. O quarto é uma prop que só faz sentido depois da troca.

// TODO 24: encontre os quatro defeitos e corrija. (Há uma dica no enunciado.)
// OS QUATRO DEFEITOS E AS CORREÇÕES:
//
//   1. IMPORT ERRADO — a causa-raiz. `Image` vinha do `react-native`: sem cache em disco
//      (defeito c), sem `placeholder` (a), sem `recyclingKey` (b), sem `contentFit`.
//      ❌ import { Image } from 'react-native';
//      ✅ import { Image } from 'expo-image';
//
//   2. `resizeMode` NÃO FAZ NADA (defeito d) — já era deprecado antes da troca, e depois
//      dela simplesmente não existe. A prop equivalente do `expo-image` é `contentFit`.
//      ❌ resizeMode="cover"   ✅ contentFit="cover"
//
//   3. SEM `placeholder`, A LISTA PULA (defeito a). O card tem altura fixa (180), mas o
//      espaço fica visualmente vazio até a imagem chegar e o card "aparece" de repente.
//      ✅ placeholder={{ blurhash: BLURHASH }} + placeholderContentFit="cover" + transition={200}
//
//   4. SEM `recyclingKey`, APARECE A FOTO DO ITEM ANTERIOR (defeito b). A FlatList recicla
//      as células — é assim que ela é rápida (Aula 4) — e a célula reciclada exibe o
//      conteúdo antigo até o novo carregar.  ✅ recyclingKey={item.id}
//
// TODO 25: escreva aqui, em 2–3 linhas, qual dos quatro é o MAIS GRAVE para o
//          usuário e por quê. Não é "o mais feio" — é o que causa mais dano a
//          quem usa a galeria.
//
// QUAL DOS QUATRO É O MAIS GRAVE, E POR QUÊ:
//
//   Resposta: o `recyclingKey` ausente. Os outros três degradam a experiência (a lista
//   pula, a imagem recarrega, uma prop é inerte); este MENTE — mostra a foto de um treino
//   ao lado do título de outro. Numa galeria de treinos isso é informação incorreta na
//   tela, ainda que por meio segundo, e o usuário não tem como saber que viu errado.
//
// Bônus da Aula 4 também corrigido: `renderItem` era uma arrow anônima declarada dentro
// do JSX. Como ele não depende de estado local, foi declarado FORA do componente.

import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { Image } from 'expo-image';

interface Habito {
  id: string;
  titulo: string;
  fotoUrl: string;
}

const BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

const HABITOS: Habito[] = Array.from({ length: 60 }, (_, i) => ({
  id: String(i),
  titulo: `Treino ${i + 1}`,
  fotoUrl: `https://picsum.photos/seed/habito${i}/600/400`,
}));

function ItemHabito({ item }: { item: Habito }) {
  return (
    <View style={estilos.card}>
      <Image
        source={{ uri: item.fotoUrl }}
        style={estilos.foto}
        contentFit="cover"
        placeholder={{ blurhash: BLURHASH }}
        placeholderContentFit="cover"
        transition={200}
        recyclingKey={item.id}
      />
      <Text style={estilos.titulo}>{item.titulo}</Text>
    </View>
  );
}

function renderizarItem({ item }: ListRenderItemInfo<Habito>) {
  return <ItemHabito item={item} />;
}

export default function TelaGaleria() {
  return (
    <FlatList
      data={HABITOS}
      keyExtractor={(item) => item.id}
      renderItem={renderizarItem}
      contentContainerStyle={estilos.lista}
      ListEmptyComponent={<Text>Nenhum hábito registrado ainda.</Text>}
    />
  );
}

const estilos = StyleSheet.create({
  lista: { padding: 16, gap: 12 },
  card: { borderRadius: 12, overflow: 'hidden', backgroundColor: '#f4f4f4' },
  foto: { width: '100%', height: 180 },
  titulo: { padding: 12, fontSize: 16, fontWeight: '600' },
});
