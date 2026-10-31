import 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function LayoutRaiz() {
  const router = useRouter();

  useEffect(() => {
    const recebida = Notifications.addNotificationReceivedListener(() => {
      console.log('Notificação recebida');
    });

    const tocada = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notificação tocada');

      const habitId = response.notification.request.content.data?.habitId;
      if (typeof habitId !== 'string') {
        console.warn('A notificação tocada não contém um ID de hábito válido.');
        return;
      }

      router.push({ pathname: '/habit/[id]', params: { id: habitId } });
    });

    return () => {
      recebida.remove();
      tocada.remove();
    };
  }, [router]);

  return (
    <Drawer
      backBehavior="initialRoute"
      screenOptions={{
        headerTintColor: '#f26522',
        drawerActiveTintColor: '#f26522',
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="home"
              size={size}
              color={typeof color === 'string' ? color : '#f26522'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: 'Sobre',
          drawerLabel: 'Sobre',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="info-outline"
              size={size}
              color={typeof color === 'string' ? color : '#f26522'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Configurações',
          drawerLabel: 'Configurações',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="settings"
              size={size}
              color={typeof color === 'string' ? color : '#f26522'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="habit"
        options={{
          headerShown: false,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="registrar-foto"
        options={{
          title: 'Foto do hábito',
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="galeria"
        options={{
          title: 'Galeria do hábito',
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="sobre"
        options={{
          title: 'Sobre o app',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}
