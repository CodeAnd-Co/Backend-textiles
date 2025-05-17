//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultasProductos = require('@altertex/util/const/consultasProductos');
const consultasImagenes = require('@altertex/util/const/consultasImagenes');

/**
 * Crea una imagen en la base de datos y la asocia a un producto.
 *
 * Esta función realiza dos operaciones en una transacción:
 * - Inserta una nueva imagen en la tabla de imágenes.
 * - Crea una relación entre la imagen y el producto correspondiente.
 *
 * @param {number} idProducto - ID del producto al que se asociará la imagen.
 * @param {string} urlImagenProducto - URL o ruta de la imagen del producto almacenada.
 * @param {string} nombreComun - Nombre común o descriptivo asociado al producto.
 *
 * @returns {Promise<object|Array>} El resultado de la inserción de la imagen (incluyendo `insertId`) si es exitoso, o un arreglo vacío en caso de error.
 */
exports.crearImagen = async (idProducto, urlImagenProducto, nombreComun) => {
  const queryImagen = consultasImagenes.CREAR;
  const queryRelacionImagenProducto = consultasProductos.CREAR_IMAGEN_PRODUCTO;
  const parametrosImagen = [urlImagenProducto, 'Imagen Producto', nombreComun];

  const conexion = require('@altertex/util/bd/db').promise();

  try {
    await conexion.beginTransaction();

    const resultadoImagen = await correrQuery(queryImagen, parametrosImagen);
    const idImagen = resultadoImagen.insertId;

    const parametrosRelacion = [idImagen, idProducto];
    await correrQuery(queryRelacionImagenProducto, parametrosRelacion);

    await conexion.commit();

    return resultadoImagen;
  } catch (error) {
    console.error('Error al crear o asociar la imagen:', error);
    await conexion.rollback();
    return [];
  }
};
