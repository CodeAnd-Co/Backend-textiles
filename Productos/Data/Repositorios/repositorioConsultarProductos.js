const correrQuery = require("../../../util/services/correrQuery");
const consultas = require("../../../util/Consultas/Productos/consultasProductos");
/**
 *
 * @function obtenerProductos}
 * @description Obtiene los productos de la base de datos.
 * @param void
 */
exports.obtenerProductos = async () => {
  const query = consultas.obtenerProductosQuery;

  try {
    const resultados = await correrQuery(query);
    return resultados;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};
