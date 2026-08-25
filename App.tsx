import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Cabecalho from './src/components/Cabecalho';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Rastreador de Micro-hábitos e Condicionamento Físico</Text>
      <StatusBar style="auto" />
      <Cabecalho />
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
