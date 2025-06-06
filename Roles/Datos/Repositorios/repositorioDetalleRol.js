const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_ROLES = require('@altertex/util/const/consultasRoles');
/**
 * RF8 - Leer detalle de un rol
 * Documentación del requisito funcional:
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF8
 *
 * @async
 * @function obtenerDetalleRol
 * @param {number} idRol - ID del rol que se desea consultar.
 * @returns {Promise<Array<object>>} Arreglo de objetos con datos del rol y sus permisos asociados.
 *
 * @throws {Error} Si ocurre un error en la consulta a la base de datos.
 */
exports.obtenerDetalleRol = async (idRol) => {
  const query = CONSULTAS_ROLES.OBTENER_DETALLE_ROL;

  try {
    const resultado = await correrQuery(query, [idRol]);

    if (!resultado || resultado.length === 0) {
      throw new Error('Rol no encontrado');
    }

    return resultado;
  } catch {
    throw new Error('Error al consultar el detalle del rol');
  }
};