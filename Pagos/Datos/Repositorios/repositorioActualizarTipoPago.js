const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesPagos');
const CONSULTAS = require('@altertex/util/const/consultasPagos');

exports.actualizarTipoPago = async (datos) => {
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error('No hay datos para actualizar.');
  }
  try {
    await Promise.all(
      datos.map(({ id, metodo, habilitado }) => {
        return correrQuery(CONSULTAS.ACTUALIZAR, [habilitado, id]);
      })
    );
  } catch {
    throw new Error(MENSAJES.ERROR_ACTUALIZAR.mensaje);
  }
};
