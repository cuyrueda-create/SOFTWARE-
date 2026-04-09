// ============================================
// Componente: Spinner
// DOMINIO: Productora Audiovisual
// Indicador de carga animado
// ============================================

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  message?: string;
}

/**
 * Spinner animado para estados de carga
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color,
  message = 'Cargando...',
}) => {
  const { theme } = useTheme();
  const isDark = theme.mode === 'dark';

  const getSize = (): number => {
    switch (size) {
      case 'small': return 20;
      case 'large': return 48;
      default: return 32;
    }
  };

  const spinnerColor = color || (isDark ? '#a29bfe' : '#6c5ce7');
  const sizeValue = getSize();

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '1.5rem',
  };

  const spinnerStyles: React.CSSProperties = {
    width: `${sizeValue}px`,
    height: `${sizeValue}px`,
    border: `${sizeValue / 8}px solid ${isDark ? '#2d2d44' : '#e9ecef'}`,
    borderTopColor: spinnerColor,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  const messageStyles: React.CSSProperties = {
    color: isDark ? '#8a8aa3' : '#6c757d',
    fontSize: '0.9rem',
    margin: 0,
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={containerStyles}>
        <div style={spinnerStyles} />
        {message && <p style={messageStyles}>{message}</p>}
      </div>
    </>
  );
};