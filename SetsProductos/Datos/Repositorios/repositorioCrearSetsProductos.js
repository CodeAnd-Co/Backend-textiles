const MENSAJES_SETS_PRODUCTOS = require('@altertex/util/const/mensajesSetsProductos');
const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS = require('@altertex/util/const/consultasSetsProductos');

/**
 * Crea un nuevo set de productos para un cliente específico, validando que:
 * - El nombre y nombre visible del set no estén duplicados.
 * - Todos los productos asociados existan.
 *
 * Si todo es válido, crea el set de productos y asigna los productos especificados al set.
 *
 * @async
 * @function crearSetsProductos
 * @param {number} idCliente - ID del cliente al que se le asignará el set de productos.
 * @param {object} datosSetsProducto - Datos del set de productos a crear.
 * @param {string} datosSetsProducto.nombre - Nombre interno del set.
 * @param {string} datosSetsProducto.nombreVisible - Nombre visible del set.
 * @param {string} [datosSetsProducto.descripcion] - Descripción del set (opcional).
 * @param {boolean} datosSetsProducto.activo - Indicador de si el set estará activo.
 * @param {number[]} datosSetsProducto.idProductos - IDs de los productos que se asociarán al set.
 *
 * @throws {Error} Si el nombre o nombre visible del set ya están en uso.
 * @throws {Error} Si uno o más productos no existen en la base de datos.
 * @throws {Error} Si ocurre un error inesperado durante la ejecución.
 *
 * @returns {Promise<void>} No retorna un valor directamente, pero lanza errores si algo falla.
 */
exports.crearSetsProductos = async (idCliente, datosSetsProducto) => {
  try {

    const duplicados = await correrQuery(CONSULTAS.CONSULTAR_DUPLICADOS, [
      idCliente,
      datosSetsProducto.nombre,
      datosSetsProducto.nombreVisible,
    ]);

    if (duplicados.length > 0) {
      throw new Error(MENSAJES_SETS_PRODUCTOS.ERROR_NOMBRE_DUPLICADO.mensaje);
    }

    const ids = datosSetsProducto.idProductos;
    const temporal = ids.map(() => '?').join(', ');
    const queryProductos = CONSULTAS.CONSULTAR_PRODUCTOS_EXISTENTES.replace('__IDS__', temporal);
    const productosExistentes = await correrQuery(queryProductos, ids);

    if (productosExistentes.length !== ids.length) {
      throw new Error(MENSAJES_SETS_PRODUCTOS.ERROR_PRODUCTOS_INVALIDOS.mensaje);
    }

    const resultado = await correrQuery(CONSULTAS.CREAR_SET_PRODUCTO, [idCliente, datosSetsProducto.nombre, datosSetsProducto.nombreVisible, datosSetsProducto.descripcion, datosSetsProducto.activo]);
    const idSetProducto = resultado.insertId;


    for (const producto of datosSetsProducto.idProductos) {
      await correrQuery(CONSULTAS.ASIGNAR_PRODUCTO_SET_PRODUCTO, [producto, idSetProducto]);
    }
  } catch (error) {
    throw new Error(error.message);
  }

};