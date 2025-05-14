const repositorio = require('@altertex/emp/repos/repositorioEliminarEmpleado');
const MENSAJES_EMPLEADOS = require('@altertex/util/const/mensajesEmpleados');

/**
 * Controlador para eliminar uno o varios empleados.
 * RF[20] - Elimina empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20
 *
 * @async
 * @function eliminarEmpleado
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number[]} req.body.idsEmpleado - Array de IDs numéricos de los empleados a eliminar.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Respuesta HTTP con estado:
 * - 200 si los empleados fueron eliminados correctamente.
 * - 404 si no se encontraron.
 * - 500 si ocurre un error en el servidor.
 */
exports.eliminarEmpleado = async (req, res) => {
  try {
    const idsEmpleado = req.body.idsEmpleado;

    if (!Array.isArray(idsEmpleado) || idsEmpleado.length === 0) {
      return res.status(MENSAJES_EMPLEADOS.EMPLEADO_NO_ENCONTRADO.codigo).json({
        mensaje: MENSAJES_EMPLEADOS.EMPLEADO_NO_ENCONTRADO.mensaje,
      });
    }

    await Promise.all(
      idsEmpleado.map(async (id) => {
        try {
          const resultado = await repositorio.eliminarEmpleado(id);
    
          if (resultado.affectedRows === 0) {
            // console.log(`Empleado con ID ${id} eliminado`);
          }
        } catch (error) {
          console.error(`Error al eliminar empleado con ID ${id}:`, error.message);
        }
      })
    );

    return res.status(MENSAJES_EMPLEADOS.EMPLEADO_ELIMINADO.codigo).json({
      mensaje: MENSAJES_EMPLEADOS.EMPLEADO_ELIMINADO.mensaje,
    });
  } catch (error) {
    console.error('Error al eliminar empleados:', error);
    return res.status(MENSAJES_EMPLEADOS.ERROR_ELIMINAR_EMPLEADO.codigo).json({
      mensaje: MENSAJES_EMPLEADOS.ERROR_ELIMINAR_EMPLEADO.mensaje,
    });
  }
};