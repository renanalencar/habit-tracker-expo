// Atividade 1 — Tela Sobre
// Onde: src/app/sobre.tsx

import { StyleSheet, Text, View } from 'react-native';

export default function TelaSobre() {
  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Rastreador de Micro-hábitos</Text>
      <Text style={estilos.subtitulo}>Aula 7 · Navegação e notificações locais</Text>
      <Text style={estilos.limitacao}>
        Acompanhe seus hábitos, consulte seu progresso e agende lembretes diretamente no
        dispositivo.
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: '700', color: '#333' },
  subtitulo: { fontSize: 16, color: '#666' },
  limitacao: { fontSize: 14, color: '#999', fontStyle: 'italic', lineHeight: 20 },
});
