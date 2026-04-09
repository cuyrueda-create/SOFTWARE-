import React, { useState, useEffect } from 'react';
import type { Stats } from '../types';
import { fetchStats } from '../utils/api';

// ============================================
// COMPONENTE: StatsCard
// DOMINIO: Productora Audiovisual
// Muestra estadísticas clave de producción
// ============================================

export const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect para cargar estadísticas
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // Renderizado: Loading
  if (loading) {
    return (
      <div className="stats-card">
        <h2>📊 Cargando estadísticas...</h2>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  // Formatear presupuesto en millones
  const formatoPresupuesto = (valor: number): string => {
    return `$${(valor / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="stats-card">
      <h2>📊 KPIs de Producción</h2>

      <div className="stats-grid">
        {/* Stat 1 - Proyectos Activos */}
        <div className="stat">
          <div className="stat-value">{stats.proyectosActivos}</div>
          <div className="stat-label">Proyectos Activos</div>
          <div className="stat-icon">🎬</div>
        </div>

        {/* Stat 2 - Horas Renderizadas */}
        <div className="stat">
          <div className="stat-value">{stats.horasRenderizadas.toLocaleString()}</div>
          <div className="stat-label">Horas Render</div>
          <div className="stat-icon">⏱️</div>
        </div>

        {/* Stat 3 - Presupuesto Utilizado */}
        <div className="stat">
          <div className="stat-value">{formatoPresupuesto(stats.presupuestoUtilizado)}</div>
          <div className="stat-label">Presupuesto</div>
          <div className="stat-icon">💰</div>
        </div>

        {/* Stat 4 - Equipos en Rodaje */}
        <div className="stat">
          <div className="stat-value">{stats.equiposEnRodaje}</div>
          <div className="stat-label">Equipos en Rodaje</div>
          <div className="stat-icon">🎥</div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="stats-footer">
        <p>📈 Datos actualizados al {new Date().toLocaleDateString('es-CO')}</p>
      </div>
    </div>
  );
};