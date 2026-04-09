import React, { useState, useEffect } from 'react';
import type { Proyecto } from '../types';
import { fetchProyectos } from '../utils/api';

// ============================================
// COMPONENTE: ItemList
// DOMINIO: Productora Audiovisual
// Muestra la lista de proyectos en producción
// ============================================

export const ItemList: React.FC = () => {
  // Estados para data, loading, error
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para fetch de datos con AbortController
  useEffect(() => {
    const controller = new AbortController();

    const loadProyectos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProyectos(controller.signal);
        setProyectos(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProyectos();

    // Cleanup: cancelar petición al desmontar
    return () => {
      controller.abort();
    };
  }, []);

  // Renderizado: Loading
  if (loading) {
    return (
      <div className="item-list">
        <h2>🎬 Cargando proyectos...</h2>
      </div>
    );
  }

  // Renderizado: Error
  if (error) {
    return (
      <div className="item-list error">
        <h2>❌ Error al cargar proyectos</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          🔄 Reintentar
        </button>
      </div>
    );
  }

  // Renderizado: Lista de proyectos
  return (
    <div className="item-list">
      <h2>🎥 Proyectos en Producción</h2>
      
      <p className="item-count">
        📋 Total: {proyectos.length} proyectos activos
      </p>

      <ul className="items">
        {proyectos.map((proyecto) => (
          <li key={proyecto.id} className="item-card">
            <h3>{proyecto.titulo}</h3>
            <p><strong>Cliente:</strong> {proyecto.cliente}</p>
            <p><strong>Tipo:</strong> {proyecto.tipo}</p>
            <p><strong>Estado:</strong> 
              <span className={`estado-badge estado-${proyecto.estado.toLowerCase().replace(' ', '-')}`}>
                {proyecto.estado}
              </span>
            </p>
            <p><strong>Progreso:</strong> {proyecto.progreso}%</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${proyecto.progreso}%` }}
              />
            </div>
            <p><strong>Entrega:</strong> {proyecto.fechaEntrega}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};