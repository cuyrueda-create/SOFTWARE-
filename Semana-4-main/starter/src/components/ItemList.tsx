// ============================================
// COMPONENTE: ItemList
// DOMINIO: Productora Audiovisual
// ============================================
// Renderiza la lista de proyectos

import React from 'react';
import { Proyecto } from '../types';
import { ItemCard } from './ItemCard';
import { EmptyState } from './EmptyState';

interface ItemListProps {
  items: Proyecto[];
  isLoading?: boolean;
  error?: string | null;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onClearFilters?: () => void;
}

/**
 * Lista de proyectos del catálogo
 */
export const ItemList: React.FC<ItemListProps> = ({
  items,
  isLoading = false,
  error = null,
  onDelete,
  onView,
  onClearFilters,
}) => {
  // 1. Estado de carga
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🎬</div>
        <p>Cargando proyectos...</p>
      </div>
    );
  }

  // 2. Estado de error
  if (error) {
    return (
      <div className="error-container">
        <span className="error-icon">⚠️</span>
        <h3>Error al cargar proyectos</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn-retry">
          🔄 Reintentar
        </button>
      </div>
    );
  }

  // 3. Estado vacío
  if (items.length === 0) {
    return (
      <EmptyState 
        message="No hay proyectos que coincidan con los filtros seleccionados"
        onClearFilters={onClearFilters}
      />
    );
  }

  // 4. Renderizar lista de proyectos
  return (
    <div className="item-list">
      <div className="item-grid">
        {items.map((proyecto) => (
          <ItemCard
            key={proyecto.id}
            item={proyecto}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};