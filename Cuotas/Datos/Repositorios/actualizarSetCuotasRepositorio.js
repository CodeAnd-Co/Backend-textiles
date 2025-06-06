const db = require('@altertex/util/bd/db');
const CONSULTAS_CUOTAS = require('@altertex/util/const/consultasCuotas');
const correrQuery = require('@altertex/util/ser/correrQuery');
const MENSAJES = require('@altertex/util/const/mensajesCuotas');


exports.actualizarSetCuotas = async (idCuotaSet, cambios) => {
  const {
    nombre,
    descripcion,
    periodoRenovacion,
    renovacionHabilitada,
    productos = []
  } = cambios;

  console.log('[DEBUG] Iniciando actualización del set de cuotas', { idCuotaSet, cambios });

  // Actualizar cuota_set
  const resultado = await correrQuery(CONSULTAS_CUOTAS.ACTUALIZAR_CUOTA_SET, [
    nombre,
    descripcion,
    periodoRenovacion,
    renovacionHabilitada,
    new Date(), // ultimaActualizacion
    idCuotaSet
  ]);

  console.log('[DEBUG] Resultado UPDATE cuota_set:', resultado);

  if (!resultado || resultado.affectedRows === 0) {
    throw new Error(MENSAJES.ERROR_ACTUALIZACION.mensaje);
  }

  // Eliminar productos anteriores
  await correrQuery(CONSULTAS_CUOTAS.ELIMINAR_PRODUCTOS_CUOTA_SET, [idCuotaSet]);

  // Insertar nuevos productos
  for (const producto of productos) {
    const { idProducto, limite, limiteActual } = producto;
    await correrQuery(CONSULTAS_CUOTAS.INSERTAR_CUOTA_PRODUCTO_ACTUALIZAR, [
      idCuotaSet,
      idProducto,
      limite,
      limiteActual
    ]);
  }

  console.log('[DEBUG] Set de cuotas actualizado exitosamente.');
};
