const conexion = require('@altertex/util/bd/db');
const CONSULTAS_GRUPOS = require('@altertex/util/const/consultasGrupoEmpleados');

/**
 * Elimina un grupo de empleados y sus relaciones con empleados dentro de una transacción.
 *
 * Esta función realiza dos operaciones:
 * 1. Elimina las relaciones entre empleados y el grupo en `empleado_grupo`.
 * 2. Elimina el grupo de la tabla `grupo_empleado`.
 * 
 * Si alguna de las operaciones falla, se revierte toda la transacción para mantener la integridad de los datos.
 *
 * @async
 * @function eliminarGrupoConTransaccion
 * @param {number} idGrupo - ID del grupo de empleados a eliminar.
 * @returns {Promise<object>} - Resultado de la operación MySQL, incluyendo `affectedRows`.
 * @throws {Error} - Si ocurre un error durante la transacción o eliminación.
 *
 * @example
 * const resultado = await eliminarGrupoConTransaccion(5);
 * console.log(resultado.affectedRows); // Número de filas afectadas
 */
exports.eliminarGrupoConTransaccion = async (idGrupo) => {
  return new Promise((resolve, reject) => {
    conexion.beginTransaction(async (err) => {
      if (err) return reject(err);

      try {
        // 1. Eliminar de empleado_grupo
        conexion.query(CONSULTAS_GRUPOS.ELIMINAR_EMPLEADO_GRUPO, [idGrupo], (err1) => {
          if (err1) return conexion.rollback(() => reject(err1));

          // 2. Eliminar de set_producto_grupo_empleado
          conexion.query(CONSULTAS_GRUPOS.ELIMINAR_SET_PRODUCTO_GRUPO, [idGrupo], (err2) => {
            if (err2) return conexion.rollback(() => reject(err2));

            // 3. Eliminar de grupo_empleado
            conexion.query(CONSULTAS_GRUPOS.ELIMINAR_GRUPO, [idGrupo], (err3, resultado) => {
              if (err3) return conexion.rollback(() => reject(err3));

              if (resultado.affectedRows === 0) {
                return conexion.rollback(() => reject(new Error(`Grupo con ID ${idGrupo} no encontrado`)));
              }

              conexion.commit((errCommit) => {
                if (errCommit) return conexion.rollback(() => reject(errCommit));
                resolve(resultado);
              });
            });
          });
        });
      } catch (error) {
        conexion.rollback(() => reject(error));
      }
    });
  });
};

