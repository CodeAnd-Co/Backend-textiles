const repositorio = require("@altertex/cli/repos/repositorioObtenerLista");
const MENSAJES_CLIENTES = require("@altertex/util/const/mensajesClientes");

exports.consultarLista = async (req, res) => {
  let clientesAsociados = req.user.clientesAsociados;

  if (!Array.isArray(clientesAsociados)) {
    return res
      .status(MENSAJES_CLIENTES.CLIENTES_ASOCIADOS_NO_PROPORCIONADOS.codigo)
      .json({
        mensaje: MENSAJES_CLIENTES.CLIENTES_ASOCIADOS_NO_PROPORCIONADOS.mensaje,
      });
  }

  clientesAsociados = clientesAsociados
    .map((id) => parseInt(id))
    .filter((id) => !isNaN(id));

  if (clientesAsociados.length === 0) {
    return res
      .status(MENSAJES_CLIENTES.LISTA_CLIENTES_INVALIDA.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.LISTA_CLIENTES_INVALIDA.mensaje });
  }

  try {
    const listaClientes = await repositorio.obtenerLista(clientesAsociados);

    if (!Array.isArray(listaClientes) || listaClientes.length === 0) {
      return res
        .status(MENSAJES_CLIENTES.LISTA_CLIENTES_VACIA.codigo)
        .json({ mensaje: MENSAJES_CLIENTES.LISTA_CLIENTES_VACIA.mensaje });
    }

    return res.status(MENSAJES_CLIENTES.CONSULTA_LISTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_CLIENTES.CONSULTA_LISTA_EXITOSA.mensaje,
      clientes: listaClientes,
    });
  } catch (error) {
    console.error("Error al consultar lista de clientes:", error);
    return res
      .status(MENSAJES_CLIENTES.ERROR_CONSULTAR_LISTA_CLIENTES.codigo)
      .json({
        mensaje: MENSAJES_CLIENTES.ERROR_CONSULTAR_LISTA_CLIENTES.mensaje,
      });
  }
};
