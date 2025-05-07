const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EVENTOS = require('@altertex/util/const/consultasEventos');

/**
 * Obtiene un evento desde la base de datos mediante su ID.
 *
 * Ejecuta una consulta SQL y retorna el primer evento encontrado o `null` si no existe.
 *
 * @param {number|string} idEvento - ID del evento a buscar.
 * @returns {Promise<object|null>} El evento encontrado o `null` si no existe.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 *
 * @see [RF38 Leer evento](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38)
 */
exports.obtenerEventoPorId = async (idEvento) => {
  const query = CONSULTAS_EVENTOS.LEER_EVENTO;

  try {
    const resultado = await correrQuery(query, [idEvento]);

    if (resultado.length === 0) return null;

    const evento = {
      idEvento: resultado[0].idEvento,
      nombre: resultado[0].nombre,
      descripcion: resultado[0].descripcion,
      puntos: resultado[0].puntos,
      multiplicador: resultado[0].multiplicador,
      periodoRenovacion: resultado[0].periodoRenovacion,
      renovacion: resultado[0].renovacion,
    };

    return evento;
  } catch (error) {
    throw error;
  }
};
