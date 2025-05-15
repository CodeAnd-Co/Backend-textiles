const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_SETS_PRODUCTOS = require('@altertex/util/const/consultasSetsProductos');

/**
 * Función para obtener los sets de productos de un cliente específico.
 *
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
 *
 * @async
 * @function obtenerSetsProductos
 * @param {number} idCliente - ID del cliente cuyos sets de productos se desea obtener.
 *
 * @returns {Promise<Array>} Lista de sets de productos del cliente.
 * - Si no se encuentran sets, se retorna un array vacío.
 *
 * @throws {Error} Si ocurre un error al ejecutar la consulta o si no se encuentran resultados.
 */
exports.obtenerSetsProductos = async (idCliente) => {
  const query = CONSULTAS_SETS_PRODUCTOS.OBTENER_LISTA;

  try {
    const setsProductos = await correrQuery(query, [idCliente]);

    return setsProductos;
  } catch {
    return [];
  }
};
