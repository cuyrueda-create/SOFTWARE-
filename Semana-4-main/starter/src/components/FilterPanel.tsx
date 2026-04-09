// ============================================
// COMPONENTE: FilterPanel
// DOMINIO: Productora Audiovisual
// ============================================
// Panel con filtros para proyectos

import React from 'react';
import { TipoProyecto } from '../types';
import { tiposProyecto } from '../data/items';

interface FilterPanelProps {
  selectedTipo: TipoProyecto;
  onTipoChange: (tipo: TipoProyecto) => void;
  showOnlyActive: boolean;
  onActiveChange: (value: boolean) => void;
  onClearFilters: () => void;
}

/**
 * Panel de filtros del catálogo de proyectos
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedTipo,
  onTipoChange,
  showOnlyActive,
  onActiveChange,
  onClearFilters,
}) => {
  return (
    <div className="filter-panel">
      <h3>🎯 Filtros</h3>

      {/* Selector de tipo de proyecto */}
      <div className="filter-group">
        <label htmlFor="tipo">Tipo de Proyecto:</label>
        <select
          id="tipo"
          value={selectedTipo}
          onChange={(e) => onTipoChange(e.target.value as TipoProyecto)}
          className="filter-select"
        >
          {tiposProyecto.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.icon} {tipo.label}
            </option>
          ))}
        </select>
      </div>

      {/* Checkbox de proyectos activos */}
      <div className="filter-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showOnlyActive}
            onChange={(e) => onActiveChange(e.target.checked)}
          />
          <span>🎥 Solo proyectos activos</span>
        </label>
        <p className="filter-hint">(Oculta proyectos entregados)</p>
      </div>

      {/* Botón limpiar filtros */}
      <button onClick={onClearFilters} className="btn-clear">
        🧹 Limpiar filtros
      </button>
    </div>
  );
};