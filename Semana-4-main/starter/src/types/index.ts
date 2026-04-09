// ============================================
// TIPOS E INTERFACES - PRODUCTORA AUDIOVISUAL
// ============================================

/**
 * Interfaz principal para proyectos audiovisuales
 */
export interface Proyecto {
  id: string;
  titulo: string;
  cliente: string;
  tipo: TipoProyectoExcluyendoTodos;
  estado: EstadoProyecto;
  fechaEntrega: string;
  progreso: number;
  presupuesto: number;
}

// Alias para compatibilidad con código base
export type Item = Proyecto;

/**
 * Tipos de proyecto (para filtros)
 */
export type TipoProyecto = 'todos' | 'Largometraje' | 'Comercial' | 'Serie' | 'Videoclip' | 'Documental';
export type TipoProyectoExcluyendoTodos = Exclude<TipoProyecto, 'todos'>;

// Alias para compatibilidad
export type Category = TipoProyecto;

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
 * Opciones de ordenamiento
 */
export type SortOption =
  | 'titulo-asc'
  | 'titulo-desc'
  | 'progreso-asc'
  | 'progreso-desc'
  | 'fecha-asc'
  | 'fecha-desc';

/**
 * Estado de los filtros
 */
export interface FilterState {
  searchTerm: string;
  tipo: TipoProyecto;
  showOnlyActive: boolean;
  sortBy: SortOption;
  minProgreso?: number;
  maxProgreso?: number;
}

/**
 * Props comunes para componentes
 */
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Estado de carga/error genérico
 */
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Estadísticas del catálogo
 */
export interface CatalogoStats {
  totalProyectos: number;
  proyectosActivos: number;
  proyectosEntregados: number;
  progresoPromedio: number;
  presupuestoTotal: number;
}

/**
 * Tipo para acciones de proyecto
 */
export type ProyectoAction = 
  | { type: 'VIEW'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: Proyecto }
  | { type: 'CREATE'; payload: Omit<Proyecto, 'id'> };