const MENSAJES_CUOTAS = require('@altertex/util/const/mensajesCuotas');
const repositorio = require('@altertex/cuota/repos/actualizarSetCuotasRepositorio');

exports.actualizarSetCuotas = async (req, res) => {
  try {
    const { idCuotaSet, cambios } = req.body;

    if (!idCuotaSet || !cambios) {
      return res.status(400).json({ mensaje: MENSAJES_CUOTAS.PARAMETROS_INVALIDOS.mensaje });
    }

    await repositorio.actualizarSetCuotas(idCuotaSet, cambios);

    return res.status(200).json({ mensaje: MENSAJES_CUOTAS.ACTUALIZACION_EXITOSA.mensaje });
  } catch (error) {
    console.error('[ERROR] actualizarSetCuotas:', error);
    return res.status(500).json({ mensaje: error.message || MENSAJES_CUOTAS.ERROR_ACTUALIZACION.mensaje });
  }
};