// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

const repositorio = require('@altertex/eve/repos/repositorioCrearEvento');
const MENSAJES_EVENTOS = require('@altertex/util/const/mensajesEventos');

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
exports.crearEvento = async (req, res) => {
  try {
    const { idCliente, nombre, descripcion, puntos, multiplicador, periodoRenovacion, renovacion } = req.body;

    // Validaciones básicas de campos requeridos (descripcion y periodoRenovacion son opcionales)
    if (!idCliente || !nombre || !puntos || !multiplicador) {
      
      return res.status(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo).json({
        codigo: MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo,
        mensaje: MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.mensaje,
      });
    }

    // Validar los datos de entrada
    const idClienteNum = parseInt(idCliente, 10);
    const puntosNum = parseFloat(puntos);
    const multiplicadorNum = parseFloat(multiplicador);

    // Validaciones de formato
    if (isNaN(idClienteNum) || idClienteNum <= 0) {
      return res.status(MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo).json({
        codigo: MENSAJES_EVENTOS.PARAMETROS_INVALIDOS.codigo,
        mensaje: 'El ID del cliente debe ser un número válido mayor a 0.',
      });
    }

    const nuevoEvento = {
      idCliente: idClienteNum,
      nombre,
      descripcion: descripcion && descripcion.trim() !== '' ? descripcion : null,
      puntos: puntosNum,
      multiplicador: multiplicadorNum,
      periodoRenovacion: periodoRenovacion && periodoRenovacion.trim() !== '' ? periodoRenovacion : null,
      renovacion: renovacion ? 1 : 0,
    };

    const resultado = await repositorio.crearEvento(nuevoEvento);

    // Verificar si el evento fue creado exitosamente
    return res.status(MENSAJES_EVENTOS.EVENTO_CREADO.codigo).json({
      codigo: MENSAJES_EVENTOS.EVENTO_CREADO.codigo,
      mensaje: MENSAJES_EVENTOS.EVENTO_CREADO.mensaje,
      evento: resultado?.evento || resultado,
    });

  } catch (error) {
    // Usar el mensaje personalizado del error en la respuesta
    return res.status(MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.codigo).json({
      codigo: MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.codigo,
      mensaje: error.message || MENSAJES_EVENTOS.ERROR_CREAR_EVENTO.mensaje,
    });
  }
};
