const repositorio = require('@altertex/emp/repos/repositorioGrupoDeEmpleados');
const MENSAJES_GRUPO_EMPLEADOS = require('@altertex/util/const/mensajesGrupoEmpleados');

/**
 * Controlador para la consulta de la lista de empleados de un cliente.
 *
 * RF22 - Consulta Lista de Grupo Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF22
 *
 * @async
 * @function consultarLista
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {object} req.user - Datos del usuario autenticado.
 * @param {number} req.user.clienteSeleccionado - ID del cliente seleccionado para la consulta.
 * @param {object} res - Objeto de respuesta de Express.
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

  if (!idCliente) {
    return res
      .status(MENSAJES_GRUPO_EMPLEADOS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_GRUPO_EMPLEADOS.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    const resultados = await repositorio.obtenerGrupoDeEmpleados(idCliente);

    return res.status(MENSAJES_GRUPO_EMPLEADOS.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_GRUPO_EMPLEADOS.CONSULTA_EXITOSA.mensaje,
      grupoEmpleados: resultados,
    });
  } catch (error) {
    console.error('Error al consultar grupo de empleados:', error);
    return res.status(MENSAJES_GRUPO_EMPLEADOS.ERROR_CONSULTAR_GRUPOS.codigo).json({
      mensaje: MENSAJES_GRUPO_EMPLEADOS.ERROR_CONSULTAR_GRUPOS.mensaje,
    });
  }
};
