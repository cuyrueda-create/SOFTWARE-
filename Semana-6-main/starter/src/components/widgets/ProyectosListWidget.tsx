// ============================================
// Widget: ProyectosListWidget
// DOMINIO: Productora Audiovisual
// ============================================

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

interface Proyecto {
  id: string;
  titulo: string;
  cliente: string;
  tipo: string;
  estado: string;
  progreso: number;
  fechaEntrega: string;
}

interface ProyectosListWidgetProps {
  title?: string;
  limit?: number;
}

const MOCK_PROYECTOS: Proyecto[] = [
  { id: '1', titulo: 'Documental Amazonas', cliente: 'National Geographic', tipo: 'Documental', estado: 'Post-producción', progreso: 75, fechaEntrega: '2026-05-15' },
  { id: '2', titulo: 'Comercial Nike', cliente: 'Nike', tipo: 'Comercial', estado: 'Rodaje', progreso: 40, fechaEntrega: '2026-04-20' },
  { id: '3', titulo: 'Serie "El Último Testigo"', cliente: 'Netflix', tipo: 'Serie', estado: 'Colorización', progreso: 85, fechaEntrega: '2026-06-01' },
  { id: '4', titulo: 'Videoclip "Horizontes"', cliente: 'Sony Music', tipo: 'Videoclip', estado: 'Pre-producción', progreso: 15, fechaEntrega: '2026-04-30' },
  { id: '5', titulo: 'Largometraje "Sombras"', cliente: 'Warner Bros', tipo: 'Largometraje', estado: 'Rodaje', progreso: 30, fechaEntrega: '2026-08-10' },
  { id: '6', titulo: 'Comercial Coca-Cola', cliente: 'Coca-Cola', tipo: 'Comercial', estado: 'Sonido', progreso: 90, fechaEntrega: '2026-04-25' },
];

export const ProyectosListWidget: React.FC<ProyectosListWidgetProps> = ({ 
  title = '🎬 Proyectos en Curso',
  limit = 5,
}) => {
  const { theme } = useTheme();
  const isDark = theme.mode === 'dark';
  
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProyectos = async () => {
    setLoading(true);
    setError(null);
    
    // Simular carga
    setTimeout(() => {
      setProyectos(MOCK_PROYECTOS);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadProyectos();
  }, []);

  const getTipoIcon = (tipo: string): string => {
    const icons: Record<string, string> = {
      'Largometraje': '🎬',
      'Comercial': '📺',
      'Serie': '📺',
      'Videoclip': '🎵',
      'Documental': '🌿',
    };
    return icons[tipo] || '🎥';
  };

  const getEstadoColor = (estado: string): string => {
    const colors: Record<string, string> = {
      'Pre-producción': '#856404',
      'Rodaje': '#084298',
      'Post-producción': '#5e3a8c',
      'Colorización': '#842029',
      'Sonido': '#0f5132',
      'Entregado': '#055160',
    };
    return colors[estado] || '#6c757d';
  };

  if (loading) {
    return (
      <Card title={title} icon="🎬">
        <Spinner message="Cargando proyectos..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title={title} icon="🎬">
        <div style={{ color: '#dc3545', textAlign: 'center', padding: '1rem' }}>
          <p>⚠️ {error}</p>
          <Button onClick={loadProyectos} size="small">Reintentar</Button>
        </div>
      </Card>
    );
  }

  const proyectosMostrados = proyectos.slice(0, limit);

  const itemStyle: React.CSSProperties = {
    padding: '0.75rem 0',
    borderBottom: `1px solid ${isDark ? '#2d2d44' : '#e9ecef'}`,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.25rem',
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: 500,
    color: isDark ? '#e0e0e0' : '#1a1a2e',
    fontSize: '0.95rem',
  };

  const badgeStyle: React.CSSProperties = {
    padding: '0.15rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: 500,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: isDark ? '#8a8aa3' : '#6c757d',
    marginBottom: '0.5rem',
  };

  const progressBarStyle: React.CSSProperties = {
    height: '6px',
    background: isDark ? '#2d2d44' : '#e9ecef',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '0.25rem',
  };

  const progressFillStyle = (progreso: number): React.CSSProperties => ({
    height: '100%',
    width: `${progreso}%`,
    background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)',
    borderRadius: '3px',
  });

  return (
    <Card title={title} icon="🎬" onRefresh={loadProyectos}>
      <div>
        {proyectosMostrados.map((proyecto) => (
          <div key={proyecto.id} style={itemStyle}>
            <div style={headerStyle}>
              <span style={titleStyle}>
                {getTipoIcon(proyecto.tipo)} {proyecto.titulo}
              </span>
              <span style={{
                ...badgeStyle,
                background: getEstadoColor(proyecto.estado) + '20',
                color: getEstadoColor(proyecto.estado),
              }}>
                {proyecto.estado}
              </span>
            </div>
            <div style={subtitleStyle}>
              👤 {proyecto.cliente} • 📅 {proyecto.fechaEntrega}
            </div>
            <div style={progressBarStyle}>
              <div style={progressFillStyle(proyecto.progreso)} />
            </div>
            <div style={{ fontSize: '0.7rem', marginTop: '0.25rem', color: isDark ? '#8a8aa3' : '#6c757d', textAlign: 'right' }}>
              {proyecto.progreso}%
            </div>
          </div>
        ))}
      </div>
      {proyectos.length > limit && (
        <div style={{ marginTop: '1rem' }}>
          <Button variant="outline" size="small" fullWidth>
            Ver todos ({proyectos.length})
          </Button>
        </div>
      )}
    </Card>
  );
};