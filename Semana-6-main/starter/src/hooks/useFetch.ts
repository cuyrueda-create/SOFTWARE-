// ============================================
// Hook: useFetch
// DOMINIO: Genérico
// Realiza peticiones HTTP con estados de carga
// ============================================

import { useState, useEffect, useCallback } from 'react';

interface UseFetchOptions<T> {
  mockData?: T;
  delay?: number;
  immediate?: boolean;
}

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Hook para realizar peticiones fetch
 * @param url - URL del endpoint
 * @param options - Opciones de configuración
 * @returns { data, loading, error, refetch }
 */
export const useFetch = <T>(
  url: string,
  options: UseFetchOptions<T> = {}
): UseFetchReturn<T> => {
  const { mockData, delay = 500, immediate = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Si hay mockData, usarlo
      if (mockData) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setData(mockData);
        return;
      }

      // Fetch real
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setLoading(false);
    }
  }, [url, mockData, delay]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};