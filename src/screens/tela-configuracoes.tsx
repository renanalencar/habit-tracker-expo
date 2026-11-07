// Exercício 3 — useContext: Tema Claro/Escuro em todo o app
// Onde: src/screens/tela-configuracoes.tsx (rota: src/app/settings.tsx)

import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../context/theme-context';

export function TelaConfiguracoes() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, isDark && styles.containerEscuro]}>
      <Text style={[styles.titulo, isDark && styles.textoEscuro]}>Configurações</Text>
      <Text style={[styles.texto, isDark && styles.textoEscuro]}>
        Gerencie preferências e o tema do aplicativo.
      </Text>

      <View style={[styles.linhaTema, isDark && styles.linhaTemaEscura]}>
        <Text style={[styles.rotulo, isDark && styles.textoEscuro]}>Modo Escuro</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          accessibilityLabel="Ativar modo escuro"
          trackColor={{ false: '#767577', true: '#FF6002' }}
          thumbColor={isDark ? '#fff' : undefined}
        />
      </View>
    </View>
  );
}

export default TelaConfiguracoes;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16, padding: 24 },
  containerEscuro: { backgroundColor: '#121212' },
  titulo: { fontSize: 20, fontWeight: '700' },
  texto: { fontSize: 16, color: '#555', textAlign: 'center' },
  textoEscuro: { color: '#F5F5F5' },
  linhaTema: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  linhaTemaEscura: { borderColor: '#555' },
  rotulo: { fontSize: 16, fontWeight: '600' },
});
