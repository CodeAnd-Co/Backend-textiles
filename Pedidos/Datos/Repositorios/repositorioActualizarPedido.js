const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesPedidos');
const CONSULTAS = require('@altertex/util/const/consultasPedidos');

//RF[62] - Actualizar Pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF62]

/**
 * Actualiza uno o varios pedidos en la base de datos con nueva información
 * de estado, precio total, ID de envío y ID de pago.
 *
 * Esta función realiza:
 * - La validación de que se proporcionen datos para actualizar.
 * - La actualización simultánea de múltiples pedidos usando Promise.all.
 * - El manejo de errores durante el proceso de actualización.
 *
 * La función procesa cada pedido de forma paralela, actualizando sus campos
 * mediante una consulta SQL preparada con los parámetros proporcionados.
 *
 * @async
 * @function actualizarPedido
 * @param {object[]} datos - Array de objetos con los datos de los pedidos a actualizar.
 * @param {number} datos[].idPedido - ID único del pedido a actualizar.
 * @param {string|number} datos[].estado - Nuevo estado del pedido.
 * @param {number} datos[].precioTotal - Nuevo precio total del pedido.
 * @param {number} datos[].idEnvio - ID del envío asociado al pedido.
 * @param {number} datos[].idPago - ID del pago asociado al pedido.
 * @throws {Error} 'Sin datos para actualizar.' - Si el array está vacío o no es válido.
 * @throws {Error} Mensaje de error específico desde MENSAJES.ERROR_ACTUALIZAR_PEDIDO - Si ocurre algún error durante la actualización.
 */
exports.actualizarPedido = async (datos) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error('Sin datos para actualizar.');
  }

  try {
    await Promise.all(
      datos.map(({ idPedido, estado, precioTotal, idEnvio, idPago }) => {
        return correrQuery(CONSULTAS.ACTUALIZAR_PEDIDO, [
          estado,
          precioTotal,
          idPago,
          idEnvio,
          idPedido,
        ]);
      })
    );
  } catch {
    throw new Error(MENSAJES.ERROR_ACTUALIZAR_PEDIDO.mensaje);
  }
};
