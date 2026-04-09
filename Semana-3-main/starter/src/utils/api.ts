// ============================================
// FUNCIONES DE API - PRODUCTORA AUDIOVISUAL
// ============================================

import type { Proyecto, Stats, RenderData } from '../types';

// ============================================
// CONFIGURACIÓN
// ============================================

// Helper para simular latencia de red
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// DATOS MOCK - PROYECTOS AUDIOVISUALES
// ============================================

const MOCK_PROYECTOS: Proyecto[] = [
  {
    id: '1',
    titulo: 'Documental Amazonas',
    cliente: 'National Geographic',
    tipo: 'Documental',
    estado: 'Post-producción',
    fechaEntrega: '2026-05-15',
    progreso: 75
  },
  {
    id: '2',
    titulo: 'Comercial Nike - Verano 2026',
    cliente: 'Nike',
    tipo: 'Comercial',
    estado: 'Rodaje',
    fechaEntrega: '2026-04-20',
    progreso: 40
  },
  {
    id: '3',
    titulo: 'Serie "El Último Testigo"',
    cliente: 'Netflix',
    tipo: 'Serie',
    estado: 'Colorización',
    fechaEntrega: '2026-06-01',
    progreso: 85
  },
  {
    id: '4',
    titulo: 'Videoclip "Horizontes"',
    cliente: 'Sony Music',
    tipo: 'Videoclip',
    estado: 'Pre-producción',
    fechaEntrega: '2026-04-30',
    progreso: 15
  },
  {
    id: '5',
    titulo: 'Largometraje "Sombras del Ayer"',
    cliente: 'Warner Bros',
    tipo: 'Largometraje',
    estado: 'Rodaje',
    fechaEntrega: '2026-08-10',
    progreso: 30
  },
  {
    id: '6',
    titulo: 'Comercial Coca-Cola - Mundial',
    cliente: 'Coca-Cola',
    tipo: 'Comercial',
    estado: 'Sonido',
    fechaEntrega: '2026-04-25',
    progreso: 90
  }
];

// ============================================
// FUNCIONES DE FETCH
// ============================================

/**
 * Obtiene la lista de proyectos audiovisuales
 */
export const fetchProyectos = async (signal?: AbortSignal): Promise<Proyecto[]> => {
  await delay(1500);
  
  // Simular cancelación
  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }
  
  // Simular error aleatorio (10% probabilidad)
  if (Math.random() < 0.1) {
    throw new Error('Error de conexión con el servidor de proyectos');
  }
  
  return MOCK_PROYECTOS;
};

/**
 * Obtiene estadísticas de producción
 */
export const fetchStats = async (): Promise<Stats> => {
  await delay(800);
  
  return {
    proyectosActivos: MOCK_PROYECTOS.filter(p => p.estado !== 'Entregado').length,
    horasRenderizadas: 12450,
    presupuestoUtilizado: 2450000,
    equiposEnRodaje: 3
  };
};

/**
 * Obtiene datos de render en tiempo real
 */
export const fetchRenderData = async (): Promise<RenderData> => {
  await delay(300);
  
  // Simular progreso variable
  const progresoBase = 65;
  const variacion = Math.floor(Math.random() * 15) - 5;
  const progreso = Math.min(100, Math.max(0, progresoBase + variacion));
  
  const framesRestantes = Math.floor((100 - progreso) * 240);
  const minutosRestantes = Math.floor(framesRestantes / 60);
  const segundosRestantes = framesRestantes % 60;
  
  return {
    progreso,
    framesRestantes,
    tiempoEstimado: `${minutosRestantes}m ${segundosRestantes}s`,
    nodosActivos: Math.floor(Math.random() * 4) + 2,
    ultimaActualizacion: new Date().toLocaleTimeString('es-CO')
  };
};

// ============================================
// ALIAS PARA COMPATIBILIDAD CON CÓDIGO BASE
// ============================================

export const fetchItems = fetchProyectos;
export const fetchRealTimeData = fetchRenderData;