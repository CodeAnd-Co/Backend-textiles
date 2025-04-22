const repositorio = require("@altertex/emp/repos/repositorioGrupoDeEmpleados");
const MENSAJES_EMPLEADOS = require("@altertex/util/const/mensajesEmpleados");

/**
 * Controlador para la consulta de la lista de empleados de un cliente.
 *
 * RF17 - Consulta Lista de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
 *
 * @async
 * @function consultarLista
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number} req.body.limit - Número máximo de resultados a devolver.
 * @param {number} req.body.offset - Número de resultados a omitir para paginación.
 * @param {Object} req.user - Datos del usuario autenticado.
 * @param {number} req.user.clienteSeleccionado - ID del cliente seleccionado para la consulta.
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con estado:
 * - 200 si la consulta es exitosa, junto con los datos de los empleados.
 * - 400 si los parámetros proporcionados son inválidos.
 * - 500 si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error inesperado durante la operación.
 */

exports.consultarLista = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);
  const limit = parseInt(req.body.limit);
  const offset = parseInt(req.body.offset);

  if (!idCliente || isNaN(limit) || isNaN(offset)) {
    return res
      .status(MENSAJES_EMPLEADOS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_EMPLEADOS.PARAMETROS_INVALIDOS.mensaje });
  }

  if (limit <= 0 || offset < 0) {
    return res
      .status(MENSAJES_EMPLEADOS.LIMITE_OFFSET_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_EMPLEADOS.LIMITE_OFFSET_INVALIDOS.mensaje });
  }

  try {
    const resultados = await repositorio.obtenerGrupoDeEmpleados(
      idCliente,
      limit,
      offset
    );

    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_EMPLEADOS.SIN_RESULTADOS.codigo)
        .json({ mensaje: MENSAJES_EMPLEADOS.SIN_RESULTADOS.mensaje });
    }

    return res.status(MENSAJES_EMPLEADOS.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_EMPLEADOS.CONSULTA_EXITOSA.mensaje,
      grupo_empleados: resultados,
    });
  } catch (error) {
    console.error("Error al consultar empleados:", error);
    return res
      .status(MENSAJES_EMPLEADOS.ERROR_CONSULTAR_EMPLEADOS.codigo)
      .json({ mensaje: MENSAJES_EMPLEADOS.ERROR_CONSULTAR_EMPLEADOS.mensaje });
  }
};
