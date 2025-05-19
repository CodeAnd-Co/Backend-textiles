// RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasProductos');

/**
 * Obtiene la lista de productos disponibles para un cliente seleccionado.
 *
 * Realiza una consulta a la base de datos para obtener la lista de productos basándose en el `clienteSeleccionado`.
 * Si ocurre algún error durante la consulta, se captura y se devuelve un arreglo vacío.
 *
 * @param {number} clienteSeleccionado - El ID del cliente para el que se obtendrán los productos.
 * @returns {Promise<Array>} Una lista de productos del cliente o un arreglo vacío si ocurre un error.
 */
exports.obtenerProductos = async (clienteSeleccionado) => {
  const query = consultas.OBTENER_LISTA;
  try {
    const resultados = await correrQuery(query, [clienteSeleccionado]);
    return resultados;
  } catch {
    return [];
  }
};
