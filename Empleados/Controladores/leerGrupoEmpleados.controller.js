const repositorio = require('@altertex/emp/repos/repositorioLeerGrupoDeEmpleados');
const MENSAJES_GRUPO_EMPLEADOS = require('@altertex/util/const/mensajesGrupoEmpleados');

/**
 * Lee los detalles de un grupo de empleados desde la base de datos utilizando su ID.
 *
 * Valida el parámetro `idGrupo` y obtiene la información del grupo de empleados a través del repositorio.
 * Si el grupo de empleados no es encontrado o el parámetro es inválido, retorna un error.
 *
 * @param {Express.Request} req - La solicitud HTTP que contiene el `idGrupo` en el cuerpo.
 * @param {Express.Response} res - La respuesta HTTP para enviar el resultado al cliente.
 * @returns {Promise<void>} Responde con el grupo de empleados encontrado o un mensaje de error.
 *
 * @see RF[23] Lee grupo de empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23
 */
exports.leerGrupoEmpleados = async (req, res) => {
  const idGrupo = parseInt(req.body.idGrupo);

  if (isNaN(idGrupo)) {
    return res
      .status(MENSAJES_GRUPO_EMPLEADOS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_GRUPO_EMPLEADOS.PARAMETROS_INVALIDOS.mensaje });
  }
  try {
    const grupoEmpleados = await repositorio.obtenerGrupoEmpleadosPorId(idGrupo);

    if (!grupoEmpleados) {
      return res
        .status(MENSAJES_GRUPO_EMPLEADOS.GRUPO_NO_ENCONTRADO.codigo)
        .json({ mensaje: MENSAJES_GRUPO_EMPLEADOS.GRUPO_NO_ENCONTRADO.mensaje });
    }

    return res.status(MENSAJES_GRUPO_EMPLEADOS.GRUPO_OBTENIDO.codigo).json({
      mensaje: MENSAJES_GRUPO_EMPLEADOS.GRUPO_OBTENIDO.mensaje,
      grupoEmpleados,
    });
  } catch {
    return res
      .status(MENSAJES_GRUPO_EMPLEADOS.ERROR_OBTENER_GRUPO.codigo)
      .json({ mensaje: MENSAJES_GRUPO_EMPLEADOS.ERROR_OBTENER_GRUPO.mensaje });
  }
};
