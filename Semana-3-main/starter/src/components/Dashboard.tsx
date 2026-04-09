import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';

// ============================================
// COMPONENTE: Dashboard (Principal)
// DOMINIO: Productora Audiovisual
// ============================================

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      {/* Header personalizado - Productora Audiovisual */}
      <header className="dashboard-header">
        <h1>🎬 Panel de Producción Audiovisual</h1>
        <span className="dashboard-subtitle">Monitoreo de Proyectos en Tiempo Real</span>
      </header>

      {/* Layout principal con componentes */}
      <main className="dashboard-main">
        {/* Sección de estadísticas */}
        <section className="dashboard-section">
          <StatsCard />
        </section>

        {/* Sección de datos en tiempo real */}
        <section className="dashboard-section">
          <RealTimeIndicator />
        </section>

        {/* Sección de lista principal */}
        <section className="dashboard-section dashboard-list">
          <ItemList />
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>🎥 Panel de Producción - Week 03 | {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};