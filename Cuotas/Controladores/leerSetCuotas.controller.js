const repositorio = require('@altertex/cuota/repos/leerSetCuotasRepositorio');
const MENSAJES_CUOTAS = require('@altertex/util/const/mensajesCuotas');

/**
 * Lee un conjunto de cuotas desde la base de datos utilizando su ID.
 *
 * Valida el parámetro `idSetCuota` y obtiene la información del set de cuotas a través del repositorio.
 * Si el set de cuotas no es encontrado o el parámetro es inválido, retorna un error.
 *
 * @param {Express.Request} req - La solicitud HTTP que contiene el `idSetCuota` en el cuerpo.
 * @param {Express.Response} res - La respuesta HTTP para enviar el resultado al cliente.
 * @returns {Promise<void>} Responde con el set de cuotas encontrado o un mensaje de error.
 *
 * @see [RF33 Leer set cuotas](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF33)
 */
exports.leerSetCuotas = async (req, res) => {
  const idSetCuota = parseInt(req.body.idSetCuota);

  if (isNaN(idSetCuota)) {
    return res
      .status(MENSAJES_CUOTAS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_CUOTAS.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    const setCuota = await repositorio.obtenerSetCuotaPorId(idSetCuota);

    if (!setCuota) {
      return res
        .status(MENSAJES_CUOTAS.SET_CUOTA_NO_ENCONTRADO.codigo)
        .json({ mensaje: MENSAJES_CUOTAS.SET_CUOTA_NO_ENCONTRADO.mensaje });
    }

    return res.status(MENSAJES_CUOTAS.CONSULTA_EXITOSA.codigo).json({
      mensaje: MENSAJES_CUOTAS.CONSULTA_EXITOSA.mensaje,
      setCuota,
    });
  } catch (error) {
    console.error('Error al consultar Set cuotas:', error);
    return res
      .status(MENSAJES_CUOTAS.ERROR_OBTENER_SET_CUOTA.codigo)
      .json({ mensaje: MENSAJES_CUOTAS.ERROR_OBTENER_SET_CUOTA.mensaje });
  }
};
