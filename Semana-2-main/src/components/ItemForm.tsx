import { useState, useEffect } from 'react';
import { Item } from '../types';

/**
 * PROPS: ItemForm
 */
interface ItemFormProps {
  onAdd: (item: Omit<Item, 'id'>) => void;
  onUpdate: (id: number, updates: Partial<Item>) => void;
  editingItem?: Item;
  onCancelEdit: () => void;
}

/**
 * COMPONENTE: ItemForm
 *
 * Formulario para agregar o editar proyectos de una productora audiovisual.
 */
const ItemForm: React.FC<ItemFormProps> = ({
  onAdd,
  onUpdate,
  editingItem,
  onCancelEdit,
}) => {

  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================

  const initialState = {
    name: '',
    client: '',
    team: '',
    schedule: '',
    budget: 0,
    active: true
  };

  const [formData, setFormData] = useState(initialState);

  // ============================================
  // EFECTO: PRE-LLENAR FORMULARIO AL EDITAR
  // ============================================

  useEffect(() => {
    if (editingItem) {
      const { id, ...rest } = editingItem;
      setFormData(rest);
    } else {
      setFormData(initialState);
    }
  }, [editingItem]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  /**
   * Validación
   */
  const validate = (): boolean => {

    if (!formData.name.trim()) {
      alert('El nombre del proyecto es requerido');
      return false;
    }

    if (!formData.client.trim()) {
      alert('El cliente es requerido');
      return false;
    }

    if (formData.budget <= 0) {
      alert('El presupuesto debe ser mayor a 0');
      return false;
    }

    return true;
  };

  /**
   * Submit
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingItem) {
      onUpdate(editingItem.id, formData);
      onCancelEdit();
    } else {
      onAdd(formData);
    }

    setFormData(initialState);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="form-container">
      <h2>{editingItem ? '✏️ Editar Proyecto' : '➕ Agregar Proyecto'}</h2>

      <form onSubmit={handleSubmit} className="item-form">

        {/* Nombre del proyecto */}
        <div className="form-group">
          <label htmlFor="name">Nombre del Proyecto *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Comercial Coca-Cola"
            required
          />
        </div>

        {/* Cliente */}
        <div className="form-group">
          <label htmlFor="client">Cliente *</label>
          <input
            type="text"
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Empresa o cliente"
            required
          />
        </div>

        {/* Equipo de rodaje */}
        <div className="form-group">
          <label htmlFor="team">Equipo de Rodaje</label>
          <input
            type="text"
            id="team"
            name="team"
            value={formData.team}
            onChange={handleChange}
            placeholder="Director, cámara, sonido..."
          />
        </div>

        {/* Cronograma */}
        <div className="form-group">
          <label htmlFor="schedule">Cronograma</label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            placeholder="Fechas de producción"
          />
        </div>

        {/* Presupuesto */}
        <div className="form-group">
          <label htmlFor="budget">Presupuesto *</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Monto en USD"
          />
        </div>

        {/* Estado */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleCheckboxChange}
            />
            Proyecto activo
          </label>
        </div>

        {/* Botones */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Actualizar' : 'Agregar'}
          </button>

          {editingItem && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onCancelEdit();
                setFormData(initialState);
              }}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;