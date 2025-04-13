const correrQuery = require("@altertex/util/ser/correrQuery");
const { GRUPO_EMPLEADOS } = require("@altertex/util/const/consultasSQL");

exports.obtenerGrupoDeEmpleados = async (idCliente, limit, offset) => {
  const query = GRUPO_EMPLEADOS.OBTENER_LISTA;

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
