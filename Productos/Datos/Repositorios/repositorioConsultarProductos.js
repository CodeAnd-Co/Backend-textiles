//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
const correrQuery = require("@altertex/util/ser/correrQuery");
const consultas = require("@altertex/util/const/consultasProductos");
/**
 *
 * @function obtenerProductos}
 * @description Obtiene los productos de la base de datos.
 * @param void
 */
exports.obtenerProductos = async (clienteSeleccionado) => {
  const query = consultas.OBTENER_LISTA;
  try {
    const resultados = await correrQuery(query, [clienteSeleccionado]);
    return resultados;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};
