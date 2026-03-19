// ============================================
// TYPES: INTERFACES Y TIPOS
// ============================================
// Dominio: Productora Audiovisual

/**
 * Interface principal del sistema
 * Representa un proyecto audiovisual
 */
export interface Item {
  id: number;
  name: string; // nombre del proyecto
  client: string; // cliente
  team: string; // equipo de rodaje
  schedule: string; // cronograma o fecha
  budget: number; // presupuesto
}

/**
 * Datos del formulario (sin id)
 */
export interface FormData {
  name: string;
  client: string;
  team: string;
  schedule: string;
  budget: number;
}
