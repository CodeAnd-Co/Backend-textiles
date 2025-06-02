// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_EVENTOS = require('@altertex/util/const/consultasEventos');
const MENSAJES_EVENTOS = require('@altertex/util/const/mensajesEventos');

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
 * @throws {Error} - Error personalizado según el problema encontrado
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
  try {
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
    
    // Si no hay resultado
    if (!resultado) {
      throw new Error(MENSAJES_EVENTOS.ERROR_INESPERADO.mensaje);
    }
    
    return resultado;
  } catch (error) {
    // Si es un error que ya hemos generado, lo lanzamos tal cual
    const mensajesError = Object.values(MENSAJES_EVENTOS).map(msg => msg.mensaje);
    if (mensajesError.includes(error.message)) {
      throw error;
    }
    
    // Interpretamos posibles errores SQL - solo nos interesa si el cliente no existe
    if (error.message.includes('foreign key constraint') || error.message.includes('FOREIGN KEY')) {
      throw new Error(MENSAJES_EVENTOS.ERROR_CLIENTE_NO_EXISTE.mensaje);
    }
    
    // Si es otro tipo de error, lanzamos un error genérico
    throw new Error(`${MENSAJES_EVENTOS.ERROR_INESPERADO.mensaje}: ${error.message}`);
  }
};
