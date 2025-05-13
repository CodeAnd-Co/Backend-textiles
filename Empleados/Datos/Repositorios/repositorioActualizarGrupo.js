const CONSULTAS = require('@altertex/util/const/consultasGrupoEmpleados');
const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesGrupoEmpleados');

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
  } catch (error) {
    throw new Error(error);
  }
};
