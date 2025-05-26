// RF21 - Crear Grupo de Empleados
const db = require('@altertex/util/bd/db');
const CONSULTAS = require('@altertex/util/const/consultasGrupoEmpleados');

/**
 * Crea un nuevo grupo de empleados y asigna una lista de empleados al grupo.
 *
 * @async
 * @function crearGrupoYAsignarEmpleados
 * @param {string} nombreGrupo - Nombre del nuevo grupo.
 * @param {string} descripcion - Descripción del grupo.
 * @param {number} idCliente - ID del cliente al que pertenece el grupo.
 * @param {number[]} listaEmpleados - Lista de IDs de empleados que se asignarán al grupo.
 * @returns {Promise<{idGrupo: number}>} El ID del grupo creado.
 * @throws {Error} Si ocurre un error durante la transacción.
 */
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

/**
 * Verifica si ya existe un grupo con el mismo nombre para un cliente dado.
 *
 * @async
 * @function existeGrupoConNombre
 * @param {string} nombreGrupo - Nombre del grupo a validar.
 * @param {number} idCliente - ID del cliente.
 * @returns {Promise<boolean>} `true` si el grupo ya existe, `false` si no.
 * @throws {Error} Si ocurre un error durante la consulta.
 */
exports.existeGrupoConNombre = async (nombreGrupo, idCliente) => {
  const conexion = await db.getConnection();

  try {
    const [resultados] = await conexion.query(
      CONSULTAS.VALIDAR_NOMBRE_REPETIDO,
      [idCliente, nombreGrupo.trim()]
    );
    return resultados.length > 0;
  } catch {
    throw new Error("Ya existe un grupo con ese nombre");
  } finally {
    if (conexion) conexion.release();
  }
};
