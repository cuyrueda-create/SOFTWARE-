// ============================================
// PROYECTO SEMANA 05: Sistema de Configuración UI
// DOMINIO: Productora Audiovisual
// Archivo: App.tsx
// ============================================

import React from 'react';
import { ConfigProvider } from './contexts/ConfigContext';
import { Layout } from './components/Layout/Layout';
import { SettingsPanel } from './components/SettingsPanel/SettingsPanel';
import { Card } from './components/Card/Card';

// ============================================
// DATOS DE EJEMPLO - PROYECTOS AUDIOVISUALES
// ============================================

const proyectosDestacados = [
  {
    id: '1',
    titulo: 'Documental Amazonas',
    cliente: 'National Geographic',
    tipo: 'Documental',
    estado: 'Post-producción',
    progreso: 75,
    fechaEntrega: '2026-05-15',
  },
  {
    id: '2',
    titulo: 'Comercial Nike - Verano 2026',
    cliente: 'Nike',
    tipo: 'Comercial',
    estado: 'Rodaje',
    progreso: 40,
    fechaEntrega: '2026-04-20',
  },
  {
    id: '3',
    titulo: 'Serie "El Último Testigo"',
    cliente: 'Netflix',
    tipo: 'Serie',
    estado: 'Colorización',
    progreso: 85,
    fechaEntrega: '2026-06-01',
  },
  {
    id: '4',
    titulo: 'Videoclip "Horizontes"',
    cliente: 'Sony Music',
    tipo: 'Videoclip',
    estado: 'Pre-producción',
    progreso: 15,
    fechaEntrega: '2026-04-30',
  },
  {
    id: '5',
    titulo: 'Largometraje "Sombras del Ayer"',
    cliente: 'Warner Bros',
    tipo: 'Largometraje',
    estado: 'Rodaje',
    progreso: 30,
    fechaEntrega: '2026-08-10',
  },
  {
    id: '6',
    titulo: 'Comercial Coca-Cola - Mundial',
    cliente: 'Coca-Cola',
    tipo: 'Comercial',
    estado: 'Sonido',
    progreso: 90,
    fechaEntrega: '2026-04-25',
  },
];

// ============================================
// TIPOS DE BADGE SEGÚN ESTADO
// ============================================

const getEstadoBadgeVariant = (estado: string): 'success' | 'warning' | 'error' | 'info' | 'default' => {
  switch (estado) {
    case 'Entregado':
      return 'success';
    case 'Rodaje':
      return 'info';
    case 'Post-producción':
    case 'Colorización':
    case 'Sonido':
      return 'warning';
    case 'Pre-producción':
      return 'default';
    default:
      return 'default';
  }
};

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

// ============================================
// CONTENIDO PRINCIPAL
// ============================================

const MainContent: React.FC = () => {
  return (
    <div className="main-content">
      <div className="content-header">
        <h1 className="content-title">🎬 Panel de Producción Audiovisual</h1>
        <p className="content-description">
          Gestiona y monitorea todos tus proyectos audiovisuales en un solo lugar.
          Esta interfaz se adapta a tus preferencias de visualización.
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="stats-grid">
        <Card variant="elevated">
          <Card.Body>
            <div className="stat-card">
              <span className="stat-icon">📊</span>
              <span className="stat-value">{proyectosDestacados.length}</span>
              <span className="stat-label">Proyectos Activos</span>
            </div>
          </Card.Body>
        </Card>
        
        <Card variant="elevated">
          <Card.Body>
            <div className="stat-card">
              <span className="stat-icon">🎥</span>
              <span className="stat-value">
                {proyectosDestacados.filter(p => p.estado === 'Rodaje').length}
              </span>
              <span className="stat-label">En Rodaje</span>
            </div>
          </Card.Body>
        </Card>
        
        <Card variant="elevated">
          <Card.Body>
            <div className="stat-card">
              <span className="stat-icon">✂️</span>
              <span className="stat-value">
                {proyectosDestacados.filter(p => 
                  ['Post-producción', 'Colorización', 'Sonido'].includes(p.estado)
                ).length}
              </span>
              <span className="stat-label">En Post-producción</span>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Lista de proyectos */}
      <div className="projects-section">
        <h2 className="section-title">📋 Proyectos Destacados</h2>
        <div className="projects-grid">
          {proyectosDestacados.map((proyecto) => (
            <Card key={proyecto.id} variant="outlined">
              <Card.Header>
                <div className="project-header">
                  <Card.Title>
                    {getTipoIcon(proyecto.tipo)} {proyecto.titulo}
                  </Card.Title>
                  <Card.Badge variant={getEstadoBadgeVariant(proyecto.estado)}>
                    {proyecto.estado}
                  </Card.Badge>
                </div>
              </Card.Header>
              
              <Card.Body>
                <div className="project-details">
                  <p className="project-client">
                    <strong>👤 Cliente:</strong> {proyecto.cliente}
                  </p>
                  <p className="project-type">
                    <strong>🎬 Tipo:</strong> {proyecto.tipo}
                  </p>
                  
                  {/* Barra de progreso */}
                  <div className="progress-container">
                    <div className="progress-label">
                      <span>Progreso</span>
                      <span>{proyecto.progreso}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${proyecto.progreso}%` }}
                      />
                    </div>
                  </div>
                  
                  <p className="project-date">
                    <strong>📅 Entrega:</strong> {proyecto.fechaEntrega}
                  </p>
                </div>
              </Card.Body>
              
              <Card.Footer>
                <Card.Actions>
                  <button className="btn-view">👁️ Ver detalles</button>
                  <button className="btn-edit">✏️ Editar</button>
                </Card.Actions>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>

      {/* Sección informativa */}
      <Card variant="default" className="info-card">
        <Card.Header>
          <Card.Title>💡 Acerca de este Panel</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            Este panel de control utiliza <strong>Context API</strong> y <strong>Compound Components</strong> para
            ofrecer una experiencia de usuario configurable. Puedes ajustar el tema, tamaño de texto,
            densidad de contenido y preferencias de notificaciones desde el panel lateral.
          </p>
          <p style={{ marginTop: '12px' }}>
            Todos los cambios se guardan automáticamente en tu navegador y se aplican instantáneamente.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

// ============================================
// APLICACIÓN PRINCIPAL
// ============================================

export const App: React.FC = () => {
  return (
    <ConfigProvider>
      <Layout sidebar={<SettingsPanel />}>
        <MainContent />
      </Layout>
    </ConfigProvider>
  );
};

export default App;