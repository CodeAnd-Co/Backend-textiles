// RF[30] Eliminar Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasProductos');
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
    // 1. Obtener imágenes asociadas
    const placeholders = ids.map(() => '?').join(',');
    const queryObtenerImagenes = consultas.OBTENER_IMAGENES_POR_IDS.replace('(?)', `(${placeholders})`);
    const imagenes = await correrQuery(queryObtenerImagenes, ids);

    // 2. Eliminar imágenes válidas
    for (const img of imagenes) {
      if (img.urlImagen && !img.urlImagen.includes('placeholder')) {
        const nombreReal = extraerNombreArchivoS3(img.urlImagen);
        if (nombreReal) {
          await eliminarImagenS3('productos/', nombreReal);
        }
      }
    }

    // 3. Eliminar productos
    const queryEliminar = consultas.ELIMINAR_PRODUCTOS.replace('(?)', `(${placeholders})`);
    const resultado = await correrQuery(queryEliminar, ids);

    return resultado?.affectedRows > 0;
  } catch {
    return false;
  }
};

module.exports = {
  eliminarProductos,
};