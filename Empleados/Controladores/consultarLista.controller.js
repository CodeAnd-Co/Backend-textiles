const repositorio = require("@altertex/emp/repos/repositorioGrupoDeEmpleados");
const MENSAJES_EMPLEADOS = require("@altertex/util/const/mensajesEmpleados");

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
