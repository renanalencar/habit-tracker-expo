// Exercício 2 — useEffect: cronômetro de foco com cleanup
// Onde: src/components/focus-timer.tsx

import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/theme-context';

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <View style={[styles.box, isDark && styles.boxEscuro]}>
      <Text style={[styles.timer, isDark && styles.textoEscuro]}>{seconds}s</Text>
      <View style={styles.actions}>
        <Pressable
          style={styles.button}
          onPress={() => setIsRunning((prev) => !prev)}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Pausar' : 'Iniciar Foco'}</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.resetButton]}
          onPress={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
        >
          <Text style={styles.buttonText}>Zerar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 20, alignItems: 'center', borderRadius: 12, backgroundColor: '#F3E9DC' },
  boxEscuro: { backgroundColor: '#303030' },
  timer: { fontSize: 36, fontWeight: 'bold', marginBottom: 16 },
  textoEscuro: { color: '#F5F5F5' },
  actions: { flexDirection: 'row', gap: 12 },
  button: { backgroundColor: '#FF6002', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  resetButton: { backgroundColor: '#555' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
