// ============================================
// TIPOS Y INTERFACES - PRODUCTORA AUDIOVISUAL
// ============================================

/**
 * Interfaz para proyectos audiovisuales
 */
export interface Proyecto {
  id: string;
  titulo: string;
  cliente: string;
  tipo: 'Largometraje' | 'Comercial' | 'Serie' | 'Videoclip' | 'Documental';
  estado: 'Pre-producción' | 'Rodaje' | 'Post-producción' | 'Colorización' | 'Sonido' | 'Entregado';
  fechaEntrega: string;
  progreso: number;
}

/**
 * Interfaz para estadísticas del dashboard
 */
export interface Stats {
  proyectosActivos: number;
  horasRenderizadas: number;
  presupuestoUtilizado: number;
  equiposEnRodaje: number;
}

/**
 * Interfaz para datos de render en tiempo real
 */
export interface RenderData {
  progreso: number;
  framesRestantes: number;
  tiempoEstimado: string;
  nodosActivos: number;
  ultimaActualizacion: string;
}

/**
 * Estado genérico para manejar peticiones asíncronas
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Para compatibilidad con código base (si se usa Item/RealTimeData)
export type Item = Proyecto;
export type RealTimeData = RenderData;