//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const conexion = require('@altertex/util/bd/db').promise();
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultasVariantes = require('@altertex/util/const/consultasVariantes');
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

exports.crearImagen = async (idVariante, urlImagenProducto, nombreComun) => {
  const queryImagen = consultasImagenes.CREAR;
  const queryRelacionImagenVariante = consultasVariantes.CREAR_IMAGEN_VARIANTE;
  const parametrosImagen = [urlImagenProducto, 'Imagen Variante', nombreComun];

  try {
    await conexion.beginTransaction();

    const resultadoImagen = await correrQuery(queryImagen, parametrosImagen);
    const idImagen = resultadoImagen.insertId;

    const parametrosRelacion = [idImagen, idVariante];
    await correrQuery(queryRelacionImagenVariante, parametrosRelacion);

    await conexion.commit();

    return resultadoImagen;
  } catch (error) {
    console.error('Error al crear o asociar la imagen:', error);
    await conexion.rollback();
    return [];
  }
};
