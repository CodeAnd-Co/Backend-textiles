// Repositorio para obtener imágenes de productos
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasProductos');

/**
 * Obtiene todas las imágenes asociadas a un producto específico.
 *
 * @async
 * @function obtenerImagenesProducto
 * @param {number|string} idProducto - ID del producto del cual se quieren obtener las imágenes.
 * @returns {Promise<Array>} Lista de imágenes asociadas al producto.
 */
exports.obtenerImagenesProducto = async (idProducto) => {
  try {
    // Usar la consulta existente para obtener imágenes por ID
    const query = consultas.OBTENER_IMAGENES_POR_IDS.replace('(?)', '?');
    const imagenes = await correrQuery(query, [idProducto]);

    return imagenes || [];
  } catch (error) {
    console.error('Error al obtener imágenes del producto:', error);
    return [];
  }
};
