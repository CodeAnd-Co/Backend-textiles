// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

const repositorio = require('@altertex/eve/repos/repositorioCrearEvento');
const MENSAJES_EVENTOS = require('@altertex/util/const/mensajesEventos');
const { parse } = require('dotenv');

/**
 * Controlador para crear un nuevo evento.
 *
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud que contiene los datos del evento.
 * @param {string} req.body.idCliente - ID del cliente asociado al evento.
 * @param {string} req.body.nombre - Nombre del evento.
 * @param {string} req.body.descripcion - Descripción del evento.
 * @param {number} req.body.puntos - Puntos otorgados por el evento.
 * @param {number} req.body.multiplicador - Multiplicador de puntos del evento.
 * @param {string} req.body.periodoRenovacion - Periodo de renovación del evento.
 * @param {boolean} req.body.renovacion - Indica si el evento se renueva automáticamente.
 * @param {object} res - Objeto de respuesta de Express.
 *
 * @returns {object} - Respuesta JSON con el resultado de la operación.
 */
exports.crearEvento = (req, res) => {
  try {

    const { idCliente, nombre, descripcion, puntos, multiplicador, periodoRenovacion, renovacion } = req.body;

    // Validar los datos de entrada
    const nuevoEvento = {
      idCliente: parseInt(idCliente, 10),
      nombre,
      descripcion,
      puntos: parseFloat(puntos),
      multiplicador: parseFloat(multiplicador),
      periodoRenovacion,
      renovacion: parseInt(renovacion, 10),
    };

    // Validación de datos
    if (repositorio.crearEvento(nuevoEvento)) {
      return res.status(201).json({
        codigo: MENSAJES_EVENTOS.EVENTO_CREADO.codigo,
        mensaje: MENSAJES_EVENTOS.EVENTO_CREADO.mensaje,
      });
    }

  } catch {
    return res.status(MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.codigo).json({
      mensaje: MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.mensaje,
    });
  }
};
