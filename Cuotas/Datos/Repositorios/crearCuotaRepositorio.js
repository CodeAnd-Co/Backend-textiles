const db = require("@altertex/util/bd/db"); // Importa la conexión de la base de datos
const QUERY = require("@altertex/util/const/consultasCuotas");

/**
 * Crea una nueva cuota junto con sus productos asociados en la base de datos.
 * Utiliza una transacción para asegurar la integridad de los datos.
 *
 * @async
 * @function
 * @param {Object} data - Objeto con los datos necesarios para crear la cuota.
 * @param {string} data.nombre - Nombre de la cuota.
 * @param {string} data.descripcion - Descripción de la cuota.
 * @param {string} data.periodoRenovacion - Periodo de renovación (por ejemplo, mensual, anual).
 * @param {boolean} data.renovacionHabilitada - Indica si la renovación está habilitada.
 * @param {Array<Object>} data.productosYLimite - Lista de productos con sus límites asociados.
 * @param {number|string} data.productosYLimite[].idProducto - ID o código del producto.
 * @param {number} data.productosYLimite[].limite - Límite total del producto.
 * @param {number} data.productosYLimite[].limiteActual - Límite actual disponible del producto.
 *
 * @returns {Promise<number>} El ID del conjunto de cuotas creado.
 * @throws {Error} Si ocurre un error durante la transacción.
 */
exports.crearCuota = async (data) => {
  const conexion = db.promise();

  try {
    await conexion.beginTransaction();

    const {
      nombre,
      descripcion,
      periodoRenovacion,
      renovacionHabilitada,
      productosYLimite,
      fechaCreacion,
    } = data;

    const idCliente = 102; // TODO: Reemplazar con el ID real del cliente cuando esté disponible

    const [resultado] = await conexion.execute(QUERY.INSERTAR_CUOTA, [
      idCliente,
      nombre,
      descripcion,
      periodoRenovacion,
      renovacionHabilitada,
      fechaCreacion,
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
