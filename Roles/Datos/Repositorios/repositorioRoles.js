// Importa la función encargada de ejecutar consultas SQL hacia la base de datos.
const correrQuery = require('@altertex/util/ser/correrQuery');

// Importa el objeto que contiene las sentencias SQL relacionadas con la entidad de roles.
const CONSULTAS_ROLES = require('@altertex/util/const/consultasRoles');

/**
 * RF7 - Consultar lista de roles
 * Documentación del requisito funcional:
 * https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF7
 *
 * @async
 * @function obtenerRoles
 * @returns {Promise<Array<object>>} Retorna una lista de objetos que representan los roles obtenidos desde la base de datos.
 *
 * @throws {Error} Si no se encuentran resultados o si ocurre un error al ejecutar la consulta.
 *
 * @description
 * Esta función ejecuta la consulta SQL para obtener la lista de roles desde la base de datos.
 * En caso de que no se encuentren registros, arroja un error indicando que no hay roles registrados.
 * Si ocurre un error en la ejecución de la consulta, se lanza un error genérico para manejo por el controlador.
 */
exports.obtenerRoles = async () => {
  // Consulta SQL para obtener la lista completa de roles.
  const query = CONSULTAS_ROLES.OBTENER_LISTA;

  try {
    // Ejecuta la consulta SQL utilizando la función utilitaria.
    const roles = await correrQuery(query);

    // Verifica si la respuesta está vacía.
    if (!roles || roles.length === 0) {
      throw new Error('No hay roles registrados');
    }

    // Retorna los resultados si existen.
    return roles;
  } catch (error) {
    // Imprime en consola el error para fines de depuración.
    console.error('Error al obtener roles:', error);

    // Lanza un nuevo error genérico para ser manejado por el controlador correspondiente.
    throw new Error('Error al consultar roles');
  }
};
