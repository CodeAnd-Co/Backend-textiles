const repositorio = require('@altertex/setspro/repos/repositorioConsultarSetsProductos');
const MENSAJES_SETS_PRODUCTOS = require('@altertex/util/const/mensajesSetsProductos');

/**
 * Controlador para la consulta de la lista de sets de productos de un cliente.
 *
 * RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
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
 * - 200 si la consulta es exitosa, junto con los datos de los sets de productos.
 * - 204 y mensaje si no hay usuarios en la base de datos.
 * - 500 si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error inesperado durante la operación.
 */
exports.consultarLista = async (req, res) => {
  const idCliente = parseInt(req.user.clienteSeleccionado);

  // Validación del ID de cliente
  if (!idCliente) {
    return res
      .status(MENSAJES_SETS_PRODUCTOS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_SETS_PRODUCTOS.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    const resultados = await repositorio.obtenerSetsProductos(idCliente);

    if (!resultados || resultados.length === 0) {
      return res
        .status(MENSAJES_SETS_PRODUCTOS.SIN_RESULTADOS.codigo)
        .json({ mensaje: MENSAJES_SETS_PRODUCTOS.SIN_RESULTADOS.mensaje });
    }

    return res.status(MENSAJES_SETS_PRODUCTOS.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_SETS_PRODUCTOS.CONSULTA_EXITOSA.mensaje,
      setsProductos: resultados,
    });
  } catch {
    return res
      .status(MENSAJES_SETS_PRODUCTOS.ERROR_CONSULTAR_SETS_PRODUCTOS.codigo)
      .json({ mensaje: MENSAJES_SETS_PRODUCTOS.ERROR_CONSULTAR_SETS_PRODUCTOS.mensaje });
  }
};
