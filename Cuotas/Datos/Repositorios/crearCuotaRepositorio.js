const db = require('@altertex/util/bd/db');
const QUERY = require('@altertex/util/const/consultasCuotas');

/**
 * RF31 - Crear Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31
 *
 * Crea un nuevo conjunto de cuotas (cuotaSet) en la base de datos.
 *
 * @async
 * @function crearCuota
 * @param {object} data - Objeto que contiene la información del cuotaSet.
 * @param {number} data.idCliente - ID del cliente al que pertenece el cuotaSet.
 * @param {string} data.nombre - Nombre del conjunto de cuotas.
 * @param {string} data.descripcion - Descripción del conjunto de cuotas.
 * @param {string} data.periodoRenovacion - Periodo de renovación (e.g., "mensual").
 * @param {boolean} data.renovacionHabilitada - Si la renovación automática está habilitada.
 * @param {Array<object>} data.productosYLimite - Arreglo de productos con sus límites.
 * @param {string|number} data.productosYLimite[].idProducto - ID numérico o código del producto.
 * @param {number} data.productosYLimite[].limite - Límite máximo asignado.
 * @param {number} data.productosYLimite[].limiteActual - Límite actual utilizado.
 * @param {string} data.ultimaActualizacion - Fecha en formato YYYY-MM-DD.
 *
 * @returns {Promise<number>} ID del nuevo cuotaSet creado.
 *
 * @throws {Error} Si faltan parámetros requeridos o falla la transacción.
 */
exports.crearCuota = async (data) => {
  const conexion = await db.getConnection();

  if (
    !data
    || typeof data !== 'object'
    || typeof data.idCliente !== 'number'
    || typeof data.nombre !== 'string'
    || typeof data.descripcion !== 'string'
    || typeof data.periodoRenovacion !== 'number'
    || typeof data.renovacionHabilitada !== 'boolean'
    || !Array.isArray(data.productosYLimite)
    || typeof data.ultimaActualizacion !== 'string'
  ) {
    throw new Error('Datos inválidos o incompletos para crear la cuota.');
  }

  for (const item of data.productosYLimite) {
    if (
      !item
      || (typeof item.idProducto !== 'string' && typeof item.idProducto !== 'number')
      || typeof item.limite !== 'number'
      || typeof item.limiteActual !== 'number'
    ) {
      throw new Error(
        'Cada producto debe tener un idProducto (string o number), limite (number) y limiteActual (number).'
      );
    }
  }

  try {
    await conexion.beginTransaction();

    const {
      nombre,
      descripcion,
      periodoRenovacion,
      renovacionHabilitada,
      productosYLimite,
      ultimaActualizacion,
      idCliente,
    } = data;

    const [resultado] = await conexion.query(QUERY.INSERTAR_CUOTA, [
      idCliente,
      nombre,
      descripcion,
      periodoRenovacion,
      renovacionHabilitada,
      ultimaActualizacion,
    ]);

    const cuotaSetId = resultado.insertId;

    for (const item of productosYLimite) {
      let idProducto = item.idProducto;

      if (isNaN(idProducto)) {
        const [rows] = await conexion.query(QUERY.SELECCIONAR_PRODUCTO, [idProducto]);

        if (rows.length === 0) {
          continue;
        }

        idProducto = rows[0].idProducto;
      }

      await conexion.query(QUERY.INSERTAR_CUOTA_PRODUCTO, [
        cuotaSetId,
        idProducto,
        item.limite,
        item.limiteActual,
      ]);
    }

    await conexion.commit();

    return cuotaSetId;
  } catch  {
    if (conexion) await conexion.rollback();
    throw new Error('Error creando cuota set');
  } finally {
    conexion.release();
  }
};
