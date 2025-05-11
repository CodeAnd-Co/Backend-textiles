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
 * @function ACTUALIZAR_EMPLEADO
 * @async
 * @param {Express.Request} req - Objeto de solicitud HTTP de Express.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {Array<Object>} req.body.cambios - Lista de información a alterar.
 * @param {Express.Response} res - Objecto de respuesta HTTP de Express.
 * @returns {Promise<void>} Retorna una respuesta JSON indicando éxito o un error.
 */
exports.actualizarEmpleado = async (req, res) => {
  const datos = req.body.cambios;

  if (!datos) {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR.mensaje });
  }

  try {
    await repositorio.actualizarEmpleado(datos);
    return res
      .status(MENSAJES.EXITO_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.EXITO_ACTUALIZAR.mensaje, datos });
  } catch {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR.mensaje });
  }
};
