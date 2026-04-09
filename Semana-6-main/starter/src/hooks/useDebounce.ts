// ============================================
// Hook: useDebounce
// DOMINIO: Genérico
// Retrasa la actualización de un valor
// ============================================

import { useState, useEffect } from 'react';

/**
 * Hook para aplicar debounce a un valor
 * @param value - Valor a debounce
 * @param delay - Milisegundos de retraso (default: 300)
 * @returns Valor con debounce aplicado
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};