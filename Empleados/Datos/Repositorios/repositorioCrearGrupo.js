// RF21 - Crear Grupo de Empleados
const db = require('@altertex/util/bd/db');
const CONSULTAS = require('@altertex/util/const/consultasGrupoEmpleados');

exports.crearGrupoYAsignarEmpleados = async (nombreGrupo, descripcion, idCliente, listaEmpleados) => {
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    // Inserta el grupo en la base de datos
    const [resultadoGrupo] = await conexion.query(
      CONSULTAS.CREAR_GRUPO,
      [idCliente, nombreGrupo, descripcion]
    );

    const idGrupo = resultadoGrupo.insertId;

    // Asigna los empleados al grupo
    for (const idEmpleado of listaEmpleados) {
      await conexion.query(
        CONSULTAS.ASIGNAR_EMPLEADO_A_GRUPO,
        [idEmpleado, idGrupo]
      );
    }

    await conexion.commit();
    return { idGrupo };
  } catch (error) {
    await conexion.rollback();
    throw error;
  } finally {
    if (conexion) conexion.release();
  }
};

exports.existeGrupoConNombre = async (nombreGrupo, idCliente) => {
  const conexion = await db.getConnection();

  try {
    const [resultados] = await conexion.query(
      CONSULTAS.VALIDAR_NOMBRE_REPETIDO,
      [idCliente, nombreGrupo.trim()]
    );
    return resultados.length > 0;
  } catch (error) {
    throw error;
  } finally {
    if (conexion) conexion.release();
  }
};