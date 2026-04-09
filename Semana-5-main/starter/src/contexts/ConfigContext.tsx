// ============================================
// PROYECTO SEMANA 05: Sistema de Configuración UI
// DOMINIO: Productora Audiovisual
// Archivo: contexts/ConfigContext.tsx
// ============================================

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react';

// ============================================
// TIPOS
// ============================================

export interface ConfigState {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  density: 'compact' | 'normal' | 'spacious';
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
}

type ConfigAction =
  | { type: 'SET_THEME'; payload: ConfigState['theme'] }
  | { type: 'SET_FONT_SIZE'; payload: ConfigState['fontSize'] }
  | { type: 'SET_DENSITY'; payload: ConfigState['density'] }
  | { type: 'SET_NOTIFICATION'; payload: { key: keyof ConfigState['notifications']; value: boolean } }
  | { type: 'SET_CONFIG'; payload: Partial<ConfigState> }
  | { type: 'RESET' };

interface ConfigContextValue {
  config: ConfigState;
  setTheme: (theme: ConfigState['theme']) => void;
  setFontSize: (fontSize: ConfigState['fontSize']) => void;
  setDensity: (density: ConfigState['density']) => void;
  setNotification: (key: keyof ConfigState['notifications'], value: boolean) => void;
  reset: () => void;
}

// ============================================
// CONSTANTES
// ============================================

const STORAGE_KEY = 'audiovisual-panel-config';

const defaultConfig: ConfigState = {
  theme: 'system',
  fontSize: 'medium',
  density: 'normal',
  notifications: {
    email: true,
    push: true,
    sound: true,
  },
};

// ============================================
// HELPER: Cargar configuración inicial
// ============================================

const loadInitialConfig = (): ConfigState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validar que tenga todas las propiedades
      return {
        theme: parsed.theme || defaultConfig.theme,
        fontSize: parsed.fontSize || defaultConfig.fontSize,
        density: parsed.density || defaultConfig.density,
        notifications: {
          email: parsed.notifications?.email ?? defaultConfig.notifications.email,
          push: parsed.notifications?.push ?? defaultConfig.notifications.push,
          sound: parsed.notifications?.sound ?? defaultConfig.notifications.sound,
        },
      };
    }
  } catch (error) {
    console.error('Error loading config from localStorage:', error);
  }
  return defaultConfig;
};

// ============================================
// HELPER: Detectar tema del sistema
// ============================================

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

// ============================================
// HELPER: Aplicar tema al DOM
// ============================================

const applyThemeToDOM = (theme: ConfigState['theme']) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  if (theme === 'system') {
    const systemTheme = getSystemTheme();
    root.setAttribute('data-theme', systemTheme);
  } else {
    root.setAttribute('data-theme', theme);
  }
};

// ============================================
// HELPER: Aplicar fontSize al DOM
// ============================================

const applyFontSizeToDOM = (fontSize: ConfigState['fontSize']) => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  root.setAttribute('data-font-size', fontSize);
};

// ============================================
// HELPER: Aplicar density al DOM
// ============================================

const applyDensityToDOM = (density: ConfigState['density']) => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  root.setAttribute('data-density', density);
};

// ============================================
// REDUCER
// ============================================

const configReducer = (state: ConfigState, action: ConfigAction): ConfigState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
      
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
      
    case 'SET_DENSITY':
      return { ...state, density: action.payload };
      
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.payload.key]: action.payload.value,
        },
      };
      
    case 'SET_CONFIG':
      return {
        ...state,
        ...action.payload,
        notifications: action.payload.notifications
          ? { ...state.notifications, ...action.payload.notifications }
          : state.notifications,
      };
      
    case 'RESET':
      return defaultConfig;
      
    default:
      return state;
  }
};

// ============================================
// CONTEXT
// ============================================

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

// ============================================
// HOOK: useConfig
// ============================================

export const useConfig = (): ConfigContextValue => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

// ============================================
// PROVIDER
// ============================================

interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, dispatch] = useReducer(configReducer, loadInitialConfig());

  // Persistir en localStorage cuando cambia la configuración
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving config to localStorage:', error);
    }
  }, [config]);

  // Aplicar tema al DOM
  useEffect(() => {
    applyThemeToDOM(config.theme);
  }, [config.theme]);

  // Aplicar fontSize al DOM
  useEffect(() => {
    applyFontSizeToDOM(config.fontSize);
  }, [config.fontSize]);

  // Aplicar density al DOM
  useEffect(() => {
    applyDensityToDOM(config.density);
  }, [config.density]);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    if (config.theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      applyThemeToDOM('system');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [config.theme]);

  // Acciones
  const setTheme = (theme: ConfigState['theme']) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const setFontSize = (fontSize: ConfigState['fontSize']) => {
    dispatch({ type: 'SET_FONT_SIZE', payload: fontSize });
  };

  const setDensity = (density: ConfigState['density']) => {
    dispatch({ type: 'SET_DENSITY', payload: density });
  };

  const setNotification = (key: keyof ConfigState['notifications'], value: boolean) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { key, value } });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const value: ConfigContextValue = {
    config,
    setTheme,
    setFontSize,
    setDensity,
    setNotification,
    reset,
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};

// ============================================
// HOOK AUXILIAR: useSystemTheme
// ============================================

export const useSystemTheme = (): 'light' | 'dark' => {
  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>(getSystemTheme());

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return systemTheme;
};

// ============================================
// HOOK AUXILIAR: useEffectiveTheme
// ============================================

export const useEffectiveTheme = (): 'light' | 'dark' => {
  const { config } = useConfig();
  const systemTheme = useSystemTheme();

  return config.theme === 'system' ? systemTheme : config.theme;
};