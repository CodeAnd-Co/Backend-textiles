const CONSULTAS = require('@altertex/util/const/consultasGrupoEmpleados');
const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesGrupoEmpleados');
// RF[24] Actualiza grupo empleado - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF24]

/**
 * Actualiza un grupo de empleados en la base de datos, incluyendo su nombre,
 * descripción, empleados asociados y sets de productos relacionados.
 *
 * Esta función realiza:
 * - La actualización del nombre y descripción del grupo.
 * - La verificación y reemplazo de los empleados asociados al grupo.
 * - La verificación y reemplazo de los sets de productos asociados al grupo.
 *
 * En caso de que los empleados o sets proporcionados no pertenezcan al mismo cliente,
 * se lanza un error.
 *
 * @async
 * @function actualizarGrupoEmpleados
 * @param {object} datosActualizacion - Datos necesarios para actualizar el grupo.
 * @param {number} datosActualizacion.idGrupoEmpleado - ID del grupo de empleados a actualizar.
 * @param {string} datosActualizacion.nombre - Nuevo nombre del grupo.
 * @param {string} datosActualizacion.descripcion - Nueva descripción del grupo.
 * @param {number[]} datosActualizacion.empleados - Lista de IDs de empleados a asociar al grupo.
 * @param {number[]} datosActualizacion.setsDeProductos - Lista de IDs de sets de productos a asociar al grupo.
 * @throws {Error} Si ocurre algún error durante la actualización o verificación de empleados/sets.
 */
exports.actualizarGrupoEmpleados = async (datosActualizacion) => {
  const { idGrupoEmpleado, nombre, descripcion, empleados, setsDeProductos } = datosActualizacion;

  try {
    await correrQuery(CONSULTAS.ACTUALIZAR_GRUPO_EMPLEADOS_NOMBRE_DESCRIPCION, [
      nombre,
      descripcion,
      idGrupoEmpleado,
      nombre,
      descripcion,
    ]);

    if (empleados.length > 0) {
      const empleadosSTR = empleados.join(', ');
      const valores = empleados
        .map((empleadoId) => `(${empleadoId}, ${idGrupoEmpleado})`)
        .join(', ');

      const resultadoVerificacion = await correrQuery(
        CONSULTAS.VERIFICAR_EMPLEADOS_CLIENTE.replace('__EMPLEADOS__', empleadosSTR),
        [idGrupoEmpleado]
      );

      if (resultadoVerificacion[0].validos !== empleados.length) {
        throw new Error(MENSAJES.ERROR_VERIFICACION_CLIENTE_EMPLEADO.mensaje);
      }
      await correrQuery(
        CONSULTAS.ELIMINAR_EMPLEADOS_DE_GRUPO_BASE.replace('__ID__', idGrupoEmpleado).replace(
          '__EMPLEADOS__',
          empleadosSTR
        )
      );
      await correrQuery(CONSULTAS.AGREGAR_EMPLEADOS_NUEVOS_BASE.replace('__VALORES__', valores));
    }

    if (setsDeProductos.length > 0) {
      const setsSTR = setsDeProductos.join(', ');
      const valores = setsDeProductos.map((setId) => `(${setId}, ${idGrupoEmpleado})`).join(', ');

      const resultadoVerificacion = await correrQuery(
        CONSULTAS.VERIFICAR_SETS_CLIENTE.replace('__SETS__', setsSTR),
        [idGrupoEmpleado]
      );

      if (resultadoVerificacion[0].validos !== setsDeProductos.length) {
        throw new Error(MENSAJES.ERROR_VERIFICACION_CLIENTE_SET.mensaje);
      }

      await correrQuery(
        CONSULTAS.ELIMINAR_SETS_DE_GRUPO_BASE.replace('__ID__', idGrupoEmpleado).replace(
          '__SETS__',
          setsSTR
        )
      );

      await correrQuery(CONSULTAS.AGREGAR_SETS_NUEVOS_BASE.replace('__VALORES__', valores));
    }
  } catch (error) {
    throw new Error(error);
  }
};
