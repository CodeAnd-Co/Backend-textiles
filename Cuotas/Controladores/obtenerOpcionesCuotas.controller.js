const repositorio = require("@altertex/cuota/repos/obtenerOpcionesCuotasRepositorio");
const MENSAJES = require("@altertex/util/const/mensajesCuotas");

exports.obtenerOpcionesCuotas = async (req, res) => {
  try {
    const idCliente = req.body.clienteSeleccionado;
    if (!idCliente) {
      return res.status(400).json({ mensaje: MENSAJES.FALTA_ID_CLIENTE });
    }

    const resultado = await repositorio.obtenerCuotaOpcion(idCliente);

    return res
      .status(201)
      .json({ mensaje: MENSAJES.OPCIONES_OBTENIDAS, resultado });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ mensaje: MENSAJES.ERROR_OBTENIENDO_OPCIONES, error });
  }
};
