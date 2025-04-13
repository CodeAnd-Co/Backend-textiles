const repositorio = require("@altertex/cli/repos/repositorioClientes");
const MENSAJES_CLIENTES = require("@altertex/util/const/mensajesClientes");

exports.consultarSistema = async (req, res) => {
  const idCliente = parseInt(req.body.idCliente);
  const idUsuario = parseInt(req.query?.idUsuario);

  if (isNaN(idCliente) || isNaN(idUsuario)) {
    return res
      .status(MENSAJES_CLIENTES.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    const tieneRelacion = await repositorio.validarRelacionUsuarioCliente(
      idUsuario,
      idCliente
    );

    if (!tieneRelacion) {
      return res
        .status(MENSAJES_CLIENTES.ACCESO_NO_AUTORIZADO.codigo)
        .json({ mensaje: MENSAJES_CLIENTES.ACCESO_NO_AUTORIZADO.mensaje });
    }

    const sistema = await repositorio.obtenerSistemaPorCliente(idCliente);

    if (!sistema) {
      return res
        .status(MENSAJES_CLIENTES.CLIENTE_SIN_SISTEMA.codigo)
        .json({ mensaje: MENSAJES_CLIENTES.CLIENTE_SIN_SISTEMA.mensaje });
    }

    return res.status(MENSAJES_CLIENTES.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_CLIENTES.CONSULTA_EXITOSA.mensaje,
      sistema,
    });
  } catch (error) {
    console.error("Error al consultar sistema:", error);
    return res
      .status(MENSAJES_CLIENTES.ERROR_CONSULTAR_SISTEMA.codigo)
      .json({ mensaje: MENSAJES_CLIENTES.ERROR_CONSULTAR_SISTEMA.mensaje });
  }
};
