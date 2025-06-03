const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS_CUOTAS = require('@altertex/util/const/consultasCuotas');

/**
 * Obtiene un conjunto de cuotas desde la base de datos mediante su ID.
 *
 * Ejecuta una consulta SQL y retorna el primer conjunto de cuotas encontrado o `null` si no existe.
 *
 * @param {number} idSetCuota - ID del set de cuotas a buscar.
 * @returns {Promise<object|null>} El conjunto de cuotas encontrado o `null` si no existe.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
exports.obtenerSetCuotaPorId = async (idSetCuota) => {
  const query = CONSULTAS_CUOTAS.LEER_CUOTA_SET;
  const query_cuotas = CONSULTAS_CUOTAS.LEER_CUOTA_SET_PRODUCTOS;

  const resultado = await correrQuery(query, [idSetCuota]);
  if (resultado.length === 0) return null;

  const productos_cuota = await correrQuery(query_cuotas, [idSetCuota]);
  const productos = productos_cuota.map((producto) => ({
    nombre: producto.nombreComun,
  }));
  const cuotas = productos_cuota.map((producto) => ({
    valor: producto.cuota_valor,
  }));

  const setCuota = {
    idSetCuota: resultado[0].idCuotaSet,
    nombre: resultado[0].nombre,
    descripcion: resultado[0].descripcion,
    productos: productos,
    cuotas: cuotas,
  };

  return setCuota;
};
