// ============================================
// PROYECTO SEMANA 05: Sistema de Configuración UI
// DOMINIO: Productora Audiovisual
// Archivo: components/SettingsPanel/SettingsPanel.tsx
// ============================================

import React from 'react';
import { useConfig } from '../../contexts/ConfigContext';
import { Card } from '../Card/Card';
import { Form } from '../Form/Form';

// ============================================
// THEME SELECTOR
// ============================================
const ThemeSelector: React.FC = () => {
  const { config, setTheme } = useConfig();

  const themeOptions = [
    { value: 'light', label: '☀️ Claro', description: 'Modo claro para ambientes bien iluminados' },
    { value: 'dark', label: '🌙 Oscuro', description: 'Modo oscuro para edición nocturna' },
    { value: 'system', label: '🖥️ Sistema', description: 'Seguir preferencia del sistema' },
  ];

  return (
    <Card variant="outlined">
      <Card.Header>
        <Card.Title>🎨 Tema de Edición</Card.Title>
        <Card.Actions>
          <Card.Badge variant={config.theme === 'dark' ? 'info' : 'default'}>
            {config.theme === 'dark' ? 'Noche' : config.theme === 'light' ? 'Día' : 'Auto'}
          </Card.Badge>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <div className="theme-selector">
          {themeOptions.map((option) => (
            <label
              key={option.value}
              className={`theme-option ${config.theme === option.value ? 'active' : ''}`}
            >
              <input
                type="radio"
                name="theme"
                value={option.value}
                checked={config.theme === option.value}
                onChange={() => setTheme(option.value as 'light' | 'dark' | 'system')}
              />
              <span className="theme-option-content">
                <span className="theme-option-label">{option.label}</span>
                <span className="theme-option-description">{option.description}</span>
              </span>
            </label>
          ))}
        </div>
        
        {/* Preview visual */}
        <div className={`theme-preview theme-preview-${config.theme}`}>
          <div className="preview-card">
            <div className="preview-header">🎬 Preview</div>
            <div className="preview-body">
              <div className="preview-text">Proyecto: Documental Amazonas</div>
              <div className="preview-badge">Post-producción</div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

// ============================================
// FONT SIZE SELECTOR
// ============================================

const FontSizeSelector: React.FC = () => {
  const { config, setFontSize } = useConfig();

  const fontSizeOptions = [
    { value: 'small', label: 'A', description: 'Compacto', preview: '14px' },
    { value: 'medium', label: 'A', description: 'Normal', preview: '16px' },
    { value: 'large', label: 'A', description: 'Grande', preview: '18px' },
  ];

  return (
    <Card variant="outlined">
      <Card.Header>
        <Card.Title>🔤 Tamaño de Texto</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="font-size-selector">
          <div className="font-size-buttons">
            {fontSizeOptions.map((option) => (
              <button
                key={option.value}
                className={`font-size-btn ${config.fontSize === option.value ? 'active' : ''}`}
                onClick={() => setFontSize(option.value as 'small' | 'medium' | 'large')}
                style={{ fontSize: option.preview }}
              >
                {option.label}
                <span className="font-size-label">{option.description}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Preview de texto */}
        <div className="font-preview" style={{ fontSize: config.fontSize === 'small' ? '14px' : config.fontSize === 'large' ? '18px' : '16px' }}>
          <p className="preview-title">Título del Proyecto</p>
          <p className="preview-body-text">Cliente: National Geographic | Progreso: 75%</p>
          <p className="preview-small-text">Fecha de entrega: 15 Mayo 2026</p>
        </div>
      </Card.Body>
    </Card>
  );
};

// ============================================
// DENSITY SELECTOR
// ============================================

const DensitySelector: React.FC = () => {
  const { config, setDensity } = useConfig();

  const densityOptions = [
    { 
      value: 'compact', 
      label: 'Compacto', 
      icon: '⬛',
      description: 'Más información en menos espacio' 
    },
    { 
      value: 'normal', 
      label: 'Normal', 
      icon: '◼️',
      description: 'Equilibrio entre espacio y contenido' 
    },
    { 
      value: 'spacious', 
      label: 'Espacioso', 
      icon: '⬜',
      description: 'Más espacio para respirar' 
    },
  ];

  return (
    <Card variant="outlined">
      <Card.Header>
        <Card.Title>📐 Densidad de Contenido</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="density-selector">
          {densityOptions.map((option) => (
            <button
              key={option.value}
              className={`density-option ${config.density === option.value ? 'active' : ''}`}
              onClick={() => setDensity(option.value as 'compact' | 'normal' | 'spacious')}
            >
              <span className="density-icon">{option.icon}</span>
              <div className="density-content">
                <span className="density-label">{option.label}</span>
                <span className="density-description">{option.description}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Preview de densidad */}
        <div className={`density-preview density-${config.density}`}>
          <div className="preview-item">🎬 Proyecto 1</div>
          <div className="preview-item">🎥 Proyecto 2</div>
          <div className="preview-item">📺 Proyecto 3</div>
        </div>
      </Card.Body>
    </Card>
  );
};

// ============================================
// NOTIFICATION SETTINGS
// ============================================

const NotificationSettings: React.FC = () => {
  const { config, setNotification } = useConfig();

  const notificationOptions = [
    { 
      key: 'email' as const, 
      label: '📧 Notificaciones por Email', 
      description: 'Alertas de render completado y fechas límite' 
    },
    { 
      key: 'push' as const, 
      label: '🔔 Notificaciones Push', 
      description: 'Notificaciones en tiempo real en el navegador' 
    },
    { 
      key: 'sound' as const, 
      label: '🔊 Alertas Sonoras', 
      description: 'Sonido cuando un proyecto cambia de estado' 
    },
  ];

  return (
    <Card variant="outlined">
      <Card.Header>
        <Card.Title>🔔 Notificaciones de Producción</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="notification-settings">
          {notificationOptions.map((option) => (
            <label key={option.key} className="notification-option">
              <div className="notification-info">
                <span className="notification-label">{option.label}</span>
                <span className="notification-description">{option.description}</span>
              </div>
              <div className="notification-toggle">
                <input
                  type="checkbox"
                  checked={config.notifications[option.key]}
                  onChange={(e) => setNotification(option.key, e.target.checked)}
                />
                <span className="toggle-slider" />
              </div>
            </label>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

// ============================================
// RESET BUTTON
// ============================================

const ResetSettings: React.FC = () => {
  const { reset } = useConfig();

  const handleReset = () => {
    if (window.confirm('¿Restaurar todas las configuraciones a sus valores por defecto?')) {
      reset();
    }
  };

  return (
    <button onClick={handleReset} className="reset-settings-btn">
      🔄 Restaurar Valores por Defecto
    </button>
  );
};

// ============================================
// SETTINGS PANEL PRINCIPAL
// ============================================

export const SettingsPanel: React.FC = () => {
  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2>⚙️ Configuración del Panel</h2>
        <p className="settings-description">
          Personaliza la apariencia y comportamiento del panel de producción
        </p>
      </div>
      
      <div className="settings-grid">
        <ThemeSelector />
        <FontSizeSelector />
        <DensitySelector />
        <NotificationSettings />
      </div>
      
      <div className="settings-footer">
        <ResetSettings />
      </div>
    </div>
  );
};