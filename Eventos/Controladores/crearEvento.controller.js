// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

const repositorio = require('@altertex/eve/repos/repositorioCrearEvento');
const MENSAJES_EVENTOS = require('@altertex/util/const/mensajesEventos');

/**
 * Controlador para crear un nuevo evento.
 *
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * 
 * @returns {object} - Respuesta JSON con el resultado de la operación.
 */
exports.crearEvento = (req, res) => {
  const { idCliente, nombre, descripcion, puntos, multiplicador, periodoRenovacion, renovacion } =
    req.body;

  // Validar los datos de entrada
  const nuevoEvento = {
    idCliente,
    nombre,
    descripcion,
    puntos,
    multiplicador,
    periodoRenovacion,
    renovacion,
  };

  // Validación de datos
  if (repositorio.crearEvento(nuevoEvento)) {
    return res.status(201).json({
      codigo: MENSAJES_EVENTOS.EVENTO_CREADO.codigo,
      mensaje: MENSAJES_EVENTOS.EVENTO_CREADO.mensaje,
    });
  }
};
