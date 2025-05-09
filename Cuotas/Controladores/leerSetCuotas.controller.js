const repositorio = require('@altertex/cuota/repos/leerSetCuotasRepositorio');
const MENSAJES_CUOTAS = require('@altertex/util/const/mensajesCuotas');

/**
 * Lee un conjunto de cuotas desde la base de datos utilizando su ID.
 *
 * Valida el parámetro `idCuota` y obtiene la información de las cuotas a través del repositorio.
 * Si las cuotas no son encontradas o el parámetro es inválido, retorna un error.
 *
 * @param {Express.Request} req - La solicitud HTTP que contiene el `idCuota` en el cuerpo.
 * @param {Express.Response} res - La respuesta HTTP para enviar el resultado al cliente.
 * @returns {Promise<void>} Responde con las cuotas encontradas o un mensaje de error.
 *
 * @see [RF33 Leer set cuotas](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38)
 */

exports.leerSetCuotas = async (req, res) => {
  const idSetCuota = parseInt(req.body.idSetCuota);

  if (isNaN(idSetCuota)) {
    return res
      .status(MENSAJES_CUOTAS.PARAMETROS_INVALIDOS.codigo)
      .json({ mensaje: MENSAJES_CUOTAS.PARAMETROS_INVALIDOS.mensaje });
  }

  try {
    const setCuota = await repositorio.obtenerCuotasPorId(idSetCuota);

    if (!setCuota) {
      return res
        .status(MENSAJES_CUOTAS.CUOTAS_NO_ENCONTRADAS.codigo)
        .json({ mensaje: MENSAJES_CUOTAS.CUOTAS_NO_ENCONTRADAS.mensaje });
    }

    return res.status(MENSAJES_CUOTAS.CUOTAS_OBTENIDAS.codigo).json({
      mensaje: MENSAJES_CUOTAS.CUOTAS_OBTENIDAS.mensaje,
      setCuota,
    });
  } catch (error) {
    console.error('Error al consultar Set cuotas:', error);
    return res
      .status(MENSAJES_CUOTAS.ERROR_OBTENER_CUOTAS.codigo)
      .json({ mensaje: MENSAJES_CUOTAS.ERROR_OBTENER_CUOTAS.mensaje });
  }
};
