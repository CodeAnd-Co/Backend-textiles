const correrQuery = require('@altertex/util/ser/correrQuery');

/**
 * Obtiene la lista de permisos disponibles desde la base de datos.
 *
 * @async
 * @function obtenerPermisos
 * @returns {Promise<Array<{id: number, nombre: string}>>} Arreglo de objetos con los permisos disponibles.
 */
exports.obtenerPermisos = async () => {
  const consulta = 'SELECT idPermiso AS id, nombre FROM permiso';
  return await correrQuery(consulta);
};
