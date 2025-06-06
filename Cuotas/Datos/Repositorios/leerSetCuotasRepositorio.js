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
  const queryCuotas = CONSULTAS_CUOTAS.LEER_CUOTA_SET_PRODUCTOS;

  const resultado = await correrQuery(query, [idSetCuota]);
  
  if (resultado.length === 0) return null;

  const productosCuota = await correrQuery(queryCuotas, [idSetCuota]);
  
  const productos = productosCuota.map((producto) => ({
    idProducto: producto.idProducto, 
    nombre: producto.nombreComun,
    nombreComun: producto.nombreComun,
    cuota_valor: producto.cuota_valor,
    limite_actual: producto.limite_actual,
    valor: producto.cuota_valor,
    limite: producto.cuota_valor,
    limiteActual: producto.limite_actual
  }));

  const cuotas = productosCuota.map((producto) => ({
    valor: producto.cuota_valor,
  }));

  const setCuota = {
    idSetCuota: resultado[0].idCuotaSet,
    idCuotaSet: resultado[0].idCuotaSet,
    
    nombre: resultado[0].nombre,
    descripcion: resultado[0].descripcion,
    
    periodoRenovacion: resultado[0].periodoRenovacion,
    renovacionHabilitada: resultado[0].renovacionHabilitada,
    ultimaActualizacion: resultado[0].ultimaActualizacion,
    productos,
    cuotas,
  };

  
  return setCuota;
};