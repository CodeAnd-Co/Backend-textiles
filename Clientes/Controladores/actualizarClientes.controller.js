const MENSAJES = require('@altertex/util/const/mensajesClientes');
const repositorio = require('@altertex/cli/repos/repositorioActualizarCliente');
exports.actualizarClientes = async (req, res) => {
  const datosActualizacion = req.body;
  const imagenActualizacion = req.file;

  if (!datosActualizacion.idCliente) {
    return res
      .status(MENSAJES.FORMATO_ID_CLIENTE_INVALIDO.codigo)
      .json({ mensaje: MENSAJES.FORMATO_ID_CLIENTE_INVALIDO.mensaje });
  }

  try {
    await repositorio.actualizarCliente(datosActualizacion, imagenActualizacion);

    return res
      .status(MENSAJES.CLIENTE_ACTUALIZADO.codigo)
      .json({ mensaje: MENSAJES.CLIENTE_ACTUALIZADO.mensaje });
  } catch {
    return res
      .status(MENSAJES.ERROR_CLIENTE_ACTUALIZADO.codigo)
      .json({ mensaje: MENSAJES.ERROR_CLIENTE_ACTUALIZADO.mensaje });
  }
};
