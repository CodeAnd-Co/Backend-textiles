const repositorio = require('@altertex/prove/repos/repositorioConsultarProveedores');
const MENSAJES_PROVEEDORES = require('@altertex/util/const/mensajesProveedores');

/**
 * Controlador para la consulta de la lista de proveedores de un cliente.
 *
 * RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
 *
 * @async
 * @function consultarLista
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.user - Datos del usuario autenticado.
 * @param {number} req.user.clienteSeleccionado - ID del cliente seleccionado para la consulta.
 * @param {object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con estado:
 * - 200 si la consulta es exitosa, junto con los datos de los proveedores.
 * - 204 si no hay proveedores registrados.
 * - 400 si los parámetros proporcionados son inválidos.
 * - 500 si ocurre un error en el servidor.
 *
 * @throws {Error} Si ocurre un error inesperado durante la operación.
 */
exports.consultarLista = async (req, res) => {
  const idCliente = parseInt(req.user?.clienteSeleccionado);

  if (!idCliente || isNaN(idCliente)) {
    return res.status(MENSAJES_PROVEEDORES.DATOS_PROVEEDOR_INVALIDOS.codigo).json({
      mensaje: MENSAJES_PROVEEDORES.DATOS_PROVEEDOR_INVALIDOS.mensaje,
    });
  }

  try {
    const resultados = await repositorio.obtenerProveedores(idCliente);

    if (!resultados || resultados.length === 0) {
      return res.status(MENSAJES_PROVEEDORES.LISTA_PROVEEDORES_VACIA.codigo).json({
        mensaje: MENSAJES_PROVEEDORES.LISTA_PROVEEDORES_VACIA.mensaje,
      });
    }

    return res.status(MENSAJES_PROVEEDORES.CONSULTA_PROVEEDORES_EXITOSA.codigo).json({
      mensaje: MENSAJES_PROVEEDORES.CONSULTA_PROVEEDORES_EXITOSA.mensaje,
      listaProveedores: resultados,
    });
  } catch (error) {
    console.error('Error al consultar proveedores:', error);
    return res.status(MENSAJES_PROVEEDORES.ERROR_CONSULTAR_PROVEEDORES.codigo).json({
      mensaje: MENSAJES_PROVEEDORES.ERROR_CONSULTAR_PROVEEDORES.mensaje,
    });
  }
};
