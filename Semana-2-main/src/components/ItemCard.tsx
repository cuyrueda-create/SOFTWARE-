import { Item } from '../types';

/**
 * PROPS: ItemCard
 */
interface ItemCardProps {
  item: Item;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemCard
 *
 * Tarjeta individual para mostrar un elemento.
 * Adaptado al dominio: Productora Audiovisual
 */
const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onEdit }) => {
  // ============================================
  // HANDLER: CONFIRMAR ELIMINACIÓN
  // ============================================

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar el proyecto "${item.name}"?`)) {
      onDelete(item.id);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="item-card">
      {/* Información principal */}
      <div className="item-card__header">
        <h3 className="item-card__title">{item.name}</h3>

        {/* Estado del proyecto */}
        <span
          className={`badge badge--${
            item.active ? 'success' : 'secondary'
          }`}>
          {item.active ? 'En producción' : 'Finalizado'}
        </span>
      </div>

      {/* Información detallada */}
      <div className="item-card__body">
        <p>
          <strong>Cliente:</strong> {item.client}
        </p>

        <p>
          <strong>Equipo de rodaje:</strong> {item.team}
        </p>

        <p>
          <strong>Cronograma:</strong> {item.schedule}
        </p>

        <p>
          <strong>Presupuesto:</strong> ${item.budget}
        </p>
      </div>

      {/* Acciones */}
      <div className="item-card__actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(item.id)}
          aria-label={`Editar ${item.name}`}>
          ✏️ Editar
        </button>

        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Eliminar ${item.name}`}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemCard;