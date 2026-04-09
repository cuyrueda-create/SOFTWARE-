// ============================================
// Componente: Header
// DOMINIO: Productora Audiovisual
// Encabezado del dashboard
// ============================================

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onToggleSidebar?: () => void;
}

/**
 * Header del dashboard de producción audiovisual
 */
export const Header: React.FC<HeaderProps> = ({
  title = '🎬 Panel de Producción',
  subtitle = 'Dashboard de Proyectos Audiovisuales',
  onToggleSidebar,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const headerStyles: React.CSSProperties = {
    padding: '1rem 1.5rem',
    background: theme.mode === 'dark' 
      ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
    borderBottom: `1px solid ${theme.mode === 'dark' ? '#2d2d44' : '#e9ecef'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: theme.mode === 'dark' 
      ? '0 2px 8px rgba(0,0,0,0.3)'
      : '0 2px 8px rgba(0,0,0,0.05)',
  };

  const leftStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 600,
    background: theme.mode === 'dark'
      ? 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)'
      : 'linear-gradient(135deg, #1a1a2e 0%, #6c5ce7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const subtitleStyles: React.CSSProperties = {
    margin: '4px 0 0 0',
    fontSize: '0.85rem',
    color: theme.mode === 'dark' ? '#8a8aa3' : '#6c757d',
  };

  const controlsStyles: React.CSSProperties = {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  };

  const buttonStyles: React.CSSProperties = {
    padding: '0.5rem 0.75rem',
    backgroundColor: theme.mode === 'dark' ? '#2d2d44' : '#f8f9fa',
    border: `1px solid ${theme.mode === 'dark' ? '#3d3d5c' : '#e0e0e0'}`,
    borderRadius: '8px',
    color: theme.mode === 'dark' ? '#e0e0e0' : '#1a1a2e',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    width: '40px',
    height: '40px',
  };

  const themeIconStyles: React.CSSProperties = {
    ...buttonStyles,
    fontSize: '1.1rem',
  };

  const badgeStyles: React.CSSProperties = {
    padding: '0.4rem 1rem',
    backgroundColor: theme.mode === 'dark' ? 'rgba(108, 92, 231, 0.2)' : '#6c5ce7',
    color: theme.mode === 'dark' ? '#a29bfe' : 'white',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 500,
    marginLeft: '0.5rem',
  };

  return (
    <header style={headerStyles}>
      <div style={leftStyles}>
        {onToggleSidebar && (
          <button
            style={buttonStyles}
            onClick={onToggleSidebar}
            title="Toggle Sidebar"
          >
            ☰
          </button>
        )}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🎬</span>
            <h1 style={titleStyles}>{title}</h1>
            <span style={badgeStyles}>PRO</span>
          </div>
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
      </div>

      <div style={controlsStyles}>
        {/* Botón de toggle tema */}
        <button
          style={themeIconStyles}
          onClick={toggleTheme}
          title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        
        {/* Botón de notificaciones (placeholder) */}
        <button
          style={buttonStyles}
          title="Notificaciones"
        >
          🔔
        </button>
        
        {/* Botón de usuario (placeholder) */}
        <button
          style={buttonStyles}
          title="Perfil"
        >
          👤
        </button>
      </div>
    </header>
  );
};