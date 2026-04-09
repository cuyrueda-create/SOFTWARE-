// ============================================
// Componente: Card
// DOMINIO: Productora Audiovisual
// Contenedor base para widgets del dashboard
// ============================================

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface CardProps {
  title: string;
  children: React.ReactNode;
  onRefresh?: () => void;
  loading?: boolean;
  icon?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  actions?: React.ReactNode;
}

/**
 * Componente Card base para widgets del dashboard de producción
 */
export const Card: React.FC<CardProps> = ({
  title,
  children,
  onRefresh,
  loading = false,
  icon,
  variant = 'default',
  actions,
}) => {
  const { theme } = useTheme();
  const isDark = theme.mode === 'dark';

  const getBackgroundColor = (): string => {
    return isDark ? '#1e1e2f' : '#ffffff';
  };

  const getBorderColor = (): string => {
    return isDark ? '#2d2d44' : '#e9ecef';
  };

  const getBoxShadow = (): string => {
    if (variant === 'elevated') {
      return isDark 
        ? '0 4px 12px rgba(0,0,0,0.3)' 
        : '0 4px 12px rgba(0,0,0,0.08)';
    }
    return 'none';
  };

  const cardStyles: React.CSSProperties = {
    backgroundColor: getBackgroundColor(),
    borderRadius: '12px',
    padding: '1.5rem',
    border: variant === 'outlined' ? `1.5px solid ${getBorderColor()}` : 'none',
    boxShadow: getBoxShadow(),
    transition: 'all 0.2s',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
  };

  const titleContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const iconStyles: React.CSSProperties = {
    fontSize: '1.2rem',
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: 600,
    color: isDark ? '#e0e0e0' : '#1a1a2e',
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const refreshButtonStyles: React.CSSProperties = {
    padding: '0.35rem 0.75rem',
    backgroundColor: 'transparent',
    border: `1px solid ${getBorderColor()}`,
    borderRadius: '6px',
    color: isDark ? '#a29bfe' : '#6c5ce7',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.5 : 1,
    fontSize: '0.8rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    transition: 'all 0.2s',
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
  };

  return (
    <div style={cardStyles}>
      <header style={headerStyles}>
        <div style={titleContainerStyles}>
          {icon && <span style={iconStyles}>{icon}</span>}
          <h3 style={titleStyles}>{title}</h3>
        </div>
        <div style={actionsStyles}>
          {actions}
          {onRefresh && (
            <button
              style={refreshButtonStyles}
              onClick={onRefresh}
              disabled={loading}
              title="Actualizar datos"
            >
              {loading ? '⏳' : '🔄'} {loading ? 'Cargando' : ''}
            </button>
          )}
        </div>
      </header>
      <div style={contentStyles}>
        {children}
      </div>
    </div>
  );
};