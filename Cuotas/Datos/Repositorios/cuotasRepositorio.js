// Importación de la función utilitaria para ejecutar queries SQL hacia la base de datos.
const correrQuery = require('@altertex/util/ser/correrQuery');

// Importación del conjunto de consultas SQL relacionadas con la entidad "Cuotas".
const CONSULTAS_CUOTAS = require('@altertex/util/const/consultasCuotas');

/**
 * Función encargada de obtener los sets de cuotas asociados a un cliente específico.
 * RF32 - Consulta Lista de Sets de Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF32
 * @async
 * @function obtenerCuotas
 * @param {number} idCliente - Identificador único del cliente a consultar.
 * @returns {Promise<Array<object>>} Retorna una lista de sets de cuotas si existen,
 * o un array vacío si ocurre un error o no se encuentran resultados.
 *
 * @throws {Error} En caso de fallo en la ejecución de la consulta, se captura el error
 * y se retorna una lista vacía. El error se registra en consola para facilitar depuración.
 *
 * @example
 * const cuotas = await obtenerCuotas(42);
 * console.log(cuotas); // [{ idCuota: 1, nombre: 'Mensualidad A', ... }, ...]
 *
 * @description
 * Esta función forma parte del requerimiento funcional RF32 - "Consulta Lista de Sets de Cuotas".
 * Realiza una consulta SQL utilizando `correrQuery`, pasando como parámetro el `idCliente`.
 * Si no hay resultados o ocurre un error, retorna un array vacío como respuesta segura por defecto.
 */
exports.obtenerCuotas = async (idCliente) => {
  try {
    // Ejecuta la consulta SQL con el ID del cliente como parámetro.
    const resultado = await correrQuery(CONSULTAS_CUOTAS.OBTENER_CUOTAS, [
      idCliente,
    ]);

    // Retorna los resultados o un arreglo vacío si no hay datos.
    return resultado || [];
  } catch (error) {
    // Registra el error en consola para diagnóstico.
    console.error('Error al obtener cuotas:', error);

    // Devuelve un array vacío en caso de error para evitar ruptura del flujo.
    return [];
  }
};