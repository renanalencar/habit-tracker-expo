import { Stack } from 'expo-router';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  return (
    
    <GluestackUIProvider mode="dark">
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="habit/[id]" options={{ title: 'Detalhes do Hábito' }} />
    </Stack>
    </GluestackUIProvider>
  
  );
}
