const CONSULTAS_CUOTAS = require('@altertex/util/const/consultasCuotas');
const correrQuery = require('@altertex/util/ser/correrQuery');

/**
 * Actualiza un set de cuotas en la base de datos.
 *
 * @async
 * @param {number} idCuotaSet - ID del set de cuotas a actualizar.
 * @param {object} cambios - Objeto con los cambios a aplicar.
 * @param {string} cambios.nombre - Nombre actualizado del set de cuotas.
 * @param {string} cambios.descripcion - Descripción del set de cuotas.
 * @param {number} cambios.periodoRenovacion - Periodo de renovación en meses.
 * @param {boolean} cambios.renovacionHabilitada - Si la renovación está habilitada.
 * @param {Array<object>} [cambios.productos=[]] - Lista de productos con límites.
 * @param {number} cambios.productos[].idProducto - ID del producto asociado.
 * @param {number} cambios.productos[].limite - Límite asignado al producto.
 * @param {number} cambios.productos[].limiteActual - Límite actual del producto.
 * @throws {Error} Si ocurre un error en la consulta a la base de datos.
 */
exports.actualizarSetCuotas = async (idCuotaSet, cambios) => {
  const { nombre, descripcion, periodoRenovacion, renovacionHabilitada, productos = [] } = cambios;

  await correrQuery(CONSULTAS_CUOTAS.ACTUALIZAR_CUOTA_SET, [
    nombre,
    descripcion,
    periodoRenovacion,
    renovacionHabilitada,
    new Date(),
    idCuotaSet
  ]);

  await correrQuery(CONSULTAS_CUOTAS.ELIMINAR_PRODUCTOS_CUOTA_SET, [idCuotaSet]);

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
