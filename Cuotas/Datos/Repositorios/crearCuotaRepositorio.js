const db = require("@altertex/util/bd/db"); // Importa la conexión de la base de datos
const QUERY = require("@altertex/util/const/consultasCuotas");

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

    // const idCliente = 102; // TODO: Reemplazar con el ID real del cliente cuando esté disponible

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
