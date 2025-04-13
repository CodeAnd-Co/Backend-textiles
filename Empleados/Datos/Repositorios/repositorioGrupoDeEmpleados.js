const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_GRUPO_EMPLEADOS = require("@altertex/util/const/consultasGrupoEmpleados");

exports.obtenerGrupoDeEmpleados = async (idCliente, limit, offset) => {
  const query = CONSULTAS_GRUPO_EMPLEADOS.OBTENER_LISTA;

  try {
    const gruposDeEmpleados = await correrQuery(query, [
      idCliente,
      limit,
      offset,
    ]);

    if (!gruposDeEmpleados || gruposDeEmpleados.length === 0) {
      throw new Error("No hay grupos de empleados");
    }

    return gruposDeEmpleados;
  } catch (error) {
    console.error("Error al obtener el grupo de empleados:", error);
    return [];
  }
};
