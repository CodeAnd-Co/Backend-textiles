const repositorio = require('@altertex/emp/repos/repositorioEliminarEmpleado');
const MENSAJES_EMPLEADOS = require('@altertex/util/const/mensajesEmpleados');

/**
 * Controlador para eliminar uno o varios empleados.
 *
 * RF[20] - Elimina empleado: https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20
 *
 * Este controlador valida que se reciba un arreglo de IDs de empleados. Luego intenta eliminar
 * cada uno de ellos mediante el repositorio correspondiente. Si alguno no existe o ya fue eliminado,
 * se acumulan sus IDs. Si ocurre un error al eliminar, se registra el mensaje de error y se devuelve
 * una respuesta HTTP adecuada.
 *
 * @async
 * @function eliminarEmpleado
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} req.body - Cuerpo de la solicitud HTTP.
 * @param {number[]} req.body.idsEmpleado - Array de IDs numéricos de los empleados a eliminar.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Respuesta HTTP con:
 * - `200 OK` si al menos un empleado fue eliminado exitosamente.
 * - `404 Not Found` si todos los empleados estaban ausentes o ya eliminados.
 * - `500 Internal Server Error` si ocurrió un error durante el proceso.
 */
exports.eliminarEmpleado = async (req, res) => {
  const idsEmpleado = req.body.idsEmpleado;
  console.log('IDs de empleados a eliminar:', idsEmpleado);

  // Validación de entrada
  if (!Array.isArray(idsEmpleado) || idsEmpleado.length === 0) {
    return res.status(MENSAJES_EMPLEADOS.EMPLEADO_NO_ENCONTRADO.codigo).json({
      mensaje: MENSAJES_EMPLEADOS.EMPLEADO_NO_ENCONTRADO.mensaje,
    });
  }

  const errores = [];
  const noEncontrados = [];

  // Intentar eliminar cada empleado individualmente
  await Promise.all(
    idsEmpleado.map(async (id) => {
      try {
        const resultado = await repositorio.eliminarEmpleado(id);
        if (resultado.affectedRows === 0) {
          noEncontrados.push(id);
        }
      } catch (err) {
        errores.push({ id, error: err.message || 'Error desconocido' });
      }
    })
  );

  // Si hubo errores técnicos
  if (errores.length > 0) {
    return res.status(MENSAJES_EMPLEADOS.ERROR_ELIMINAR_EMPLEADO.codigo).json({
      mensaje: MENSAJES_EMPLEADOS.ERROR_ELIMINAR_EMPLEADO.mensaje,
      detalles: errores,
    });
  }

  // Si ninguno de los empleados fue encontrado
  if (noEncontrados.length === idsEmpleado.length) {
    return res.status(MENSAJES_EMPLEADOS.EMPLEADO_NO_ENCONTRADO.codigo).json({
      mensaje: 'Ninguno de los empleados fue encontrado o ya habían sido eliminados.',
      ids: noEncontrados,
    });
  }

  // Eliminación exitosa (parcial o total)
  return res.status(MENSAJES_EMPLEADOS.EMPLEADO_ELIMINADO.codigo).json({
    mensaje: MENSAJES_EMPLEADOS.EMPLEADO_ELIMINADO.mensaje,
    noEncontrados: noEncontrados.length > 0 ? noEncontrados : undefined,
  });
};
