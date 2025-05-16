const repositorio = require('@altertex/cli/repos/repositorioObtenerLista');
const obtenerImagenFolder = require('@altertex/util/ser/obtenerImagenFolder');
const MENSAJES_CLIENTES = require('@altertex/util/const/mensajesClientes');

/**
 * Controlador para consultar el sistema de un cliente específico.
 *
 * RF12 - Consulta Lista de Clientes - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF12
 *
 * @async
 * @function consultarSistema
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.user - Información del usuario autenticado (inyectada por middleware).
 * @param {string} req.user.correo - Correo electrónico del usuario autenticado.
 * @param {Array<string>} req.user.permisos - Permisos del usuario.
 * @param {Array<number>} req.user.clientesAsociados - Lista de IDs de clientes a los que el usuario tiene acceso.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {string|number} req.body.idCliente - ID del cliente que se desea consultar.
 * @param {object} res - Objeto de respuesta de Express.
 *
 * @returns {Response} Respuesta HTTP con estado:
 * - 200 si la consulta es exitosa y se emite un nuevo token con el cliente seleccionado.
 * - 400 si el formato del ID del cliente no es válido.
 * - 403 si el usuario no está autorizado para consultar ese cliente.
 * - 404 si el cliente no tiene sistema asociado.
 * - 500 si ocurre un error en el servidor al consultar el sistema.
 *
 * @throws {Error} Si ocurre un error inesperado durante la operación.
 */
exports.consultarLista = async (req, res) => {
  let clientesAsociados = req.user.clientesAsociados;

  if (!Array.isArray(clientesAsociados)) {
    return res.status(MENSAJES_CLIENTES.CLIENTES_ASOCIADOS_NO_PROPORCIONADOS.codigo).json({
      mensaje: MENSAJES_CLIENTES.CLIENTES_ASOCIADOS_NO_PROPORCIONADOS.mensaje,
    });
  }

  clientesAsociados = clientesAsociados.map((id) => parseInt(id)).filter((id) => !isNaN(id));

  if (clientesAsociados.length === 0) {
    return res
      .status(MENSAJES_CLIENTES.LISTA_CLIENTES_INVALIDA.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.LISTA_CLIENTES_INVALIDA.mensaje });
  }

  try {
    const listaClientes = await repositorio.obtenerLista(clientesAsociados);
    req.clientes = listaClientes;

    if (!Array.isArray(listaClientes) || listaClientes.length === 0) {
      return res
        .status(MENSAJES_CLIENTES.LISTA_CLIENTES_VACIA.codigo)
        .json({ mensaje: MENSAJES_CLIENTES.LISTA_CLIENTES_VACIA.mensaje });
    }

    const folder = 'clientes/';

    let listaClientesConImagen;
    try {
      listaClientesConImagen = await obtenerImagenFolder(req, folder);
    } catch {
      listaClientesConImagen = listaClientes.map((cliente) => ({
        ...cliente,
        urlImagen: '/placeholder.png',
      }));
    }

    return res.status(MENSAJES_CLIENTES.CONSULTA_LISTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_CLIENTES.CONSULTA_LISTA_EXITOSA.mensaje,
      clientes: listaClientesConImagen,
    });
  } catch (error) {
    return res.status(MENSAJES_CLIENTES.ERROR_CONSULTAR_LISTA_CLIENTES.codigo).json({
      mensaje: MENSAJES_CLIENTES.ERROR_CONSULTAR_LISTA_CLIENTES.mensaje,
      error: error.message,
    });
  }
};
