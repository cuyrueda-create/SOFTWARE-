// ============================================
// COMPONENTE: Catalog (Principal)
// DOMINIO: Productora Audiovisual
// ============================================
// Orquesta todos los componentes del catálogo de proyectos

import React, { useState, useMemo } from 'react';
import { Proyecto, TipoProyecto, SortOption } from '../types';
import { proyectos as initialProyectos } from '../data/items';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { SortSelector } from './SortSelector';
import { ItemList } from './ItemList';

/**
 * Componente principal del catálogo de proyectos audiovisuales
 */
export const Catalog: React.FC = () => {
  // ============================================
  // ESTADOS
  // ============================================

  // Datos
  const [proyectos, setProyectos] = useState<Proyecto[]>(initialProyectos);

  // Estados de UI
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTipo, setSelectedTipo] = useState<TipoProyecto>('todos');
  const [showOnlyActive, setShowOnlyActive] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>('progreso-desc');

  // Debounce para búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // ============================================
  // PROCESAMIENTO DE DATOS
  // ============================================

  const processedItems = useMemo(() => {
    let result = [...proyectos];

    // 1. Filtrar por búsqueda (título o cliente)
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter((proyecto) =>
        proyecto.titulo.toLowerCase().includes(term) ||
        proyecto.cliente.toLowerCase().includes(term)
      );
    }

    // 2. Filtrar por tipo de proyecto
    if (selectedTipo !== 'todos') {
      result = result.filter((proyecto) => proyecto.tipo === selectedTipo);
    }

    // 3. Filtrar por proyectos activos (no entregados)
    if (showOnlyActive) {
      result = result.filter((proyecto) => proyecto.estado !== 'Entregado');
    }

    // 4. Ordenar (sin mutar)
    switch (sortBy) {
      case 'titulo-asc':
        result.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'titulo-desc':
        result.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      case 'progreso-asc':
        result.sort((a, b) => a.progreso - b.progreso);
        break;
      case 'progreso-desc':
        result.sort((a, b) => b.progreso - a.progreso);
        break;
      case 'fecha-asc':
        result.sort((a, b) => a.fechaEntrega.localeCompare(b.fechaEntrega));
        break;
      case 'fecha-desc':
        result.sort((a, b) => b.fechaEntrega.localeCompare(a.fechaEntrega));
        break;
    }

    return result;
  }, [proyectos, debouncedSearchTerm, selectedTipo, showOnlyActive, sortBy]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleDelete = (id: string): void => {
    if (window.confirm('¿Estás seguro de archivar este proyecto?')) {
      setProyectos((prev) => prev.filter((proyecto) => proyecto.id !== id));
    }
  };

  const handleView = (id: string): void => {
    const proyecto = proyectos.find((p) => p.id === id);
    if (proyecto) {
      alert(`🎬 ${proyecto.titulo}\n📋 Cliente: ${proyecto.cliente}\n📊 Progreso: ${proyecto.progreso}%\n📅 Entrega: ${proyecto.fechaEntrega}`);
    }
  };

  const clearFilters = (): void => {
    setSearchTerm('');
    setSelectedTipo('todos');
    setShowOnlyActive(true);
    setSortBy('progreso-desc');
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="catalog">
      <header className="catalog-header">
        <h1>🎬 Catálogo de Producción Audiovisual</h1>
        <p className="catalog-subtitle">Gestión de Proyectos en Curso</p>
      </header>

      {/* Barra de búsqueda */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="🔍 Buscar por título o cliente..."
      />

      {/* Filtros y ordenamiento */}
      <div className="controls">
        <FilterPanel
          selectedTipo={selectedTipo}
          onTipoChange={setSelectedTipo}
          showOnlyActive={showOnlyActive}
          onActiveChange={setShowOnlyActive}
          onClearFilters={clearFilters}
        />

        <SortSelector
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {/* Contador de resultados */}
      <p className="results-count">
        📋 Mostrando {processedItems.length} de {proyectos.length} proyectos
        {debouncedSearchTerm && ` que coinciden con "${debouncedSearchTerm}"`}
        {showOnlyActive && ' (activos)'}
      </p>

      {/* Lista de proyectos */}
      <ItemList
        items={processedItems}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
        onView={handleView}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default Catalog;