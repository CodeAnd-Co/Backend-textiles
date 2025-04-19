const db = require("@altertex/util/bd/db"); // Importa la conexión de la base de datos
const QUERY = require("@altertex/util/const/consultasCuotas");

/**
 *
 * RF31 - Crear Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31
 *
 * Crea un nuevo conjunto de cuotas (cuotaSet) en la base de datos.
 *
 * Esta función realiza una transacción que inserta un nuevo registro en la tabla de cuotas
 * y asocia los productos correspondientes con sus respectivos límites.
 * Si ocurre algún error, la transacción se revierte.
 *
 * @async
 * @function crearCuota
 * @param {Object} data - Objeto que contiene la información del cuotaSet.
 * @param {number} data.idCliente - ID del cliente propietario del cuotaSet.
 * @param {string} data.nombre - Nombre del cuotaSet.
 * @param {string} data.descripcion - Descripción del cuotaSet.
 * @param {string} data.periodoRenovacion - Período en el que se renuevan las cuotas (ej. 'mensual').
 * @param {boolean} data.renovacionHabilitada - Indica si la renovación automática está activada.
 * @param {Array<Object>} data.productosYLimite - Lista de productos con sus límites asignados.
 * @param {string} data.ultimaActualizacion - Fecha de la última actualización (formato YYYY-MM-DD).
 * @param {string|number} data.productosYLimite[].idProducto - ID del producto o identificador alternativo (string).
 * @param {number} data.productosYLimite[].limite - Límite máximo asignado al producto.
 * @param {number} data.productosYLimite[].limiteActual - Límite actual usado del producto.
 *
 * @returns {Promise<number>} ID del nuevo cuotaSet creado.
 *
 * @throws {Error} Si ocurre un fallo durante la transacción, lanza un error con mensaje "Error creando cuota set".
 *
 * @example
 * const id = await crearCuota({
 *   idCliente: 102,
 *   nombre: "Cuota abril",
 *   descripcion: "Límites de productos para abril",
 *   periodoRenovacion: "mensual",
 *   renovacionHabilitada: true,
 *   productosYLimite: [
 *     { idProducto: "PROD001", limite: 100, limiteActual: 0 },
 *     { idProducto: 42, limite: 50, limiteActual: 10 }
 *   ],
 *   ultimaActualizacion: "2025-04-19"
 * });
 */
exports.crearCuota = async (data) => {
  const conexion = db.promise();

  try {
    await conexion.beginTransaction();

    const {
      idCliente,
      nombre,
      descripcion,
      periodoRenovacion,
      renovacionHabilitada,
      productosYLimite,
      ultimaActualizacion,
    } = data;

    const [resultado] = await conexion.execute(QUERY.INSERTAR_CUOTA, [
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
        const [rows] = await conexion.execute(QUERY.SELECCIONAR_PRODUCTO, [
          idProducto,
        ]);

        if (rows.length === 0) {
          console.warn(`Producto no encontrado: ${idProducto}`);
          continue;
        }

        idProducto = rows[0].idProducto;
      }

      await conexion.execute(QUERY.INSERTAR_CUOTA_PRODUCTO, [
        cuotaSetId,
        idProducto,
        item.limite,
        item.limiteActual,
      ]);
    }

    await conexion.commit();
    console.log("Transaccion exitosa");

    return cuotaSetId;
  } catch (error) {
    if (conexion) await conexion.rollback();
    console.error("Transaccion fallida:", error);
    throw new Error("Error creando cuota set");
  }
};
