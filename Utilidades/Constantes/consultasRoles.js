/**
 * @file consultasRoles.js
 * @description
 * Contiene las consultas SQL utilizadas en el backend para interactuar con la entidad "Rol".
 * Estas consultas se utilizan principalmente en el repositorio de roles para realizar operaciones
 * de lectura sobre la base de datos.
 *
 * @exports OBTENER_LISTA Consulta SQL que permite obtener todos los roles registrados,
 * junto con la cantidad de usuarios asociados a cada uno.
 */

module.exports = {
  /**
   * Consulta SQL para obtener la lista de roles del sistema.
   *
   * @constant
   * @type {string}
   *
   * @returns {Object[]} Lista de roles con:
   *  - idRol: Identificador único del rol.
   *  - nombre: Nombre del rol.
   *  - descripcion: Descripción del rol.
   *  - totalUsuarios: Número de usuarios asociados al rol.
   *
   * @description
   * Realiza un LEFT JOIN entre las tablas `Rol` y `Usuario_Rol` para contabilizar
   * cuántos usuarios están relacionados con cada rol.
   * Agrupa los resultados por `idRol` para consolidar la información por rol.
   */
  OBTENER_LISTA: `
    SELECT r.idRol, r.nombre, r.descripcion, COUNT(ur.idUsuario) AS totalUsuarios
    FROM rol r
    LEFT JOIN usuario_rol ur ON r.idRol = ur.idRol
    GROUP BY r.idRol;
  `,
  VERIFICAR_NOMBRE_ROL: `
    SELECT idRol FROM rol WHERE nombre = ? LIMIT 1`,

  VERIFICAR_PERMISO: `
    SELECT idPermiso FROM permiso WHERE idPermiso = ? LIMIT 1`,

  INSERTAR_ROL: `
    INSERT INTO rol (nombre, descripcion)
    VALUES (?, ?)`,

  INSERTAR_ROL_PERMISO: `
    INSERT INTO rol_permiso (idRol, idPermiso)
    VALUES (?, ?)`,

  OBTENER_PERMISOS_POR_CLIENTE: `
    SELECT idPermiso AS id, nombre FROM permiso;
  `,

  ELIMINAR_ROL: `
    DELETE FROM rol
    WHERE idRol IN (__IDS__);
`,
};
