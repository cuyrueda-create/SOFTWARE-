// ============================================
// Widget: RenderProgressWidget
// DOMINIO: Productora Audiovisual
// Muestra progreso de render en tiempo real
// ============================================

import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { useToggle } from '../../hooks/useToggle';

interface RenderData {
  proyecto: string;
  progreso: number;
  framesRestantes: number;
  tiempoEstimado: string;
  nodosActivos: number;
  ultimaActualizacion: string;
}

interface RenderProgressWidgetProps {
  title?: string;
}

export const RenderProgressWidget: React.FC<RenderProgressWidgetProps> = ({ 
  title = '🎥 Monitor de Render' 
}) => {
  const { theme } = useTheme();
  const isDark = theme.mode === 'dark';
  const [isPolling, togglePolling] = useToggle(true);
  
  const [data, setData] = useState<RenderData>({
    proyecto: 'Documental Amazonas',
    progreso: 67,
    framesRestantes: 7920,
    tiempoEstimado: '132m 0s',
    nodosActivos: 3,
    ultimaActualizacion: new Date().toLocaleTimeString('es-CO'),
  });

  const [loading, setLoading] = useState(false);

  const fetchRenderData = async () => {
    setLoading(true);
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const variacion = Math.floor(Math.random() * 10) - 2;
    const nuevoProgreso = Math.min(100, Math.max(0, data.progreso + variacion));
    const framesRestantes = Math.floor((100 - nuevoProgreso) * 240);
    const minutos = Math.floor(framesRestantes / 60);
    const segundos = framesRestantes % 60;
    
    setData({
      ...data,
      progreso: nuevoProgreso,
      framesRestantes,
      tiempoEstimado: `${minutos}m ${segundos}s`,
      nodosActivos: Math.floor(Math.random() * 4) + 2,
      ultimaActualizacion: new Date().toLocaleTimeString('es-CO'),
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!isPolling) return;
    
    const interval = setInterval(fetchRenderData, 5000);
    return () => clearInterval(interval);
  }, [isPolling, data.progreso]);

  const progressBarStyle: React.CSSProperties = {
    height: '12px',
    background: isDark ? '#2d2d44' : '#e9ecef',
    borderRadius: '6px',
    overflow: 'hidden',
    margin: '1rem 0',
  };

  const progressFillStyle: React.CSSProperties = {
    height: '100%',
    width: `${data.progreso}%`,
    background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)',
    borderRadius: '6px',
    transition: 'width 0.5s ease',
  };

  const statGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginTop: '1rem',
  };

  const statBoxStyle: React.CSSProperties = {
    padding: '0.75rem',
    background: isDark ? '#2d2d44' : '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'center',
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: isDark ? '#a29bfe' : '#6c5ce7',
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: isDark ? '#8a8aa3' : '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  return (
    <Card 
      title={title} 
      icon="🎥"
      actions={
        <Button 
          variant={isPolling ? 'primary' : 'outline'} 
          size="small"
          onClick={togglePolling}
        >
          {isPolling ? '⏸️ Pausar' : '▶️ Iniciar'}
        </Button>
      }
      onRefresh={fetchRenderData}
      loading={loading}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          fontSize: '3rem', 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {data.progreso}%
        </div>
        <div style={{ color: isDark ? '#b0b0b0' : '#6c757d', marginBottom: '0.5rem' }}>
          {data.proyecto}
        </div>
      </div>

      <div style={progressBarStyle}>
        <div style={progressFillStyle} />
      </div>

      <div style={statGridStyle}>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>{data.framesRestantes.toLocaleString()}</div>
          <div style={statLabelStyle}>Frames restantes</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>{data.tiempoEstimado}</div>
          <div style={statLabelStyle}>Tiempo estimado</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>{data.nodosActivos}</div>
          <div style={statLabelStyle}>Nodos activos</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statValueStyle}>{data.ultimaActualizacion}</div>
          <div style={statLabelStyle}>Última actualización</div>
        </div>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.75rem', 
        color: isDark ? '#6c6c8a' : '#adb5bd',
        textAlign: 'center',
      }}>
        {isPolling ? '🔄 Actualizando cada 5s' : '⏸️ Actualización pausada'}
      </div>
    </Card>
  );
};