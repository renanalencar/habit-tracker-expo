// Exercício 3 — useContext: Tema Claro/Escuro em todo o app
// Atividade Aplicada (Requisito 1) — Tema Global Persistido (useContext + AsyncStorage)
// Onde: src/context/theme-context.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = '@habits:theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const changedWhileLoading = useRef(false);

  useEffect(() => {
    let active = true;

    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (!active) return;

        if (savedTheme !== null && !changedWhileLoading.current) {
          const parsedTheme: unknown = JSON.parse(savedTheme);
          if (typeof parsedTheme !== 'boolean') {
            throw new TypeError('A preferência de tema salva não é um booleano.');
          }
          setIsDark(parsedTheme);
        }
      } catch (error) {
        console.error('Não foi possível carregar a preferência de tema.', error);
      } finally {
        if (active) setThemeLoaded(true);
      }
    }

    void loadTheme();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;

    AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark)).catch((error: unknown) => {
      console.error('Não foi possível salvar a preferência de tema.', error);
    });
  }, [isDark, themeLoaded]);

  const toggleTheme = () => {
    if (!themeLoaded) changedWhileLoading.current = true;
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider.');
  }
  return context;
}
