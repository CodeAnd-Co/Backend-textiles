const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesPagos');
const CONSULTAS = require('@altertex/util/const/consultasPagos');

//RF[54] Actualizar Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF54]

/**
 * Repositorio para actualizar el estado de los tipos de pago en la base de datos.
 *
 * Recorre un arreglo de objetos que contienen la información de cada método de pago
 * (ID, nombre del método y si está habilitado o no), y ejecuta la consulta SQL correspondiente
 * para actualizar su estado.
 *
 * @function actualizarTipoPago
 * @async
 * @param {Array<{ id: number, metodo: string, habilitado: boolean }>} datos - Lista de métodos de pago a actualizar.
 * @throws {Error} Si el arreglo está vacío o si ocurre un error en la base de datos.
 * @returns {Promise<void>} Promesa que se resuelve cuando todas las actualizaciones han sido ejecutadas.
 */
exports.actualizarTipoPago = async (datos) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error('No hay datos para actualizar.');
  }
  try {
    await Promise.all(
      datos.map(({ id, habilitado }) => {
        return correrQuery(CONSULTAS.ACTUALIZAR, [habilitado, id]);
      })
    );
  } catch {
    throw new Error(MENSAJES.ERROR_ACTUALIZAR.mensaje);
  }
};
