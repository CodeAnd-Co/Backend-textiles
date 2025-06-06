// RF29 Actualiza Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF29
const db = require('@altertex/util/bd/db');
const consultasProductos = require('@altertex/util/const/consultasProductos');
const consultasImagenes = require('@altertex/util/const/consultasImagenes');

/**
 * Actualiza la imagen de un producto existente en la base de datos.
 * Esta función realiza dos operaciones en una transacción:
 * - Actualiza la imagen en la tabla de imágenes.
 * - Actualiza la relación entre la imagen y el producto correspondiente.
 * @param {number} idProducto - ID del producto al que se asociará la imagen.
 * @param {number} idImagen - ID de la imagen que se actualizará.
 * @param {string} urlImagenProducto - Nueva URL o ruta de la imagen del producto almacenada.
 * @param {string} nombreComun - Nuevo nombre común o descriptivo asociado al producto.
 * @returns {Promise<object|Array>} El resultado de la actualización de la imagen (incluyendo `affectedRows`) si es exitoso, o un arreglo vacío en caso de error.
 */

exports.actualizarProductoImagen = async (idProducto, idImagen, urlImagenProducto, nombreComun) => {
  const parametrosImagen = [urlImagenProducto, nombreComun, idImagen];
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    // Actualizar la imagen en la tabla de imágenes
    const [resultadoImagen] = await conexion.query(consultasImagenes.ACTUALIZAR, parametrosImagen);

    // Actualizar la relación entre la imagen y el producto
    const parametrosRelacion = [idImagen, idProducto];
    await conexion.query(consultasProductos.ACTUALIZAR_IMAGEN_PRODUCTO, parametrosRelacion);

    await conexion.commit();
    return resultadoImagen;
  } catch (error) {
    console.error('Error al actualizar o asociar la imagen:', error);
    await conexion.rollback();
    return [];
  } finally {
    if (conexion) conexion.release();
  }
};
