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
  console.log('[DEBUG] Consultando set de cuotas con ID:', idSetCuota);
  
  const query = CONSULTAS_CUOTAS.LEER_CUOTA_SET;
  const queryCuotas = CONSULTAS_CUOTAS.LEER_CUOTA_SET_PRODUCTOS;

  const resultado = await correrQuery(query, [idSetCuota]);
  console.log('[DEBUG] Resultado cuota_set:', resultado);
  
  if (resultado.length === 0) return null;

  const productosCuota = await correrQuery(queryCuotas, [idSetCuota]);
  console.log('[DEBUG] Resultado productos cuota:', productosCuota);
  
  // 🔥 CORREGIDO: Devolver los productos con toda su información
  const productos = productosCuota.map((producto) => ({
    idProducto: producto.idProducto, // ✅ Incluir el ID del producto
    nombre: producto.nombreComun,
    nombreComun: producto.nombreComun,
    cuota_valor: producto.cuota_valor,
    limite_actual: producto.limite_actual,
    // Campos alternativos para compatibilidad
    valor: producto.cuota_valor,
    limite: producto.cuota_valor,
    limiteActual: producto.limite_actual
  }));

  // 🔥 MANTENER ESTO PARA RETROCOMPATIBILIDAD
  const cuotas = productosCuota.map((producto) => ({
    valor: producto.cuota_valor,
  }));

  // ✅ CORREGIDO: Incluir TODOS los campos de la cuota
  const setCuota = {
    // IDs en ambos formatos para compatibilidad
    idSetCuota: resultado[0].idCuotaSet,
    idCuotaSet: resultado[0].idCuotaSet,
    
    // Información básica
    nombre: resultado[0].nombre,
    descripcion: resultado[0].descripcion,
    
    // 🔥 CAMPOS QUE FALTABAN:
    periodoRenovacion: resultado[0].periodoRenovacion,
    renovacionHabilitada: resultado[0].renovacionHabilitada,
    ultimaActualizacion: resultado[0].ultimaActualizacion,
    
    // Productos y cuotas
    productos,
    cuotas,
  };

  console.log('[DEBUG] Set de cuotas completo a devolver:', JSON.stringify(setCuota, null, 2));
  
  return setCuota;
};