// Exercício 7 — Corrija: a galeria de hábitos que pisca (casa)
// Nível ⭐⭐⭐ · 15 min
//
// Para pré-visualizar: descomente <TelaGaleria /> em App.tsx.
//
// Este código RODA. Mas com 60 itens e rolagem rápida ele tem QUATRO defeitos visíveis:
//   a) a lista PULA quando as imagens chegam;
//   b) aparece por um instante a FOTO DO ITEM ANTERIOR;
//   c) a mesma imagem é RECARREGADA toda vez que volta à tela;
//   d) uma prop NÃO FAZ NADA.
//
// A DICA do enunciado: três dos quatro defeitos se resolvem trocando UM import e
// acrescentando TRÊS props. O quarto é uma prop que só faz sentido depois da troca.

// TODO 24: encontre os quatro defeitos e corrija. (Há uma dica no enunciado.)

// TODO 25: escreva aqui, em 2–3 linhas, qual dos quatro é o MAIS GRAVE para o
//          usuário e por quê. Não é "o mais feio" — é o que causa mais dano a
//          quem usa a galeria.
//
//   Resposta: ______________________________________________________________
//   ________________________________________________________________________
//   ________________________________________________________________________

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native';

interface Habito {
  id: string;
  titulo: string;
  fotoUrl: string;
}

const HABITOS: Habito[] = Array.from({ length: 60 }, (_, i) => ({
  id: String(i),
  titulo: `Treino ${i + 1}`,
  fotoUrl: `https://picsum.photos/seed/habito${i}/600/400`,
}));

function ItemHabito({ item }: { item: Habito }) {
  return (
    <View style={estilos.card}>
      <Image source={{ uri: item.fotoUrl }} style={estilos.foto} resizeMode="cover" />
      <Text style={estilos.titulo}>{item.titulo}</Text>
    </View>
  );
}

export default function TelaGaleria() {
  return (
    <FlatList
      data={HABITOS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ItemHabito item={item} />}
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
