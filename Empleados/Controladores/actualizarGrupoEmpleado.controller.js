const MENSAJES = require('@altertex/util/const/mensajesGrupoEmpleados');
const repositorio = require('@altertex/emp/repos/repositorioActualizarGrupo');

exports.actualizarGrupoEmpleados = async (req, res) => {
  const datosActualizacion = req.body;
  if (!datosActualizacion || Object.keys(datosActualizacion).length === 0) {
    return res
      .status(MENSAJES.FORMATO_INVALIDO_DATOS.codigo)
      .json({ mensaje: MENSAJES.FORMATO_INVALIDO_DATOS.mensaje });
  }
  try {
    await repositorio.actualizarGrupoEmpleados(datosActualizacion);

    return res
      .status(MENSAJES.GRUPO_ACTUALIZADO.codigo)
      .json({ mensaje: MENSAJES.GRUPO_ACTUALIZADO.mensaje });
  } catch (error) {
    return res.status(MENSAJES.ERROR_ACTUALIZAR_GRUPOS.codigo).json({ mensaje: error.message });
  }
};
