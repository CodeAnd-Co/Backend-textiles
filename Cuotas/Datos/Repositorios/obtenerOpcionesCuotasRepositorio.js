const QUERY = require("@altertex/util/const/consultasCuotas");
const correrQuery = require("@altertex/util/ser/correrQuery");

exports.obtenerCuotaOpcion = async (idCliente) => {
  try {
    const resultado = await correrQuery(QUERY.OBTENER_OPCIONES, [idCliente]);
    return resultado;
  } catch (error) {
    console.log("Error obteniendo opciones", error);
    throw new Error("Error obteniendo opciones");
  }
};
