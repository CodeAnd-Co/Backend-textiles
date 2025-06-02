//RF25 - Eliminar Grupo de Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF25

const db = require('@altertex/util/bd/db');
const CONSULTAS_GRUPOS = require('@altertex/util/const/consultasGrupoEmpleados');

/**
 * Elimina un grupo de empleados y sus relaciones con empleados dentro de una transacción.
 *
 * Esta función realiza tres operaciones:
 * 1. Elimina las relaciones entre empleados y el grupo en `empleado_grupo`.
 * 2. Elimina las relaciones en `set_producto_grupo_empleado`.
 * 3. Elimina el grupo de la tabla `grupo_empleado`.
 *
 * Si alguna de las operaciones falla, se revierte toda la transacción para mantener la integridad de los datos.
 *
 * @async
 * @function eliminarGrupoConTransaccion
 * @param {number} idGrupo - ID del grupo de empleados a eliminar.
 * @returns {Promise<object>} - Resultado de la operación MySQL, incluyendo `affectedRows`.
 * @throws {Error} - Si ocurre un error durante la transacción o eliminación.
 */
exports.eliminarGrupoConTransaccion = async (idGrupo) => {
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    // 1. Eliminar de empleado_grupo
    await conexion.query(CONSULTAS_GRUPOS.ELIMINAR_EMPLEADO_GRUPO, [idGrupo]);

    // 2. Eliminar de set_producto_grupo_empleado
    await conexion.query(CONSULTAS_GRUPOS.ELIMINAR_SET_PRODUCTO_GRUPO, [idGrupo]);

    // 3. Eliminar de grupo_empleado
    const [resultado] = await conexion.query(CONSULTAS_GRUPOS.ELIMINAR_GRUPO, [idGrupo]);

    if (resultado.affectedRows === 0) {
      throw new Error(`Grupo con ID ${idGrupo} no encontrado`);
    }

    await conexion.commit();
    return resultado;
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    if (conexion) conexion.release();
  }
};