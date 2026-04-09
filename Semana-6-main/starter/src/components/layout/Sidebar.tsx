// ============================================
// Componente: Sidebar
// DOMINIO: Productora Audiovisual
// Barra lateral colapsable con navegación
// ============================================

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

/**
 * Sidebar del dashboard de producción
 */
export const Sidebar: React.FC<SidebarProps> = ({
  collapsed: controlledCollapsed,
  onToggle,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const { theme } = useTheme();
  
  const collapsed = controlledCollapsed ?? internalCollapsed;
  
  const handleToggle = () => {
    setInternalCollapsed(!collapsed);
    onToggle?.();
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
    { id: 'projects', label: 'Proyectos', icon: '🎬', path: '/projects', badge: 6 },
    { id: 'calendar', label: 'Calendario', icon: '📅', path: '/calendar' },
    { id: 'renders', label: 'Renders', icon: '🎥', path: '/renders', badge: 2 },
    { id: 'team', label: 'Equipo', icon: '👥', path: '/team' },
    { id: 'clients', label: 'Clientes', icon: '🏢', path: '/clients' },
    { id: 'analytics', label: 'Analíticas', icon: '📈', path: '/analytics' },
    { id: 'settings', label: 'Configuración', icon: '⚙️', path: '/settings' },
  ];

  const sidebarStyles: React.CSSProperties = {
    width: collapsed ? '70px' : '260px',
    height: '100%',
    background: theme.mode === 'dark' 
      ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
    borderRight: `1px solid ${theme.mode === 'dark' ? '#2d2d44' : '#e9ecef'}`,
    transition: 'width 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const headerStyles: React.CSSProperties = {
    padding: collapsed ? '1rem 0.5rem' : '1.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'space-between',
    borderBottom: `1px solid ${theme.mode === 'dark' ? '#2d2d44' : '#e9ecef'}`,
  };

  const logoStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const logoIconStyles: React.CSSProperties = {
    fontSize: '1.8rem',
  };

  const logoTextStyles: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: theme.mode === 'dark' ? '#e0e0e0' : '#1a1a2e',
    whiteSpace: 'nowrap',
  };

  const toggleButtonStyles: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    background: 'transparent',
    border: 'none',
    color: theme.mode === 'dark' ? '#8a8aa3' : '#6c757d',
    cursor: 'pointer',
    fontSize: '1.2rem',
  };

  const navStyles: React.CSSProperties = {
    flex: 1,
    padding: collapsed ? '1rem 0.5rem' : '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  };

  const footerStyles: React.CSSProperties = {
    padding: collapsed ? '1rem 0.5rem' : '1rem',
    borderTop: `1px solid ${theme.mode === 'dark' ? '#2d2d44' : '#e9ecef'}`,
  };

  const userStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? '0' : '0.5rem',
    justifyContent: collapsed ? 'center' : 'flex-start',
  };

  const avatarStyles: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: 600,
  };

  const getNavItemStyles = (): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? '0' : '0.75rem',
    padding: collapsed ? '0.75rem' : '0.75rem 1rem',
    borderRadius: '8px',
    color: theme.mode === 'dark' ? '#b0b0b0' : '#555',
    cursor: 'pointer',
    transition: 'all 0.2s',
    justifyContent: collapsed ? 'center' : 'flex-start',
    textDecoration: 'none',
    fontSize: '0.95rem',
  });

  const iconStyles: React.CSSProperties = {
    fontSize: '1.2rem',
  };

  const labelStyles: React.CSSProperties = {
    flex: 1,
    whiteSpace: 'nowrap',
  };

  const badgeStyles: React.CSSProperties = {
    padding: '0.15rem 0.5rem',
    background: '#6c5ce7',
    color: 'white',
    borderRadius: '12px',
    fontSize: '0.7rem',
    fontWeight: 600,
  };

  return (
    <aside style={sidebarStyles}>
      {/* Header con logo */}
      <div style={headerStyles}>
        <div style={logoStyles}>
          <span style={logoIconStyles}>🎬</span>
          {!collapsed && <span style={logoTextStyles}>Producción</span>}
        </div>
        {!collapsed && (
          <button style={toggleButtonStyles} onClick={handleToggle}>
            ◀
          </button>
        )}
      </div>

      {/* Navegación */}
      <nav style={navStyles}>
        {navItems.map((item) => (
          <div
            key={item.id}
            style={getNavItemStyles()}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.mode === 'dark' 
                ? 'rgba(108, 92, 231, 0.15)' 
                : 'rgba(108, 92, 231, 0.08)';
              e.currentTarget.style.color = theme.mode === 'dark' ? '#e0e0e0' : '#1a1a2e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = theme.mode === 'dark' ? '#b0b0b0' : '#555';
            }}
          >
            <span style={iconStyles}>{item.icon}</span>
            {!collapsed && (
              <>
                <span style={labelStyles}>{item.label}</span>
                {item.badge && (
                  <span style={badgeStyles}>{item.badge}</span>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Footer con usuario */}
      <div style={footerStyles}>
        <div style={userStyles}>
          <div style={avatarStyles}>CU</div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 500, color: theme.mode === 'dark' ? '#e0e0e0' : '#1a1a2e' }}>
                Cuyrueda
              </div>
              <div style={{ fontSize: '0.7rem', color: theme.mode === 'dark' ? '#8a8aa3' : '#6c757d' }}>
                Productor
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};