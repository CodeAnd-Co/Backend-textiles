// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EVENTOS = require('@altertex/util/const/consultasEventos');

/**
 * Crea un nuevo evento en la base de datos
 * @function crearEvento
 * @param {object} evento - Objeto que contiene los datos del evento a crear
 * @param {number} evento.idCliente - ID del cliente asociado al evento
 * @param {string} evento.nombre - Nombre del evento
 * @param {string} evento.descripcion - Descripción del evento
 * @param {number} evento.puntos - Puntos asociados al evento
 * @param {number} evento.multiplicador - Multiplicador del evento
 * @param {number} evento.periodoRenovacion - Periodo de renovación del evento
 * @param {number} evento.renovacion - Renovación del evento
 * @returns {object} - Resultado de la operación de creación
 */
exports.crearEvento = async ({
  idCliente,
  nombre,
  descripcion,
  puntos,
  multiplicador,
  periodoRenovacion,
  renovacion,
}) => {
  const query = CONSULTAS_EVENTOS.CREAR_EVENTO;

  const resultado = await correrQuery(query, [
    idCliente,
    nombre,
    descripcion,
    puntos,
    multiplicador,
    periodoRenovacion,
    renovacion,
  ]);

  return resultado;
};
