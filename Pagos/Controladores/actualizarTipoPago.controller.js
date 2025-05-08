const MENSAJES = require('@altertex/util/const/mensajesPagos');
const repositorio = require('@altertex/pago/repos/repositorioActualizarTipoPago');

//RF[52] Consulta Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF52]

exports.actualizarTipoPago = async (req, res) => {
  const datos = req.body.cambios;

  if (!datos) {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR.mensaje });
  }

  try {
    await repositorio.actualizarTipoPago(datos);
    return res
      .status(MENSAJES.EXITO_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.EXITO_ACTUALIZAR.mensaje, datos });
  } catch {
    return res
      .status(MENSAJES.ERROR_ACTUALIZAR.codigo)
      .json({ mensaje: MENSAJES.ERROR_ACTUALIZAR.mensaje });
  }
};
