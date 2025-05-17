const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_CATEGORIAS = require('@altertex/util/const/consultasCategorias');

/**
 * Consulta la lista de categorías y sus productos asociadas a un cliente específico.
 *
 * @function
 * @async
 * @param {number} idCliente - ID del cliente cuyas categorías se desean consultar.
 * @returns {Promise<Array<object>>} Arreglo con las categorías encontradas, cada una con sus productos asociados.
 *
 * @throws {Error} Lanza un error si ocurre un fallo al ejecutar la consulta a la base de datos.
 *
 * @description
 * Esta función ejecuta una consulta SQL definida en `CONSULTAS_CATEGORIAS.OBTENER_CATEGORIAS_CON_PRODUCTOS`
 * utilizando el helper `correrQuery`. Se utiliza en el RF[47] para listar categorías por cliente.
 *
 * @see [RF47 - Documentación de requisitos](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47)
 */
exports.consultarListaCategorias = (idCliente) => {
  const query = CONSULTAS_CATEGORIAS.OBTENER_CATEGORIAS_CON_PRODUCTOS;
  return correrQuery(query, [idCliente]);
};
