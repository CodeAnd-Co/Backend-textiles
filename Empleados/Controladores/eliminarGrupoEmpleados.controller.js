const repositorio = require('@altertex/emp/repos/repositorioEliminarGrupoEmpleados');
const MENSAJES_EMPLEADOS = require('@altertex/util/const/mensajesGrupoEmpleados');

/**
 * RF25 - Eliminar Grupo de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF25
 * Controlador para eliminar uno o varios grupos de empleados.
 *
 * Este endpoint permite eliminar grupos de empleados especificados mediante sus IDs.
 * El proceso elimina las relaciones entre empleados y grupos, y luego elimina los grupos en sí,
 * utilizando una transacción para garantizar la integridad de la base de datos.
 *
 * @async
 * @function eliminarGrupoEmpleados
 * @param {object} req - Objeto de solicitud Express.
 * @param {object} req.body - Cuerpo de la solicitud.
 * @param {number[]} req.body.idsGrupo - Array de IDs de grupos de empleados a eliminar.
 * @param {object} res - Objeto de respuesta Express.
 * @returns {Promise<void>} Respuesta HTTP con el resultado de la operación:
 * - 200: Eliminación exitosa.
 * - 400 o 500: Error al eliminar grupo(s) de empleados.
 *
 * @throws {Error} Error capturado si ocurre una falla durante el proceso de eliminación.
 *
 */
exports.eliminarGrupoEmpleados = async (req, res) => {
  try {
    const idsGrupo = req.body.idsGrupo;

    if (!Array.isArray(idsGrupo) || idsGrupo.length === 0) {
      return res.status(MENSAJES_EMPLEADOS.ELIMINAR_GRUPO_ERROR.codigo).json({
        mensaje: MENSAJES_EMPLEADOS.ELIMINAR_GRUPO_ERROR.mensaje,
      });
    }
    await Promise.all(
      idsGrupo.map(async (idGrupo) => {
        await repositorio.eliminarGrupoConTransaccion(idGrupo);
      })
    );

    return res.status(MENSAJES_EMPLEADOS.ELIMINAR_GRUPO_EXITOSO.codigo).json({
      mensaje: MENSAJES_EMPLEADOS.ELIMINAR_GRUPO_EXITOSO.mensaje,
    });
  } catch (error) {
    console.error('Error al eliminar grupo de empleados:', error);
    return res.status(MENSAJES_EMPLEADOS.ELIMINAR_GRUPO_ERROR.codigo).json({
      mensaje: MENSAJES_EMPLEADOS.ELIMINAR_GRUPO_ERROR.mensaje,
    });
  }
};
