// ============================================
// Context: ThemeContext
// DOMINIO: Productora Audiovisual
// Proveedor de tema claro/oscuro con persistencia
// ============================================

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// ============================================
// TIPOS
// ============================================

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

interface ThemeContextValue {
  theme: {
    mode: ThemeMode;
    colors: ThemeColors;
  };
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

// ============================================
// COLORES POR TEMA
// ============================================

const lightColors: ThemeColors = {
  primary: '#6c5ce7',
  secondary: '#a29bfe',
  background: '#f5f7fa',
  surface: '#ffffff',
  text: '#1a1a2e',
  textSecondary: '#6c757d',
  border: '#e9ecef',
  success: '#00b894',
  warning: '#fdcb6e',
  error: '#d63031',
};

const darkColors: ThemeColors = {
  primary: '#a29bfe',
  secondary: '#6c5ce7',
  background: '#0f0f1a',
  surface: '#1e1e2f',
  text: '#e0e0e0',
  textSecondary: '#8a8aa3',
  border: '#2d2d44',
  success: '#55efc4',
  warning: '#ffeaa7',
  error: '#ff7675',
};

// ============================================
// CONTEXTO
// ============================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================
// HOOK useTheme
// ============================================

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};

// ============================================
// PROVIDER
// ============================================

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [storedTheme, setStoredTheme] = useLocalStorage<ThemeMode>('theme-mode', 'light');
  const [mode, setMode] = useState<ThemeMode>(storedTheme);
  const [colors, setColors] = useState<ThemeColors>(mode === 'dark' ? darkColors : lightColors);

  const isDark = mode === 'dark';

  // Aplicar tema al DOM
  useEffect(() => {
    const root = document.documentElement;
    
    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
      root.style.backgroundColor = darkColors.background;
      root.style.color = darkColors.text;
    } else {
      root.setAttribute('data-theme', 'light');
      root.style.backgroundColor = lightColors.background;
      root.style.color = lightColors.text;
    }

    // CSS Variables
    const colorsToApply = mode === 'dark' ? darkColors : lightColors;
    Object.entries(colorsToApply).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [mode]);

  // Actualizar colores cuando cambia el modo
  useEffect(() => {
    setColors(mode === 'dark' ? darkColors : lightColors);
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setStoredTheme(newMode);
  };

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
    setStoredTheme(newMode);
  };

  const value: ThemeContextValue = {
    theme: { mode, colors },
    isDark,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};