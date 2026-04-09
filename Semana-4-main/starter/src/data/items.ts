// ============================================
// DATOS MOCK - PRODUCTORA AUDIOVISUAL
// ============================================

import { Proyecto, TipoProyecto, SortOption } from '../types';

// ============================================
// PROYECTOS MOCK
// ============================================

export const proyectos: Proyecto[] = [
  {
    id: '1',
    titulo: 'Documental Amazonas',
    cliente: 'National Geographic',
    tipo: 'Documental',
    estado: 'Post-producción',
    fechaEntrega: '2026-05-15',
    progreso: 75,
    presupuesto: 450000,
  },
  {
    id: '2',
    titulo: 'Comercial Nike - Verano 2026',
    cliente: 'Nike',
    tipo: 'Comercial',
    estado: 'Rodaje',
    fechaEntrega: '2026-04-20',
    progreso: 40,
    presupuesto: 280000,
  },
  {
    id: '3',
    titulo: 'Serie "El Último Testigo"',
    cliente: 'Netflix',
    tipo: 'Serie',
    estado: 'Colorización',
    fechaEntrega: '2026-06-01',
    progreso: 85,
    presupuesto: 1200000,
  },
  {
    id: '4',
    titulo: 'Videoclip "Horizontes"',
    cliente: 'Sony Music',
    tipo: 'Videoclip',
    estado: 'Pre-producción',
    fechaEntrega: '2026-04-30',
    progreso: 15,
    presupuesto: 95000,
  },
  {
    id: '5',
    titulo: 'Largometraje "Sombras del Ayer"',
    cliente: 'Warner Bros',
    tipo: 'Largometraje',
    estado: 'Rodaje',
    fechaEntrega: '2026-08-10',
    progreso: 30,
    presupuesto: 3500000,
  },
  {
    id: '6',
    titulo: 'Comercial Coca-Cola - Mundial',
    cliente: 'Coca-Cola',
    tipo: 'Comercial',
    estado: 'Sonido',
    fechaEntrega: '2026-04-25',
    progreso: 90,
    presupuesto: 520000,
  },
  {
    id: '7',
    titulo: 'Documental "Océanos Profundos"',
    cliente: 'BBC Earth',
    tipo: 'Documental',
    estado: 'Rodaje',
    fechaEntrega: '2026-07-15',
    progreso: 55,
    presupuesto: 890000,
  },
  {
    id: '8',
    titulo: 'Serie "Renacer" - Temporada 2',
    cliente: 'Amazon Prime',
    tipo: 'Serie',
    estado: 'Pre-producción',
    fechaEntrega: '2026-09-30',
    progreso: 10,
    presupuesto: 2100000,
  },
  {
    id: '9',
    titulo: 'Videoclip "Electric Dreams"',
    cliente: 'Universal Music',
    tipo: 'Videoclip',
    estado: 'Post-producción',
    fechaEntrega: '2026-05-05',
    progreso: 70,
    presupuesto: 110000,
  },
  {
    id: '10',
    titulo: 'Largometraje "El Último Horizonte"',
    cliente: 'Disney',
    tipo: 'Largometraje',
    estado: 'Entregado',
    fechaEntrega: '2026-03-15',
    progreso: 100,
    presupuesto: 4200000,
  },
  {
    id: '11',
    titulo: 'Comercial Adidas - Running',
    cliente: 'Adidas',
    tipo: 'Comercial',
    estado: 'Colorización',
    fechaEntrega: '2026-04-18',
    progreso: 65,
    presupuesto: 195000,
  },
  {
    id: '12',
    titulo: 'Cortometraje "Silencio"',
    cliente: 'Festival Sundance',
    tipo: 'Largometraje',
    estado: 'Post-producción',
    fechaEntrega: '2026-06-10',
    progreso: 80,
    presupuesto: 175000,
  },
];

// Alias para compatibilidad con código base
export const items = proyectos;

// ============================================
// TIPOS DE PROYECTO (para filtros)
// ============================================

export const tiposProyecto: { value: TipoProyecto; label: string; icon: string }[] = [
  { value: 'todos', label: 'Todos los proyectos', icon: '🎬' },
  { value: 'Largometraje', label: 'Largometrajes', icon: '🎬' },
  { value: 'Comercial', label: 'Comerciales', icon: '📺' },
  { value: 'Serie', label: 'Series', icon: '📺' },
  { value: 'Videoclip', label: 'Videoclips', icon: '🎵' },
  { value: 'Documental', label: 'Documentales', icon: '🌿' },
];

// Alias para compatibilidad
export const categories = tiposProyecto;

// ============================================
// OPCIONES DE ORDENAMIENTO
// ============================================

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'titulo-asc', label: '📋 Título (A-Z)' },
  { value: 'titulo-desc', label: '📋 Título (Z-A)' },
  { value: 'progreso-asc', label: '📊 Progreso (menor a mayor)' },
  { value: 'progreso-desc', label: '📊 Progreso (mayor a menor)' },
  { value: 'fecha-asc', label: '📅 Fecha entrega (más próxima)' },
  { value: 'fecha-desc', label: '📅 Fecha entrega (más lejana)' },
];

// ============================================
// ESTADÍSTICAS (opcional)
// ============================================

export const getEstadisticas = () => {
  const activos = proyectos.filter(p => p.estado !== 'Entregado').length;
  const entregados = proyectos.filter(p => p.estado === 'Entregado').length;
  const progresoPromedio = Math.round(
    proyectos.reduce((sum, p) => sum + p.progreso, 0) / proyectos.length
  );
  const presupuestoTotal = proyectos.reduce((sum, p) => sum + p.presupuesto, 0);

  return {
    totalProyectos: proyectos.length,
    proyectosActivos: activos,
    proyectosEntregados: entregados,
    progresoPromedio,
    presupuestoTotal,
  };
};