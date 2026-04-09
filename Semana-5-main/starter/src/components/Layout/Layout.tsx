// ============================================
// PROYECTO SEMANA 05: Sistema de Configuración UI
// DOMINIO: Productora Audiovisual
// Archivo: components/Layout/Layout.tsx
// ============================================

import React, { type ReactNode } from 'react';
import { useConfig } from '../../contexts/ConfigContext';

// ============================================
// LAYOUT PROPS
// ============================================

interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

// ============================================
// LAYOUT HEADER PROPS
// ============================================

interface LayoutHeaderProps {
  children: ReactNode;
  className?: string;
}

// ============================================
// LAYOUT SIDEBAR PROPS
// ============================================

interface LayoutSidebarProps {
  children: ReactNode;
  className?: string;
  position?: 'left' | 'right';
}

// ============================================
// LAYOUT MAIN PROPS
// ============================================

interface LayoutMainProps {
  children: ReactNode;
  className?: string;
}

// ============================================
// LAYOUT FOOTER PROPS
// ============================================

interface LayoutFooterProps {
  children: ReactNode;
  className?: string;
}

// ============================================
// LAYOUT COMPONENT
// ============================================

export const Layout: React.FC<LayoutProps> = ({
  children,
  sidebar,
  header,
  footer,
  showHeader = true,
  showFooter = true,
}) => {
  const { config } = useConfig();

  // Calcular estilos basados en configuración
  const getFontSizeValue = (): string => {
    switch (config.fontSize) {
      case 'small': return '14px';
      case 'medium': return '16px';
      case 'large': return '18px';
      default: return '16px';
    }
  };

  const getSpacingValue = (): string => {
    switch (config.density) {
      case 'compact': return '12px';
      case 'normal': return '20px';
      case 'spacious': return '32px';
      default: return '20px';
    }
  };

  const getHeaderHeight = (): string => {
    switch (config.density) {
      case 'compact': return '50px';
      case 'normal': return '60px';
      case 'spacious': return '75px';
      default: return '60px';
    }
  };

  const themeClass = config.theme === 'system' ? '' : `theme-${config.theme}`;
  const densityClass = `density-${config.density}`;
  const fontSizeClass = `font-${config.fontSize}`;

  return (
    <div
      className={`layout ${themeClass} ${densityClass} ${fontSizeClass}`}
      data-theme={config.theme === 'system' ? undefined : config.theme}
      data-font-size={config.fontSize}
      data-density={config.density}
      style={{
        fontSize: getFontSizeValue(),
        '--layout-spacing': getSpacingValue(),
        '--header-height': getHeaderHeight(),
      } as React.CSSProperties}
    >
      {/* Header */}
      {showHeader && (
        <header className="layout-header" style={{ height: getHeaderHeight() }}>
          {header || <DefaultHeader />}
        </header>
      )}

      {/* Main Content Area */}
      <div className="layout-content">
        {/* Sidebar (izquierda) */}
        {sidebar && (
          <aside className="layout-sidebar layout-sidebar-left">
            {sidebar}
          </aside>
        )}

        {/* Main */}
        <main className="layout-main">
          {children}
        </main>
      </div>

      {/* Footer */}
      {showFooter && (
        <footer className="layout-footer">
          {footer || <DefaultFooter />}
        </footer>
      )}
    </div>
  );
};

// ============================================
// DEFAULT HEADER
// ============================================

const DefaultHeader: React.FC = () => {
  const { config } = useConfig();
  
  return (
    <div className="default-header">
      <div className="header-left">
        <span className="header-icon">🎬</span>
        <h1 className="header-title">Panel de Producción Audiovisual</h1>
      </div>
      <div className="header-right">
        <span className="header-badge">
          {config.theme === 'dark' ? '🌙' : config.theme === 'light' ? '☀️' : '🖥️'} 
          {config.theme === 'system' ? ' Sistema' : config.theme === 'dark' ? ' Oscuro' : ' Claro'}
        </span>
      </div>
    </div>
  );
};

// ============================================
// DEFAULT FOOTER
// ============================================

const DefaultFooter: React.FC = () => {
  return (
    <div className="default-footer">
      <p>© 2026 Productora Audiovisual - Panel de Control v1.0</p>
      <p className="footer-tagline">🎥 Creando experiencias visuales</p>
    </div>
  );
};

// ============================================
// SUBCOMPONENTES EXPORTADOS
// ============================================

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`custom-header ${className}`}>
      {children}
    </div>
  );
};

export const LayoutSidebar: React.FC<LayoutSidebarProps> = ({ 
  children, 
  className = '',
  position = 'left',
}) => {
  return (
    <aside className={`custom-sidebar sidebar-${position} ${className}`}>
      {children}
    </aside>
  );
};

export const LayoutMain: React.FC<LayoutMainProps> = ({ children, className = '' }) => {
  return (
    <main className={`custom-main ${className}`}>
      {children}
    </main>
  );
};

export const LayoutFooter: React.FC<LayoutFooterProps> = ({ children, className = '' }) => {
  return (
    <footer className={`custom-footer ${className}`}>
      {children}
    </footer>
  );
};