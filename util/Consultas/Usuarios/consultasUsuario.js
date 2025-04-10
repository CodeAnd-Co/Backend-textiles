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
   * 📘 Diccionario de Queries
   * --------------------------
   * - obtenerUsuariosQuery → Lista todos los usuarios registrados.
   * - obtenerUsuariosConRolQuery → Lista todos los usuarios junto con su rol asignado.
   * - obteenerUsuariosEmpleados → Lista todos los usuarios que son empleados.
   * - obtenerUsuariosActivosQuery → Lista los usuarios con estatus activo.
   * - obtenerUsuarioQuery → Obtiene los datos completos de un usuario por correo electrónico.
   * - obtenerIdQuery → Obtiene el ID del usuario por correo electrónico.
   * - obtenerPermisosQuery → Lista los nombres de los permisos asignados a un usuario por correo.
   * - obtenerRolQuery → Obtiene el nombre del rol asociado a un usuario por correo.
   * - obtenerClientesAsociadosQuery → Lista los clientes asociados a un usuario por correo.
   * - crearUsuarioQuery → Inserta un nuevo usuario en la base de datos.
   * - actualizarUsuarioQuery → Actualiza los datos del usuario por correo electrónico.
   * - actualizarContraseniaQuery → Actualiza la contraseña de un usuario por correo electrónico.
   * - cambiarEstatusUsuarioQuery → Cambia el estatus (activo/inactivo) de un usuario por correo.
   * - eliminarUsuarioQuery → Elimina un usuario de la base de datos por correo.
   * - verificarUsuarioExistenteQuery → Verifica si ya existe un usuario con el mismo correo.
   * - obtenerUsuariosInactivosQuery → Lista los usuarios con estatus inactivo.
   * - buscarUsuariosPorNombreQuery → Busca usuarios cuyo nombre completo coincida con el criterio.
   * - asignarRolAUsuarioQuery → Asocia un rol a un usuario.
   * - removerRolDeUsuarioQuery → Elimina la asociación de un rol con un usuario.
   * - asociarUsuarioAClienteQuery → Asocia un usuario a un cliente.
   * - desasociarUsuarioDeClienteQuery → Desvincula a un usuario de un cliente.
   * - obtenerUsuariosPorRolQuery → Lista los usuarios que tienen un rol específico.
   * - obtenerUsuariosConPermisoEspecificoQuery → Lista usuarios con un permiso específico.
   * - obtenerUsuariosConCarritoQuery → Lista usuarios que tienen un carrito activo.
   * - contarUsuariosRegistradosQuery → Cuenta la cantidad total de usuarios registrados.
   * - contarUsuariosPorGeneroQuery → Cuenta los usuarios agrupados por género.
   */

  obtenerUsuariosQuery: `
    SELECT *
    FROM Usuario
    LIMIT ? OFFSET ?;
  `,

  obtenerUsuariosConRolQuery: `
    SELECT u.*, r.nombre
    AS nombreRol
    FROM Usuario u
    JOIN Usuario_Rol ur ON u.idUsuario = ur.idUsuario
    JOIN Rol r ON ur.idRol = r.idRol
    LIMIT ? OFFSET ?;
  `,

  obtenerUsuariosEmpleadosQuery: `
    SELECT u.*, e.idEmpleado, 
    e.antiguedad, e.areaTrabajo, 
    e.cantidadPuntos, e.numeroEmergencia, 
    e.posicion
    FROM Usuario u
    JOIN Empleado e ON u.idUsuario = e.idUsuario
    LIMIT ? OFFSET ?;
  `,

  obtenerUsuariosActivosQuery: `
    SELECT *
    FROM Usuario
    WHERE estatus = TRUE
    LIMIT ? OFFSET ?;
  `,

  obtenerUsuarioQuery: `
    SELECT *
    FROM Usuario u
    WHERE u.correoElectronico = ?;
  `,

  obtenerIdQuery: `
    SELECT idUsuario
    FROM Usuario u
    WHERE u.correoElectronico = ?;
  `,

  obtenerPermisosQuery: `
    SELECT p.nombre
    FROM Usuario u
    JOIN Usuario_Rol ur ON u.idUsuario = ur.idUsuario
    JOIN Rol r ON ur.idRol = r.idRol
    JOIN Rol_Permiso rp ON r.idRol = rp.idRol
    JOIN Permiso p ON rp.idPermiso = p.idPermiso
    WHERE u.correoElectronico = ?;
  `,

  obtenerRolQuery: `
    SELECT r.nombre
    FROM Usuario u
    JOIN Usuario_Rol ur ON u.idUsuario = ur.idUsuario
    JOIN Rol r ON ur.idRol = r.idRol
    WHERE u.correoElectronico = ?;
  `,

  obtenerClientesAsociadosQuery: `
    SELECT c.idCliente, c.nombreComercial, c.nombreFiscal
    FROM Cliente c
    JOIN Usuario_Cliente uc ON c.idCliente = uc.idCliente
    JOIN Usuario u ON uc.idUsuario = u.idUsuario
    WHERE u.correoElectronico = ?;
  `,

  crearUsuarioQuery: `
    INSERT INTO Usuario (idUsuario, nombreCompleto, correoElectronico, contrasenia, numeroTelefono, direccion, fechaNacimiento, genero, estatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `,

  actualizarUsuarioQuery: `
    UPDATE Usuario
    SET nombreCompleto = ?, correoElectronico = ?, numeroTelefono = ?, direccion = ?, fechaNacimiento = ?, genero = ?
    WHERE correoElectronico = ?;
  `,

  actualizarContraseniaQuery: `
    UPDATE Usuario
    SET contrasenia = ?
    WHERE correoElectronico = ?;
  `,

  cambiarEstatusUsuarioQuery: `
    UPDATE Usuario
    SET estatus = ?
    WHERE correoElectronico = ?;
  `,

  eliminarUsuarioQuery: `
    DELETE FROM Usuario
    WHERE correoElectronico = ?;
  `,

  verificarUsuarioExistenteQuery: `
    SELECT COUNT(*) as cuenta
    FROM Usuario
    WHERE correoElectronico = ?;
  `,

  obtenerUsuariosInactivosQuery: `
    SELECT *
    FROM Usuario
    WHERE estatus = FALSE
    LIMIT ? OFFSET ?;
  `,

  buscarUsuariosPorNombreQuery: `
    SELECT *
    FROM Usuario
    WHERE nombreCompleto LIKE ?;
  `,

  asignarRolAUsuarioQuery: `
    INSERT INTO Usuario_Rol (idUsuario, idRol)
    VALUES (?, ?);
  `,

  removerRolDeUsuarioQuery: `
    DELETE FROM Usuario_Rol
    WHERE idUsuario = ? AND idRol = ?;
  `,

  asociarUsuarioAClienteQuery: `
    INSERT INTO Usuario_Cliente (idUsuario, idCliente)
    VALUES (?, ?);
  `,

  desasociarUsuarioDeClienteQuery: `
    DELETE FROM Usuario_Cliente
    WHERE idUsuario = ? AND idCliente = ?;
  `,

  obtenerUsuariosPorRolQuery: `
    SELECT u.*
    FROM Usuario u
    JOIN Usuario_Rol ur ON u.idUsuario = ur.idUsuario
    JOIN Rol r ON ur.idRol = r.idRol
    WHERE r.nombre = ?;
  `,

  obtenerUsuariosConPermisoEspecificoQuery: `
    SELECT DISTINCT u.*
    FROM Usuario u
    JOIN Usuario_Rol ur ON u.idUsuario = ur.idUsuario
    JOIN Rol r ON ur.idRol = r.idRol
    JOIN Rol_Permiso rp ON r.idRol = rp.idRol
    JOIN Permiso p ON rp.idPermiso = p.idPermiso
    WHERE p.nombre = ?
    LIMIT ? OFFSET ?;
  `,

  obtenerUsuariosConCarritoQuery: `
    SELECT DISTINCT u.*
    FROM Usuario u
    JOIN Carrito c ON u.idUsuario = c.idUsuario
    WHERE c.estado = TRUE
    LIMIT ? OFFSET ?;
  `,

  contarUsuariosRegistradosQuery: `
    SELECT COUNT(*) as totalUsuarios
    FROM Usuario;
  `,

  contarUsuariosPorGeneroQuery: `
    SELECT genero, COUNT(*) as cantidad
    FROM Usuario
    GROUP BY genero;
  `,
};
