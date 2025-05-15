//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const conexion = require('@altertex/util/bd/db').promise();
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultasVariantes = require('@altertex/util/const/consultasVariantes');
const consultasImagenes = require('@altertex/util/const/consultasImagenes');

/**
 * Crea una imagen en la base de datos y la asocia a una variante de producto.
 *
 * Esta función realiza dos operaciones dentro de una transacción:
 * - Inserta una nueva imagen en la tabla de imágenes.
 * - Crea una relación entre la imagen y la variante correspondiente.
 *
 * @param {number} idVariante - ID de la variante a la que se asociará la imagen.
 * @param {string} urlImagenVariante - URL o ruta de la imagen de la variante almacenada.
 * @param {string} nombreComun - Nombre común o descriptivo asociado a la variante.
 *
 * @returns {Promise<object|Array>} El resultado de la inserción de la imagen (incluyendo `insertId`) si es exitoso, o un arreglo vacío en caso de error.
 */
exports.crearImagen = async (idVariante, urlImagenVariante, nombreComun) => {
  const queryImagen = consultasImagenes.CREAR;
  const queryRelacionImagenVariante = consultasVariantes.CREAR_IMAGEN_VARIANTE;
  const parametrosImagen = [urlImagenVariante, 'Imagen Variante', nombreComun];

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
