import { Stack } from 'expo-router';

export default function HabitLayout() {
  return (
    <Stack screenOptions={{ headerTintColor: '#f26522' }}>
      <Stack.Screen name="[id]" options={{ title: 'Detalhes do hábito' }} />
    </Stack>
  );
}
