// ============================================
// Componente: Button
// DOMINIO: Productora Audiovisual
// Botón reutilizable con soporte de tema
// ============================================

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  fullWidth?: boolean;
}

/**
 * Botón reutilizable con variantes y soporte de tema
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  icon,
  fullWidth = false,
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = (): string => {
    if (disabled) {
      return theme.mode === 'dark' ? '#3d3d5c' : '#e0e0e0';
    }
    
    switch (variant) {
      case 'primary': return '#6c5ce7';
      case 'secondary': return theme.mode === 'dark' ? '#2d2d44' : '#f8f9fa';
      case 'danger': return '#dc3545';
      case 'success': return '#00b894';
      case 'outline': return 'transparent';
      default: return '#6c5ce7';
    }
  };

  const getTextColor = (): string => {
    if (disabled) {
      return theme.mode === 'dark' ? '#6c6c8a' : '#999';
    }
    
    switch (variant) {
      case 'primary':
      case 'danger':
      case 'success':
        return '#ffffff';
      case 'secondary':
        return theme.mode === 'dark' ? '#e0e0e0' : '#1a1a2e';
      case 'outline':
        return theme.mode === 'dark' ? '#a29bfe' : '#6c5ce7';
      default:
        return '#ffffff';
    }
  };

  const getBorderColor = (): string => {
    if (variant === 'outline') {
      return theme.mode === 'dark' ? '#a29bfe' : '#6c5ce7';
    }
    return 'transparent';
  };

  const getPadding = (): string => {
    switch (size) {
      case 'small': return '0.4rem 0.8rem';
      case 'large': return '0.8rem 1.5rem';
      default: return '0.6rem 1.2rem';
    }
  };

  const getFontSize = (): string => {
    switch (size) {
      case 'small': return '0.8rem';
      case 'large': return '1.1rem';
      default: return '0.9rem';
    }
  };

  const buttonStyles: React.CSSProperties = {
    padding: getPadding(),
    backgroundColor: getBackgroundColor(),
    color: getTextColor(),
    border: variant === 'outline' ? `1.5px solid ${getBorderColor()}` : 'none',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: getFontSize(),
    fontWeight: 500,
    transition: 'all 0.2s',
    opacity: disabled ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon ? '0.5rem' : '0',
    width: fullWidth ? '100%' : 'auto',
    boxShadow: variant === 'primary' && !disabled 
      ? '0 2px 8px rgba(108, 92, 231, 0.3)' 
      : 'none',
  };

  return (
    <button
      type={type}
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};