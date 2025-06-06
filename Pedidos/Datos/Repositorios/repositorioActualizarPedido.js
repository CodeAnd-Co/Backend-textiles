const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesPedidos');
const CONSULTAS = require('@altertex/util/const/consultasPedidos');

/**
 * RF[62] - Actualizar Pedido
 * Repositorio para actualizar los datos de uno o varios pedidos.
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
