//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasOpciones');

/**
 * Crea una o varias opciones relacionadas con una variante.
 *
 * @async
 * @function crearOpcion
 * @param {number} idVariante - ID de la variante a la que se le agregarán las opciones.
 * @param {Array} opciones - Un arreglo con los objetos de opciones que se desean agregar.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando todas las opciones se crean exitosamente.
 */
exports.crearOpcion = async (idVariante, opciones) => {
  const query = consultas.CREAR;

  const promises = opciones.map(async (opcion) => {
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

    await correrQuery(query, params);
  });

  await Promise.all(promises);
};
