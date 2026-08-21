import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// TODO(Aula 2 — Ex. 3): este componente tem erros propositais de View/Text/StyleSheet
// para você corrigir — ver exercises.md da Aula 2.


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Rastreador de Micro-hábitos e Condicionamento Físico</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
