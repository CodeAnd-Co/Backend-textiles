const repositorio = require('@altertex/cuota/repos/eliminarSetCuotasRepositorio');
const MENSAJES_SET_CUOTAS = require('@altertex/util/const/mensajesCuotas');

/**
 * Controlador para eliminar uno o varios sets de cuotas.
 *
 * RF[35] - Super Administrador elimina Set de Cuotas
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF35
 *
 * @async
 * @function eliminarSetCuotas
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} req.body - Cuerpo de la solicitud, debe incluir un arreglo `idsSetCuotas`.
 * @param {object} res - Objeto de respuesta HTTP.
 *
 * @returns {Response} Devuelve un estado:
 * - 200 si la eliminación fue exitosa.
 * - 404 si no se encontraron IDs válidos.
 * - 500 si ocurrió un error interno.
 */
exports.eliminarSetCuotas = async (req, res) => {
  try {
    const idsSetCuotas = req.body.idsSetCuotas;

    if (!Array.isArray(idsSetCuotas) || idsSetCuotas.length === 0) {
      return res.status(MENSAJES_SET_CUOTAS.SET_CUOTA_NO_ENCONTRADO.codigo).json({
        mensaje: MENSAJES_SET_CUOTAS.SET_CUOTA_NO_ENCONTRADO.mensaje,
      });
    }

    await Promise.all(
      idsSetCuotas.map(async (idSetCuota) => {
        const resultadoSetCuotas = await repositorio.eliminarSetCuotas(idSetCuota);

        if (resultadoSetCuotas.affectedRows === 0) {
          throw new Error(`Set de cuotas con ID ${idSetCuota} no encontrado`);
        }
      })
    );

    return res.status(MENSAJES_SET_CUOTAS.SET_CUOTA_ELIMINADO.codigo).json({
      mensaje: MENSAJES_SET_CUOTAS.SET_CUOTA_ELIMINADO.mensaje,
    });
  } catch (error) {
    return res.status(MENSAJES_SET_CUOTAS.ERROR_ELIMINAR_SET_CUOTAS.codigo).json({
      mensaje: MENSAJES_SET_CUOTAS.ERROR_ELIMINAR_SET_CUOTAS.mensaje,
    });
  }
};
