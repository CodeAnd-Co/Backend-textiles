//RF29 Actualizar Producto  - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF29
const db = require('@altertex/util/bd/db');
const consultasVariantes = require('@altertex/util/const/consultasVariantes');
const consultasImagenes = require('@altertex/util/const/consultasImagenes');

/**
 * Actualiza la imagen de una variante existente en la base de datos.
 * Esta función realiza dos operaciones en una transacción:
 * - Actualiza la imagen en la tabla de imágenes.
 * - Actualiza la relación entre la imagen y la variante correspondiente.
 * @param {number} idVariante - ID de la variante a la que se asociará la imagen.
 * @param {number} idImagen - ID de la imagen que se actualizará.
 * @param {string} urlImagenVariante - Nueva URL o ruta de la imagen de la variante almacenada.
 * @param {string} nombreVariante - Nuevo nombre de la variante asociado a la imagen.
 * @returns {Promise<object|Array>} El resultado de la actualización de la imagen (incluyendo `affectedRows`) si es exitoso, o un arreglo vacío en caso de error.
 */
exports.actualizarVarianteImagen = async (
  idVariante,
  idImagen,
  urlImagenVariante,
  nombreVariante
) => {
  const parametrosImagen = [urlImagenVariante, nombreVariante, idImagen];
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    // Actualizar la imagen en la tabla de imágenes
    const [resultadoImagen] = await conexion.query(consultasImagenes.ACTUALIZAR, parametrosImagen);

    // Actualizar la relación entre la imagen y la variante
    const parametrosRelacion = [idImagen, idVariante];
    await conexion.query(consultasVariantes.ACTUALIZAR_IMAGEN_VARIANTE, parametrosRelacion);

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
