/**
 * COMPONENTE: Header
 *
 * Muestra el título y descripción de la aplicación.
 * Adaptado al dominio: Productora audiovisual
 */

const Header: React.FC = () => {
  return (
    <header className="header">

      <h1>🎬 Sistema de Gestión de Productora Audiovisual</h1>

      <p>
        Gestiona proyectos audiovisuales, clientes, equipos de rodaje,
        cronogramas y presupuestos
      </p>

    </header>
  );
};

export default Header;