// RF5 - Eliminar Usuario - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf5/

const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_USUARIOS = require('@altertex/util/const/consultasUsuarios');

/**
 * Elimina uno o varios usuarios de la base de datos junto con todas sus relaciones.
 * @param {Array<number>} usuarios - IDs de los usuarios a eliminar
 * @returns {Promise<boolean>} - `true` si la eliminación fue exitosa, `false` si no se encontraron usuarios.
 */
exports.eliminarUsuarios = async (usuarios) => {
  try {
    // 1. Obtener los IDs de empleados asociados a estos usuarios
    const empleados = await correrQuery(CONSULTAS_USUARIOS.OBTENER_EMPLEADOS_POR_USUARIOS, [
      usuarios,
    ]);

    if (empleados && empleados.length > 0) {
      const idsEmpleados = empleados.map((empleado) => empleado.idEmpleado);

      // 2. Eliminar todas las relaciones de empleado en orden

      // 2.1 Eliminar cuota_set_grupo_empleado
      await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_CUOTA_SET_GRUPO_EMPLEADO, [idsEmpleados]);

      // 2.2 Eliminar empleado_evento
      await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_EMPLEADO_EVENTO, [idsEmpleados]);

      // 2.3 Eliminar empleado_grupo
      await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_EMPLEADO_GRUPO, [idsEmpleados]);

      // 2.4 Eliminar empleado_pedido
      await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_EMPLEADO_PEDIDO, [idsEmpleados]);

      // 2.5 Eliminar tipo_pago_empleado
      await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_TIPO_PAGO_EMPLEADO, [idsEmpleados]);
    }

    // 3. Obtener los IDs de carritos asociados a estos usuarios
    const carritos = await correrQuery(CONSULTAS_USUARIOS.OBTENER_CARRITOS_POR_USUARIOS, [
      usuarios,
    ]);

    if (carritos && carritos.length > 0) {
      const idsCarritos = carritos.map((carrito) => carrito.idCarrito);

      // 3.1 Eliminar registros relacionados en carrito_opcion
      await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_CARRITO_OPCION, [idsCarritos]);

      // 3.2 Eliminar registros del carrito
      await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_CARRITO_POR_USUARIOS, [usuarios]);
    }

    // 4. Eliminar registros de usuario_rol y usuario_cliente
    await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_USUARIO_ROL, [usuarios]);
    await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_USUARIO_CLIENTE, [usuarios]);

    // 5. Ahora sí podemos eliminar los empleados
    await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_EMPLEADO_POR_USUARIOS, [usuarios]);

    // 6. Finalmente, eliminar los usuarios
    const resultado = await correrQuery(CONSULTAS_USUARIOS.ELIMINAR_USUARIOS_POR_IDS, [usuarios]);

    return resultado.affectedRows > 0;
  } catch (error) {
    console.error('Error al eliminar usuario(s):', error);
    throw error;
  }
};
