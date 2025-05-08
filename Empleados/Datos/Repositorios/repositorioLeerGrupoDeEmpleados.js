const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_GRUPOS_EMPLEADOS = require('@altertex/util/const/consultasGrupoEmpleados');

/**
 * Obtiene un grupo de empleados desde la base de datos mediante su ID.
 *
 * Ejecuta una consulta SQL y retorna el primer grupo de empleados encontrado o `null` si no existe.
 *
 * @param {number|string} idGrupo - ID del grupo a buscar.
 * @returns {Promise<object|null>} El grupo de empleados encontrado o `null` si no existe.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 *
 * @see RF[23] Lee grupo de empleados -https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23
 */

exports.obtenerGrupoEmpleadosPorId = async (idGrupo) => {
  const query = CONSULTAS_GRUPOS_EMPLEADOS.LEER_GRUPO;

  try {
    const resultado = await correrQuery(query, [idGrupo]);

    if (resultado.length === 0) return null;

    const grupoEmpleados = {
      idGrupo: resultado[0].idGrupo,
      nombre: resultado[0].nombre,
      descripcion: resultado[0].descripcion,
      setsProductos: resultado[0].setsProductos ? resultado[0].setsProductos.split(', ') : [],
      empleados: resultado[0].empleados ? resultado[0].empleados.split(', ') : [],
    };

    return grupoEmpleados;
  } catch (error) {
    console.error('Error al obtener el grupo de empleados con id:', error);
    throw error;
  }
};
