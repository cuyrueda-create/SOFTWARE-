// ============================================
// COMPONENTE: SearchBar
// DOMINIO: Productora Audiovisual
// ============================================
// Barra de búsqueda en tiempo real para proyectos

import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Barra de búsqueda para el catálogo de proyectos
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = '🔍 Buscar por título o cliente...',
}) => {
  return (
    <div className="search-bar">
      {/* Icono de búsqueda */}
      <span className="search-icon">🔍</span>
      
      {/* Input de búsqueda */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />

      {/* Botón para limpiar (condicional) */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="clear-button"
          aria-label="Limpiar búsqueda"
          title="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
};