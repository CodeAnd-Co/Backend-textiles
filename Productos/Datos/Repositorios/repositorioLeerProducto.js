const CONSULTAS = require('@altertex/util/const/consultasProductos');
const MENSAJES = require('@altertex/util/const/mensajesProductos');
const correrQuery = require('@altertex/util/ser/correrQuery');

/**
 * Lee la información de un producto específico para un cliente dado.
 *
 * @async
 * @function leerProducto
 * @param {number|string} idProducto - El identificador del producto a consultar.
 * @param {number|string} idCliente - El identificador del cliente que realiza la consulta.
 * @returns {Promise<object[]>} Retorna una promesa que resuelve con los datos del producto si se encuentra.
 * @throws {Error} Lanza un error si el producto no se encuentra o si ocurre un error durante la consulta.
 */
exports.leerProducto = async (idProducto, idCliente) => {
  try {
    const resultado = await correrQuery(CONSULTAS.LEER_PRODUCTO, [idProducto, idCliente]);

    if (resultado.length === 0) {
      throw new Error(MENSAJES.PRODUCTO_NO_ENCONTRADO.mensaje);
    }

    return resultado;
  } catch (error) {
    throw new Error(error.message);
  }
};
