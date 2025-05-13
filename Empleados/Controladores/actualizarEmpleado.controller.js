const MENSAJES = require('@altertex/util/const/mensajesEmpleados');
const repositorio = require('@altertex/emp/repos/repositorioActualizarEmpleado');

//RF[19] Actualizar empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF19]

/**
 * Controlador para actualizar la información de un empleado.
 *
 * Este endpoint recibe un objeto con los cambios que se aplicarán
 * sobre un empleado y usa su repositorio para hacer el cambio en la
 * base de datos.
 *
 * @function actualizarEmpleado
 * @async
 * @param {Express.Request} req - Objeto de solicitud HTTP de Express.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {object|Array<object>} req.body.cambios - Información del empleado a actualizar.
 * @param {Express.Response} res - Objecto de respuesta HTTP de Express.
 * @returns {Promise<void>} Retorna una respuesta JSON indicando éxito o un error.
 */
exports.actualizarEmpleado = async (req, res) => {
  let datos;

  // Si no hay cambios
  if (req.body.id || req.body.idEmpleado) {
    datos = [req.body];
  } else if (req.body.cambios) {
    // Si la información viene en el formato esperado (hay cambios)
    datos = Array.isArray(req.body.cambios) ? req.body.cambios : [req.body.cambios];
  } else {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR.mensaje });
  }

  if (!datos || datos.length === 0) {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR.mensaje });
  }

  try {
    await repositorio.actualizarEmpleado(datos);
    return res
      .status(MENSAJES.EXITO_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.EXITO_ACTUALIZAR.mensaje, datos });
  } catch (error) {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR.mensaje });
  }
};
