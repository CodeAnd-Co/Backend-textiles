// RF5 - Eliminar Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf5/

const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

/**
 * Elimina uno o varios usuarios de la base de datos junto con todas sus relaciones.
 * @param {Array<number>} usuarios - IDs de los usuarios a eliminar
 * @returns {Promise<boolean>} - Verdadero si la eliminación fue exitosa
 */
exports.eliminarUsuarios = async (usuarios) => {
  try {
    // 1. Obtener los IDs de empleados asociados a estos usuarios
    const queryObtenerEmpleados = `SELECT idEmpleado FROM empleado WHERE idUsuario IN (${usuarios
      .map(() => '?')
      .join(',')})`;
    const empleados = await correrQuery(queryObtenerEmpleados, usuarios);

    if (empleados && empleados.length > 0) {
      const idsEmpleados = empleados.map((e) => e.idEmpleado);

      // 2. Eliminar todas las relaciones de empleado en orden

      // 2.1 Eliminar cuota_set_grupo_empleado
      const placeholdersCuota = idsEmpleados.map(() => '?').join(',');
      await correrQuery(
        `DELETE FROM cuota_set_grupo_empleado WHERE idEmpleado IN (${placeholdersCuota})`,
        idsEmpleados
      );

      // 2.2 Eliminar empleado_evento
      await correrQuery(
        `DELETE FROM empleado_evento WHERE idEmpleado IN (${placeholdersCuota})`,
        idsEmpleados
      );

      // 2.3 Eliminar empleado_grupo
      await correrQuery(
        `DELETE FROM empleado_grupo WHERE idEmpleado IN (${placeholdersCuota})`,
        idsEmpleados
      );

      // 2.4 Eliminar empleado_pedido
      await correrQuery(
        `DELETE FROM empleado_pedido WHERE idEmpleado IN (${placeholdersCuota})`,
        idsEmpleados
      );

      // 2.5 Eliminar tipo_pago_empleado
      await correrQuery(
        `DELETE FROM tipo_pago_empleado WHERE idEmpleado IN (${placeholdersCuota})`,
        idsEmpleados
      );
    }

    // 3. Obtener los IDs de carritos asociados a estos usuarios
    const queryObtenerCarritos = `SELECT idCarrito FROM carrito WHERE idUsuario IN (${usuarios
      .map(() => '?')
      .join(',')})`;
    const carritos = await correrQuery(queryObtenerCarritos, usuarios);

    if (carritos && carritos.length > 0) {
      const idsCarritos = carritos.map((c) => c.idCarrito);
      const placeholdersCarrito = idsCarritos.map(() => '?').join(',');

      // 3.1 Eliminar registros relacionados en carrito_opcion
      await correrQuery(
        `DELETE FROM carrito_opcion WHERE idCarrito IN (${placeholdersCarrito})`,
        idsCarritos
      );

      // 3.2 Eliminar registros del carrito
      await correrQuery(
        `DELETE FROM carrito WHERE idUsuario IN (${usuarios.map(() => '?').join(',')})`,
        usuarios
      );
    }

    // 4. Eliminar registros de usuario_rol y usuario_cliente
    await correrQuery(
      `DELETE FROM usuario_rol WHERE idUsuario IN (${usuarios.map(() => '?').join(',')})`,
      usuarios
    );

    await correrQuery(
      `DELETE FROM usuario_cliente WHERE idUsuario IN (${usuarios.map(() => '?').join(',')})`,
      usuarios
    );

    // 5. Ahora sí podemos eliminar los empleados
    await correrQuery(
      `DELETE FROM empleado WHERE idUsuario IN (${usuarios.map(() => '?').join(',')})`,
      usuarios
    );

    // 6. Finalmente, eliminar los usuarios
    const resultado = await correrQuery(
      `DELETE FROM usuario WHERE idUsuario IN (${usuarios.map(() => '?').join(',')})`,
      usuarios
    );

    return resultado.affectedRows > 0;
  } catch (error) {
    console.error('❌ Error al eliminar usuario(s):', error);

    throw error;
  }
};
