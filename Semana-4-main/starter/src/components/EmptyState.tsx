// ============================================
// COMPONENTE: EmptyState
// DOMINIO: Productora Audiovisual
// ============================================
// Muestra mensaje cuando no hay proyectos

import React from 'react';

interface EmptyStateProps {
  message?: string;
  onClearFilters?: () => void;
}

/**
 * Estado vacío del catálogo de proyectos
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No se encontraron proyectos que coincidan con los filtros',
  onClearFilters,
}) => {
  return (
    <div className="empty-state">
      <span className="icon">🎬</span>
      <h3>Sin proyectos</h3>
      <p>{message}</p>

      {/* Botón condicional para limpiar filtros */}
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="btn-clear">
          🧹 Limpiar filtros
        </button>
      )}
    </div>
  );
};