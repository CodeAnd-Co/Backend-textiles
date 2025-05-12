// RF[30] Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
const correrQuery = require('@altertex/util/ser/correrQuery');
const { ELIMINAR_PRODUCTOS } = require('@altertex/util/const/consultasProductos');
const extraerNombreArchivoS3 = require('@altertex/util/ser/extraerNombreArchivoS3');
const eliminarImagenS3 = require('@altertex/util/ser/eliminarImagenS3');


/**
 * Funcion para eliminar productos de la base de datos.
 *
 * RF30 - Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
 *
 * @async
 * @function eliminarProductos
 * @param {Array<number>} ids - Array de IDs de productos a eliminar.
 *
 * @returns {Promise<boolean>} Resultado de la eliminación.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 * - Retorna true si se eliminaron productos, false en caso contrario.
 */
const eliminarProductos = async (ids) => {
  try {
    // 1. Obtener imágenes de los productos antes de borrarlos
    const obtenerQuery = `
      SELECT i.urlImagen FROM producto p
      JOIN imagen_producto ip ON p.idProducto = ip.idProducto
      JOIN imagen i ON ip.idImagen = i.idImagen
      WHERE p.idProducto IN (${ids.map(() => '?').join(',')});
    `;
    const imagenes = await correrQuery(obtenerQuery, ids);

    // 2. Borrar las imágenes en S3
    for (const img of imagenes) {
      const nombreReal = extraerNombreArchivoS3(img.urlImagen);
      eliminarImagenS3('productos/', nombreReal);
    }

    // 3. Eliminar productos en base de datos
    const placeholders = ids.map(() => '?').join(',');
    const query = ELIMINAR_PRODUCTOS.replace('(?)', `(${placeholders})`);
    const resultado = await correrQuery(query, ids);
    return resultado.affectedRows > 0;
  } catch (error) {
    console.error('Error en eliminarProductos:', error);
    return false;
  }
};

module.exports = {
  eliminarProductos,
};