// ============================================
// Tipos del Proyecto
// DOMINIO: Productora Audiovisual
// ============================================

// ============================================
// ENTIDADES PRINCIPALES
// ============================================

/**
 * Proyecto audiovisual
 */
export interface Proyecto {
  id: string;
  titulo: string;
  cliente: string;
  tipo: TipoProyecto;
  estado: EstadoProyecto;
  progreso: number;
  fechaEntrega: string;
  presupuesto: number;
  fechaInicio?: string;
  descripcion?: string;
}

/**
 * Tipos de proyecto
 */
export type TipoProyecto = 'Largometraje' | 'Comercial' | 'Serie' | 'Videoclip' | 'Documental';

/**
 * Estados del proyecto
 */
export type EstadoProyecto = 
  | 'Pre-producción'
  | 'Rodaje'
  | 'Post-producción'
  | 'Colorización'
  | 'Sonido'
  | 'Entregado';

/**
 * Datos de render en tiempo real
 */
export interface RenderData {
  proyectoId: string;
  proyecto: string;
  progreso: number;
  framesRestantes: number;
  tiempoEstimado: string;
  nodosActivos: number;
  ultimaActualizacion: string;
}

/**
 * Estadísticas de producción
 */
export interface StatsData {
  proyectosActivos: number;
  horasRenderizadas: number;
  presupuestoTotal: number;
  equiposEnRodaje: number;
  proyectosCompletados: number;
}

/**
 * Miembro del equipo
 */
export interface MiembroEquipo {
  id: string;
  nombre: string;
  rol: 'Director' | 'Editor' | 'Colorista' | 'Sonidista' | 'Productor' | 'Asistente';
  email: string;
  proyectosAsignados: string[];
  disponible: boolean;
}

/**
 * Cliente
 */
export interface Cliente {
  id: string;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  proyectos: string[];
}

// Alias para compatibilidad con código base
export type DomainItem = Proyecto;

// ============================================
// ESTADOS Y CONFIGURACIÓN
// ============================================

/**
 * Estado de carga para widgets
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Configuración del tema
 */
export interface Theme {
  mode: 'light' | 'dark';
  primaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  textSecondary: string;
  borderColor: string;
}

/**
 * Props base para widgets
 */
export interface WidgetProps {
  title?: string;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

// ============================================
// TIPOS PARA FILTROS Y BÚSQUEDA
// ============================================

/**
 * Opciones de filtrado para proyectos
 */
export interface ProyectoFilterOptions {
  tipo?: TipoProyecto | 'todos';
  estado?: EstadoProyecto | 'todos';
  cliente?: string;
  soloActivos?: boolean;
}

/**
 * Opciones de ordenamiento
 */
export type SortOption = 
  | 'titulo-asc'
  | 'titulo-desc'
  | 'progreso-asc'
  | 'progreso-desc'
  | 'fecha-asc'
  | 'fecha-desc';

// ============================================
// TIPOS PARA FORMULARIOS
// ============================================

/**
 * Datos para crear/editar proyecto
 */
export interface ProyectoFormData {
  titulo: string;
  cliente: string;
  tipo: TipoProyecto;
  estado: EstadoProyecto;
  fechaEntrega: string;
  presupuesto: number;
  descripcion?: string;
}

// ============================================
// TIPOS PARA NOTIFICACIONES
// ============================================

/**
 * Alerta del sistema
 */
export interface Alerta {
  id: string;
  tipo: 'info' | 'warning' | 'error' | 'success';
  mensaje: string;
  proyectoId?: string;
  fecha: string;
  leida: boolean;
}

// ============================================
// TIPOS PARA EL DASHBOARD
// ============================================

/**
 * Configuración del dashboard
 */
export interface DashboardConfig {
  widgetsVisibles: string[];
  layout: 'grid' | 'list';
  autoRefresh: boolean;
  refreshInterval: number;
}

/**
 * Estado global del dashboard
 */
export interface DashboardState {
  proyectos: Proyecto[];
  stats: StatsData | null;
  renderActual: RenderData | null;
  alertas: Alerta[];
  config: DashboardConfig;
}