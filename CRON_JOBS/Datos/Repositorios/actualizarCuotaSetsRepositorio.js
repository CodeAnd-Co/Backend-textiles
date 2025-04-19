const db = require("@altertex/util/bd/db");
const QUERY = require("@altertex/util/const/consultasCuotas");

exports.obtenerCuota = async () => {
  const conexion = db.promise();

  try {
    await conexion.beginTransaction();

    const [resultadoReseteo] = await conexion.execute(QUERY.RESETEAR_LIMITES);

    if (resultadoReseteo.changedRows === 0) {
      await conexion.rollback();
      return {
        mensaje: "Ninguna columna se actualizo.No se actualizara la fecha.",
      };
    }

    const [resultadoActualizacion] = await conexion.execute(
      QUERY.ACTUALIZAR_FECHAS
    );

    await conexion.commit();
    console.log("Transacción exitosa");

    return { mensaje: "Actualizacion exitosa" };
  } catch (error) {
    if (conexion) await conexion.rollback(); // Ensure rollback on error
    console.error("Transacción fallida: ", error);
    throw new Error("Error actualizando cuota sets");
  }
};
