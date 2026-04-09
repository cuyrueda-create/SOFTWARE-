// ============================================
// PROYECTO SEMANA 05: Sistema de Configuración UI
// DOMINIO: Productora Audiovisual
// Archivo: hooks/useLocalStorage.ts
// ============================================

import { useState, useEffect, useCallback } from 'react';

// ============================================
// HOOK useLocalStorage
// ============================================

/**
 * Hook personalizado para sincronizar estado con localStorage
 * @param key - Clave para almacenar en localStorage
 * @param initialValue - Valor inicial si no existe en localStorage
 * @returns [storedValue, setValue, removeValue] - Tupla con valor, setter y remover
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  
  // Función para leer el valor inicial de localStorage
  const readValue = useCallback((): T => {
    // Si estamos en el servidor (SSR), retornar valor inicial
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      
      // Parsear el JSON almacenado o retornar valor inicial
      if (item !== null) {
        const parsed = JSON.parse(item);
        
        // Validación básica para objetos (asegurar estructura)
        if (typeof parsed === 'object' && parsed !== null) {
          return { ...initialValue, ...parsed };
        }
        
        return parsed;
      }
      
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // Estado para almacenar el valor actual
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Función para actualizar el valor en estado y localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Permitir que value sea una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar en estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage (solo en cliente)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Disparar evento personalizado para sincronizar entre pestañas
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: JSON.stringify(valueToStore),
        }));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Función para eliminar el valor de localStorage
  const removeValue = useCallback(() => {
    try {
      // Eliminar de localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        
        // Disparar evento personalizado
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: null,
        }));
      }
      
      // Resetear al valor inicial
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sincronizar cuando cambia en otra pestaña/ventana
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          const newValue = JSON.parse(event.newValue);
          setStoredValue((prevValue) => {
            // Si es un objeto, hacer merge
            if (typeof newValue === 'object' && newValue !== null &&
                typeof prevValue === 'object' && prevValue !== null) {
              return { ...prevValue, ...newValue };
            }
            return newValue;
          });
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error);
        }
      } else if (event.key === key && event.newValue === null) {
        // El valor fue eliminado
        setStoredValue(initialValue);
      }
    };

    // Escuchar cambios en localStorage (otras pestañas)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

// ============================================
// HOOK useLocalStorageWithValidation
// ============================================

/**
 * Versión con validación del hook useLocalStorage
 * @param key - Clave para almacenar
 * @param initialValue - Valor inicial
 * @param validate - Función de validación
 */
export const useLocalStorageWithValidation = <T,>(
  key: string,
  initialValue: T,
  validate: (value: unknown) => value is T
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  
  const readWithValidation = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      
      if (item !== null) {
        const parsed = JSON.parse(item);
        
        // Validar el valor parseado
        if (validate(parsed)) {
          return parsed;
        }
        
        // Si no pasa la validación, eliminar el valor inválido
        console.warn(`Invalid value for key "${key}", resetting to initial value`);
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error reading/validating localStorage key "${key}":`, error);
    }
    
    return initialValue;
  }, [key, initialValue, validate]);

  const [storedValue, setStoredValue] = useState<T>(readWithValidation);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Validar antes de guardar
      if (!validate(valueToStore)) {
        throw new Error('Invalid value provided');
      }
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: JSON.stringify(valueToStore),
        }));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, validate]);

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        window.dispatchEvent(new StorageEvent('storage', {
          key,
          newValue: null,
        }));
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

// ============================================
// HOOK useLocalStorageWithExpiry
// ============================================

interface StorageItemWithExpiry<T> {
  value: T;
  expiry: number;
}

/**
 * Hook useLocalStorage con soporte para expiración
 * @param key - Clave para almacenar
 * @param initialValue - Valor inicial
 * @param ttl - Tiempo de vida en milisegundos
 */
export const useLocalStorageWithExpiry = <T,>(
  key: string,
  initialValue: T,
  ttl: number // Time to live en milisegundos
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  
  const readWithExpiry = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      
      if (item !== null) {
        const parsed: StorageItemWithExpiry<T> = JSON.parse(item);
        
        // Verificar si ha expirado
        if (parsed.expiry && Date.now() > parsed.expiry) {
          window.localStorage.removeItem(key);
          return initialValue;
        }
        
        return parsed.value;
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    
    return initialValue;
  }, [key, initialValue, ttl]);

  const [storedValue, setStoredValue] = useState<T>(readWithExpiry);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      const itemWithExpiry: StorageItemWithExpiry<T> = {
        value: valueToStore,
        expiry: Date.now() + ttl,
      };
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(itemWithExpiry));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, ttl]);

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};