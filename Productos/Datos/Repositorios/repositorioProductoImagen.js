//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultasProductos = require('@altertex/util/const/consultasProductos');
const consultasImagenes = require('@altertex/util/const/consultasImagenes');

/**
 * Crea una imagen para un producto y lo relaciona con el producto en la base de datos.
 *
 * @async
 * @function crearImagen
 * @param {number} idProducto - ID del producto al que se le asociará la imagen.
 * @param {string} urlImagenProducto - URL de la imagen a insertar.
 * @param {string} nombreComun - Nombre común del producto (opcional para algunos casos).
 * @returns {Promise<object[]>} - Los resultados de la transacción o un error.
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
