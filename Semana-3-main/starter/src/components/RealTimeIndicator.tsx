import React, { useState, useEffect } from 'react';
import type { RenderData } from '../types';
import { fetchRenderData } from '../utils/api';

// ============================================
// COMPONENTE: RealTimeIndicator
// DOMINIO: Productora Audiovisual
// Muestra el progreso de renderizado en tiempo real
// ============================================

const POLLING_INTERVAL = 5000; // 5 segundos

export const RealTimeIndicator: React.FC = () => {
  const [data, setData] = useState<RenderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // useEffect con setInterval para polling
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsUpdating(true);
        const newData = await fetchRenderData();
        setData(newData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading render data:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    // Llamada inicial
    loadData();

    // Configurar polling
    const intervalId = setInterval(() => {
      loadData();
    }, POLLING_INTERVAL);

    // Cleanup: limpiar interval al desmontar
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Renderizado: Loading inicial
  if (loading) {
    return (
      <div className="realtime-indicator">
        <h2>🎬 Cargando datos de render...</h2>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="realtime-indicator">
      <div className="realtime-header">
        <h2>🎥 Progreso de Render</h2>
        {isUpdating && (
          <span className="updating-badge">⏳ Actualizando...</span>
        )}
      </div>

      <div className="realtime-content">
        {/* Progreso principal */}
        <div className="realtime-value">
          {data.progreso}%
        </div>
        
        <div className="realtime-label">
          Completado
        </div>

        {/* Barra de progreso visual */}
        <div className="render-progress-bar">
          <div 
            className="render-progress-fill" 
            style={{ width: `${data.progreso}%` }}
          />
        </div>

        {/* Detalles adicionales */}
        <div className="render-details">
          <div className="detail-item">
            <span className="detail-label">🎞️ Frames restantes:</span>
            <span className="detail-value">{data.framesRestantes.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">⏱️ Tiempo estimado:</span>
            <span className="detail-value">{data.tiempoEstimado}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">🖥️ Nodos activos:</span>
            <span className="detail-value">{data.nodosActivos}</span>
          </div>
        </div>

        {/* Timestamp */}
        <div className="realtime-timestamp">
          🕐 Última actualización: {data.ultimaActualizacion}
        </div>

        {/* Próxima actualización */}
        <div className="next-update">
          🔄 Próxima actualización en {POLLING_INTERVAL / 1000} segundos
        </div>
      </div>
    </div>
  );
};