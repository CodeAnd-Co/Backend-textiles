export default {
  /*
   * Estándar de Nomenclatura para Queries SQL
   * -------------------------------------------
   * Formato general:
   *    [verboAcción][Entidad][CondiciónOpcional]Query
   *
   * Verbos comunes:
   * - obtener   → Consultas SELECT simples
   * - buscar    → Consultas SELECT con filtros (LIKE, WHERE)
   * - crear     → INSERT
   * - actualizar→ UPDATE
   * - eliminar  → DELETE
   * - verificar → Validaciones o conteos booleanos (COUNT)
   * - asignar   → Inserción en tablas de relación
   * - remover   → Eliminación en tablas de relación
   * - cambiar   → Para actualizar campos simples como estatus
   * - contar    → Conteos totales o agrupados
   *
   * Entidades:
   * - Usuario, Rol, Permiso, Cliente, Carrito, UsuarioRol, etc.
   *
   * Condiciones comunes:
   * - PorId, PorCorreo, PorNombre
   * - Activos, Inactivos
   * - ConRol, ConPermiso, ConCarritoActivo
   * - PorGenero, PorCliente
   *
   * Ejemplos:
   * - obtenerUsuariosQuery
   * - buscarUsuariosPorNombreQuery
   * - crearUsuarioQuery
   * - actualizarUsuarioPorIdQuery
   * - eliminarUsuarioPorCorreoQuery
   * - verificarUsuarioExistenteQuery
   * - asignarRolAUsuarioQuery
   * - contarUsuariosPorGeneroQuery
   */

  /*
   * 📘 Diccionario de Queries para Producto
   * --------------------------
   * - obtenerProductosQuery → Lista todos los productos registrados con paginación.
   */

  obtenerProductosQuery: `
    SELECT *
    FROM Producto
    LIMIT ? OFFSET ?;
    `,
};
