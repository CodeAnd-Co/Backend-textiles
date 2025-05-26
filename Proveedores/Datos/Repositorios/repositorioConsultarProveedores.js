//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasProveedores');

/**
 * Obtiene la lista de proveedores registrados para un cliente específico.
 *
 * Esta función ejecuta una consulta SQL para recuperar los proveedores asociados
 * al cliente proporcionado. Devuelve un arreglo de proveedores si la operación
 * es exitosa, o un arreglo vacío en caso de error.
 *
 * @param {string|number} clienteSeleccionado - ID o identificador del cliente del cual se quieren obtener los proveedores.
 *
 * @returns {Promise<Array>} Un arreglo de objetos que representan los proveedores, o un arreglo vacío si ocurre un error.
 */
exports.obtenerProveedores = async (clienteSeleccionado) => {
  const query = consultas.OBTENER_LISTA;
  try {
    const resultados = await correrQuery(query, [clienteSeleccionado]);
    return resultados;
  } catch (error) {
    console.error('Error al obtener los proveedores:', error);
    return [];
  }
};
