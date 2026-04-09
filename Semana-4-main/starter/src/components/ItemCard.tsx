// ============================================
// COMPONENTE: ItemCard
// DOMINIO: Productora Audiovisual
// ============================================
// Muestra una tarjeta con la información de un proyecto

import React from 'react';
import { Proyecto } from '../types';

interface ItemCardProps {
  item: Proyecto;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

/**
 * Tarjeta de proyecto audiovisual
 */
export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onDelete,
  onView,
}) => {
  // Función para obtener el color del badge según el tipo
  const getTipoBadgeClass = (tipo: Proyecto['tipo']): string => {
    const classes: Record<Proyecto['tipo'], string> = {
      'Largometraje': 'badge-largometraje',
      'Comercial': 'badge-comercial',
      'Serie': 'badge-serie',
      'Videoclip': 'badge-videoclip',
      'Documental': 'badge-documental',
    };
    return classes[tipo] || 'badge-default';
  };

  // Función para obtener el color del badge según el estado
  const getEstadoBadgeClass = (estado: Proyecto['estado']): string => {
    const classes: Record<Proyecto['estado'], string> = {
      'Pre-producción': 'estado-pre',
      'Rodaje': 'estado-rodaje',
      'Post-producción': 'estado-post',
      'Colorización': 'estado-color',
      'Sonido': 'estado-sonido',
      'Entregado': 'estado-entregado',
    };
    return classes[estado] || 'estado-default';
  };

  // Función para obtener ícono del tipo
  const getTipoIcon = (tipo: Proyecto['tipo']): string => {
    const icons: Record<Proyecto['tipo'], string> = {
      'Largometraje': '🎬',
      'Comercial': '📺',
      'Serie': '📺',
      'Videoclip': '🎵',
      'Documental': '🌿',
    };
    return icons[tipo] || '🎥';
  };

  return (
    <div className="item-card">
      {/* Cabecera con título y badge de tipo */}
      <div className="card-header">
        <h3>{item.titulo}</h3>
        <span className={`badge-tipo ${getTipoBadgeClass(item.tipo)}`}>
          {getTipoIcon(item.tipo)} {item.tipo}
        </span>
      </div>

      {/* Cliente */}
      <p className="cliente">
        <strong>👤 Cliente:</strong> {item.cliente}
      </p>

      {/* Estado - Renderizado condicional con badge */}
      <div className="estado-container">
        <span className={`badge-estado ${getEstadoBadgeClass(item.estado)}`}>
          {item.estado}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="progreso-container">
        <div className="progreso-label">
          <span>📊 Progreso: {item.progreso}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${item.progreso}%` }}
          />
        </div>
      </div>

      {/* Fecha de entrega */}
      <p className="fecha-entrega">
        <strong>📅 Entrega:</strong> {item.fechaEntrega}
      </p>

      {/* Estado de actividad - Renderizado condicional */}
      {item.estado !== 'Entregado' ? (
        <span className="status activo">🎥 Proyecto Activo</span>
      ) : (
        <span className="status entregado">✅ Proyecto Entregado</span>
      )}

      {/* Acciones */}
      <div className="actions">
        {onView && (
          <button 
            onClick={() => onView(item.id)} 
            className="btn-view"
            title="Ver detalles"
          >
            👁️ Ver detalles
          </button>
        )}
        {onDelete && (
          <button 
            onClick={() => onDelete(item.id)} 
            className="btn-delete"
            title="Archivar proyecto"
          >
            🗑️ Archivar
          </button>
        )}
      </div>
    </div>
  );
};