// Atividade 2 — A Galeria do Hábito
// Onde: src/app/galeria.tsx
//
// TODO A2.2 (OBRIGATÓRIO): escreva aqui num comentário por que a seleção múltipla
//                          e o recorte (allowsEditing) NÃO convivem:
// _______________________________________________________________________________

import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// Regra de ouro da arquitetura: o componente de miniatura mora em src/components/,
// NUNCA declarado dentro de src/app/ para não gerar rotas fantasmas.
import { MiniaturaFoto } from '../components/miniatura-foto';

// TODO A2.3: declare aqui a função/componente de lista vazia
function ListaVazia() {
  return <Text style={estilos.vazio}>Nenhuma foto escolhida ainda.</Text>;
}

export default function TelaGaleria() {
  // TODO A2.4: estado com a lista de assets, começando vazia e tipada com ImagePicker.ImagePickerAsset[]
  const [fotos, setFotos] = useState<ImagePicker.ImagePickerAsset[]>([]);

  async function escolherFotos() {
    // TODO A2.5: abra a galeria configurada para:
    //           - mediaTypes: ['images']
    //           - allowsMultipleSelection: true
    //           - selectionLimit: 6
    //           - quality: 0.7
    //           Trate o cancelamento e guarde os assets selecionados em `fotos`.
  }

  return (
    <View style={estilos.tela}>
      <Pressable onPress={escolherFotos} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Escolher até 6 fotos</Text>
      </Pressable>

      {/* TODO A2.6: FlatList configurada com:
                    - data={fotos}
                    - keyExtractor por foto.uri
                    - renderItem usando <MiniaturaFoto item={item} />
                    - numColumns={3}
                    - columnWrapperStyle={estilos.linha}
                    - contentContainerStyle={estilos.grade}
                    - ListEmptyComponent={ListaVazia} */}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  botao: { backgroundColor: '#f26522', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
  grade: { gap: 8 },
  linha: { gap: 8 },
  vazio: { fontSize: 15, color: '#666', textAlign: 'center', marginTop: 24 },
});
