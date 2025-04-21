/**
 * @file consultasRoles.js
 * @description Contiene las consultas SQL relacionadas con la entidad "Rol" utilizadas en el backend.
 * Utiliza sintaxis literal para definir las consultas exportadas.
 *
 * @exports OBTENER_LISTA Consulta para obtener la lista de roles junto con el total de usuarios asociados.
 */

module.exports = {
    /**
     * Consulta que obtiene la lista de roles con sus respectivos ID, nombre, descripción
     * y la cantidad de usuarios asociados a cada rol.
     * Utiliza paginación con parámetros de límite y desplazamiento.
     */
    OBTENER_LISTA: `
      SELECT r.idRol, r.nombre, r.descripcion, COUNT(ur.idUsuario) AS totalUsuarios
      FROM Rol r
      LEFT JOIN Usuario_Rol ur ON r.idRol = ur.idRol
      GROUP BY r.idRol
      LIMIT ? OFFSET ?;
    `,
  };