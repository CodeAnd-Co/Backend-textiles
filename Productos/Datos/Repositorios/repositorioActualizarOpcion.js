//RF29 Actualiza Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF29
const db = require('@altertex/util/bd/db');
const consultas = require('@altertex/util/const/consultasOpciones');

/**
 * Actualiza una o varias opciones relacionadas con una variante.
 *
 * @async
 * @function crearOpcion
 * @param {number} idVariante - ID de la variante a la que se le agregarán las opciones.
 * @param {Array} opciones - Un arreglo con los objetos de opciones que se desean agregar.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando todas las opciones se crean exitosamente.
 */
exports.actualizarOpcion = async (idVariante, opciones) => {
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    for (const opcion of opciones) {
      const params = [
        idVariante,
        opcion.cantidad,
        opcion.valorOpcion,
        opcion.SKUautomatico,
        opcion.SKUcomercial,
        opcion.costoAdicional,
        opcion.descuento,
        opcion.estado,
      ];

      await conexion.query(consultas.ACTUALIZAR, params);
    }

    await conexion.commit();
  } catch (error) {
    await conexion.rollback();
    console.error('Error al actualizar opciones:', error);
    throw error;
  } finally {
    if (conexion) conexion.release();
  }
};
