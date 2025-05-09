const MENSAJES = require('@altertex/util/const/mensajesPagos');
const repositorio = require('@altertex/pago/repos/repositorioActualizarTipoPago');

//RF[54] Actualizar lista de pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF54]

/**
 * Controlador para actualizar los tipos de pago disponibles.
 *
 * Este endpoint recibe un objeto con los cambios a realizar sobre los métodos de pago
 * y utiliza el repositorio correspondiente para aplicar las actualizaciones en la base de datos.
 *
 * @function actualizarTipoPago
 * @async
 * @param {Express.Request} req - Objeto de solicitud HTTP de Express.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {Array<object>} req.body.cambios - Lista de métodos de pago a actualizar, incluyendo su nuevo estado.
 * @param {Express.Response} res - Objeto de respuesta HTTP de Express.
 * @returns {Promise<void>} Retorna una respuesta JSON indicando éxito o error en la operación.
 */
exports.actualizarTipoPago = async (req, res) => {
  const datos = req.body.cambios;

  if (!datos) {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR.mensaje });
  }

  try {
    await repositorio.actualizarTipoPago(datos);
    return res
      .status(MENSAJES.EXITO_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.EXITO_ACTUALIZAR.mensaje, datos });
  } catch {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR.mensaje });
  }
};
