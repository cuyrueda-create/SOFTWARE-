// ============================================
// App.tsx - Dashboard Principal
// DOMINIO: Productora Audiovisual
// Integración final de todos los componentes
// ============================================

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { StatsWidget } from './components/widgets/StatsWidget';
import { ProyectosListWidget } from './components/widgets/ProyectosListWidget';
import { RenderProgressWidget } from './components/widgets/RenderProgressWidget';
import { useTheme } from './context/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';

// ============================================
// LAYOUT PRINCIPAL
// ============================================

const DashboardLayout: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme.mode === 'dark';
  
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage<boolean>(
    'sidebar-collapsed',
    false
  );

  const layoutStyles: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
  };

  const mainStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    backgroundColor: theme.colors.background,
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '1.5rem',
    maxWidth: '1600px',
    margin: '0 auto',
  };

  const widgetStyle1: React.CSSProperties = {
    gridColumn: 'span 4',
  };

  const widgetStyle2: React.CSSProperties = {
    gridColumn: 'span 5',
  };

  const widgetStyle3: React.CSSProperties = {
    gridColumn: 'span 3',
  };

  // Responsive
  if (typeof window !== 'undefined' && window.innerWidth < 1200) {
    widgetStyle1.gridColumn = 'span 6';
    widgetStyle2.gridColumn = 'span 6';
    widgetStyle3.gridColumn = 'span 12';
  }

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    widgetStyle1.gridColumn = 'span 12';
    widgetStyle2.gridColumn = 'span 12';
  }

  return (
    <div style={layoutStyles}>
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div style={mainStyles}>
        <Header
          title="🎬 Panel de Producción Audiovisual"
          subtitle="Dashboard de Proyectos en Tiempo Real"
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main style={contentStyles}>
          <div style={gridStyles}>
            <div style={widgetStyle1}>
              <StatsWidget title="📊 KPIs de Producción" />
            </div>
            
            <div style={widgetStyle3}>
              <RenderProgressWidget title="🎥 Monitor de Render" />
            </div>
            
            <div style={widgetStyle2}>
              <ProyectosListWidget title="🎬 Proyectos en Curso" limit={6} />
            </div>
          </div>
          
          {/* Footer sutil */}
          <footer style={{
            marginTop: '2rem',
            textAlign: 'center',
            color: isDark ? '#6c6c8a' : '#adb5bd',
            fontSize: '0.8rem',
          }}>
            <p>🎥 Productora Audiovisual • Panel de Control v1.0 • {new Date().getFullYear()}</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

// ============================================
// APP PRINCIPAL
// ============================================

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DashboardLayout />
    </ThemeProvider>
  );
};

export default App;