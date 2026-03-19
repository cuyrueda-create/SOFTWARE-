// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// ============================================

console.log('🏛️ PROYECTO SEMANAL: MODELADO DE ENTIDADES\n');

// INSTRUCCIONES:
// Dominio: Productora audiovisual
// Entidades: proyectos, clientes, equipos de rodaje, cronogramas y presupuestos.

// ============================================
// 1. Define las entidades principales de tu dominio
// ============================================

// QUÉ: Representa un proyecto audiovisual realizado por la productora.
// PARA: Guardar información sobre producciones como comerciales, documentales o películas.
// IMPACTO: Permite organizar y gestionar los proyectos de la empresa.

interface Entity {
  id: number;
  nombreProyecto: string;
  cliente: string;
  presupuesto: number;
  estado: Status;
  categoria: Category;
}

// QUÉ: Representa un cliente que contrata servicios de la productora.
// PARA: Asociar proyectos con los clientes que los solicitan.
// IMPACTO: Permite gestionar la información de los clientes.

interface RelatedEntity {
  id: number;
  nombreCliente: string;
  empresa: string;
  telefono: string;
}

// ============================================
// 2. Usa type unions y literales para propiedades clave
// ============================================

// QUÉ: Estados posibles de un proyecto audiovisual.
// PARA: Controlar en qué etapa del proceso se encuentra el proyecto.
// IMPACTO: Evita usar valores incorrectos para el estado.

type Status = 'planificado' | 'en_produccion' | 'finalizado';

// QUÉ: Tipos de producción audiovisual.
// PARA: Clasificar los proyectos según el tipo de contenido.
// IMPACTO: Facilita la organización y filtrado de proyectos.

type Category = 'comercial' | 'documental' | 'cine';

// ============================================
// 3. Implementa funciones tipadas para operaciones básicas
// ============================================

const proyectos: Entity[] = [];

// QUÉ: Crea un nuevo proyecto audiovisual.
// PARA: Registrar producciones dentro del sistema.
// IMPACTO: Permite almacenar información de nuevos proyectos.

function createEntity(
  id: number,
  nombreProyecto: string,
  cliente: string,
  presupuesto: number,
  estado: Status,
  categoria: Category
): Entity {

  const nuevoProyecto: Entity = {
    id,
    nombreProyecto,
    cliente,
    presupuesto,
    estado,
    categoria
  };

  proyectos.push(nuevoProyecto);
  return nuevoProyecto;
}

// QUÉ: Devuelve todos los proyectos registrados.
// PARA: Mostrar la lista completa de producciones.
// IMPACTO: Permite visualizar la información almacenada.

function listEntities(): Entity[] {
  return proyectos;
}

// QUÉ: Filtra proyectos según su estado.
// PARA: Consultar proyectos en producción, finalizados o planificados.
// IMPACTO: Facilita el seguimiento del progreso de producción.

function filterByStatus(status: Status): Entity[] {
  return proyectos.filter(p => p.estado === status);
}

// ============================================
// 4. Prueba tus funciones con datos de ejemplo
// ============================================

createEntity(1, "Comercial Bebida", "Empresa Cola", 5000, "planificado", "comercial");
createEntity(2, "Documental Amazonas", "Canal Natural", 12000, "en_produccion", "documental");
createEntity(3, "Corto Urbano", "Productora Indie", 8000, "finalizado", "cine");

console.log(listEntities());
console.log(filterByStatus("en_produccion"));

// ============================================
// 5. Comenta tu código explicando qué/para/impacto
// ============================================

// QUÉ:
// Se modelaron entidades para una productora audiovisual utilizando
// interfaces y tipos de TypeScript.

// PARA:
// Gestionar proyectos audiovisuales, registrar información
// de clientes y clasificar producciones.

// IMPACTO:
// Permite organizar los proyectos de la productora,
// mejorar la gestión de producción y evitar errores
// al usar tipos definidos.

console.log('\n🚦 Recuerda: Adapta TODO a tu dominio y comenta tu código.');