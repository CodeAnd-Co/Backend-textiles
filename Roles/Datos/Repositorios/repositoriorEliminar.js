const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS = require('@altertex/util/const/consultasRoles');
const MENSAJES = require('@altertex/util/const/mensajesRoles');

// RF10 - Eliminar rol - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF10

/**
 * Elimina uno o varios roles de la base de datos según los IDs proporcionados.
 *
 * @async
 * @function eliminarRol
 * @param {number[]} ids - Un arreglo de identificadores de roles a eliminar.
 * @returns {Promise<void>} - No retorna ningún valor si la operación es exitosa.
 * @throws {Error} - Lanza un error si ocurre un fallo en la consulta o si no se eliminó ningún rol.
 *
 * @description
 * Verifica que se haya recibido un arreglo válido de IDs.
 * Construye la consulta SQL dinámicamente usando placeholders para evitar inyecciones SQL.
 * Ejecuta la consulta con los IDs proporcionados.
 * Si no se afecta ninguna fila (es decir, no se eliminó ningún rol), lanza un error con un mensaje predefinido.
 */
exports.eliminarRol = async (ids) => {
  try {
    if (!Array.isArray(ids) || ids.length === 0) return;

    const placeholdersValidar = ids.map(() => '?').join(', ');
    const queryValidar = CONSULTAS.VALIDAR_ROL_SIN_USUARIOS.replace('__IDS__', placeholdersValidar);
    const resultadoValidacion = await correrQuery(queryValidar, ids);

    if (resultadoValidacion[0].cantidad > 0) {
      throw new Error(MENSAJES.ELIMINAR_ROL_ERROR.mensaje_rol_asignado);
    }

    const placeholders = ids.map(() => '?').join(', ');
    const query = CONSULTAS.ELIMINAR_ROL.replace('__IDS__', placeholders);
    const resultado = await correrQuery(query, ids);

    if (resultado.affectedRows === 0) {
      throw new Error(MENSAJES.ELIMINAR_ROL_ERROR.mensaje_no_existe);
    }

    return;
  } catch (error) {
    throw new Error(error.message || MENSAJES.ELIMINAR_ROL_ERROR.mensaje);
  }
};
