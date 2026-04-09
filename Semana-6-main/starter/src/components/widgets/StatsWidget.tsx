// ============================================
// Widget: StatsWidget
// DOMINIO: Productora Audiovisual
// Muestra estadísticas generales de producción
// ============================================

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

interface StatsData {
  proyectosActivos: number;
  horasRenderizadas: number;
  presupuestoTotal: number;
  equiposEnRodaje: number;
  proyectosCompletados: number;
}

interface StatsWidgetProps {
  title?: string;
}

const MOCK_STATS: StatsData = {
  proyectosActivos: 8,
  horasRenderizadas: 15680,
  presupuestoTotal: 4250000,
  equiposEnRodaje: 4,
  proyectosCompletados: 23,
};

export const StatsWidget: React.FC<StatsWidgetProps> = ({ 
  title = '📊 KPIs de Producción' 
}) => {
  const { theme } = useTheme();
  const isDark = theme.mode === 'dark';
  
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      setStats(MOCK_STATS);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const formatoPresupuesto = (valor: number): string => {
    if (valor >= 1000000) {
      return `$${(valor / 1000000).toFixed(1)}M`;
    }
    return `$${valor.toLocaleString()}`;
  };

  if (loading) {
    return (
      <Card title={title} icon="📊">
        <Spinner message="Cargando estadísticas..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title={title} icon="📊">
        <div style={{ color: '#dc3545', textAlign: 'center', padding: '1rem' }}>
          <p>⚠️ {error}</p>
          <Button onClick={loadStats} size="small">Reintentar</Button>
        </div>
      </Card>
    );
  }

  const statItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 0',
    borderBottom: `1px solid ${isDark ? '#2d2d44' : '#e9ecef'}`,
  };

  const statLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: isDark ? '#b0b0b0' : '#6c757d',
    fontSize: '0.9rem',
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: isDark ? '#a29bfe' : '#6c5ce7',
  };

  return (
    <Card title={title} icon="📊" onRefresh={loadStats}>
      <div>
        <div style={statItemStyle}>
          <span style={statLabelStyle}>
            <span>🎬</span> Proyectos Activos
          </span>
          <span style={statValueStyle}>{stats?.proyectosActivos}</span>
        </div>
        
        <div style={statItemStyle}>
          <span style={statLabelStyle}>
            <span>⏱️</span> Horas Render
          </span>
          <span style={statValueStyle}>{stats?.horasRenderizadas.toLocaleString()}</span>
        </div>
        
        <div style={statItemStyle}>
          <span style={statLabelStyle}>
            <span>💰</span> Presupuesto Total
          </span>
          <span style={statValueStyle}>{formatoPresupuesto(stats?.presupuestoTotal || 0)}</span>
        </div>
        
        <div style={statItemStyle}>
          <span style={statLabelStyle}>
            <span>🎥</span> Equipos en Rodaje
          </span>
          <span style={statValueStyle}>{stats?.equiposEnRodaje}</span>
        </div>
        
        <div style={{ ...statItemStyle, borderBottom: 'none' }}>
          <span style={statLabelStyle}>
            <span>✅</span> Proyectos Completados
          </span>
          <span style={{
            ...statValueStyle,
            color: isDark ? '#55efc4' : '#00b894',
          }}>
            {stats?.proyectosCompletados}
          </span>
        </div>
      </div>
    </Card>
  );
};