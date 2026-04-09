// ============================================
// Hook: useFilter
// DOMINIO: Genérico
// Filtra un array basado en criterios
// ============================================

import { useState, useMemo } from 'react';

interface FilterOptions<T> {
  searchTerm?: string;
  searchFields?: (keyof T)[];
  filterFn?: (item: T) => boolean;
}

/**
 * Hook para filtrar arrays
 * @param items - Array original
 * @param options - Opciones de filtrado
 * @returns { filteredItems, setSearchTerm, setFilter }
 */
export const useFilter = <T extends Record<string, any>>(
  items: T[],
  options: FilterOptions<T> = {}
) => {
  const [searchTerm, setSearchTerm] = useState<string>(options.searchTerm || '');
  const [customFilter, setCustomFilter] = useState<((item: T) => boolean) | null>(null);

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Aplicar búsqueda
    if (searchTerm && options.searchFields && options.searchFields.length > 0) {
      const term = searchTerm.toLowerCase();
      result = result.filter((item) =>
        options.searchFields!.some((field) => {
          const value = item[field];
          return value && String(value).toLowerCase().includes(term);
        })
      );
    }

    // Aplicar filtro personalizado
    if (options.filterFn) {
      result = result.filter(options.filterFn);
    }

    if (customFilter) {
      result = result.filter(customFilter);
    }

    return result;
  }, [items, searchTerm, customFilter, options.filterFn, options.searchFields]);

  const setFilter = (filterFn: (item: T) => boolean) => {
    setCustomFilter(() => filterFn);
  };

  const clearFilter = () => {
    setCustomFilter(null);
    setSearchTerm('');
  };

  return {
    filteredItems,
    searchTerm,
    setSearchTerm,
    setFilter,
    clearFilter,
  };
};