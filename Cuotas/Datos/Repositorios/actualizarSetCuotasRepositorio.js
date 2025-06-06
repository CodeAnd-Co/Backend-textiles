// actualizarSetCuotasRepositorio.js
const CONSULTAS_CUOTAS = require('@altertex/util/const/consultasCuotas');
const correrQuery = require('@altertex/util/ser/correrQuery');

exports.actualizarSetCuotas = async (idCuotaSet, cambios) => {
  const { nombre, descripcion, periodoRenovacion, renovacionHabilitada, productos = [] } = cambios;

  // 1. Actualizar datos básicos de la cuota
  await correrQuery(CONSULTAS_CUOTAS.ACTUALIZAR_CUOTA_SET, [
    nombre,
    descripcion,
    periodoRenovacion,
    renovacionHabilitada,
    new Date(),
    idCuotaSet
  ]);

  // 2. Eliminar productos anteriores
  await correrQuery(CONSULTAS_CUOTAS.ELIMINAR_PRODUCTOS_CUOTA_SET, [idCuotaSet]);

  // 3. Insertar nuevos productos (solo los que tienen ID válido)
  for (const producto of productos) {
    if (producto.idProducto && producto.idProducto > 0) {
      await correrQuery(CONSULTAS_CUOTAS.INSERTAR_CUOTA_PRODUCTO_ACTUALIZAR, [
        idCuotaSet,
        producto.idProducto,
        producto.limite || 0,
        producto.limiteActual || 0
      ]);
    }
  }
};