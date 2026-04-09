// ============================================
// Hook: useToggle
// DOMINIO: Genérico
// Alterna un valor booleano
// ============================================

import { useState, useCallback } from 'react';

/**
 * Hook para manejar estado booleano toggle
 * @param initialValue - Valor inicial (default: false)
 * @returns [value, toggle, setValue]
 */
export const useToggle = (initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const set = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [value, toggle, set];
};