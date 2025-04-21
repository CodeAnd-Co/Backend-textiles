const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_ROLES = require("@altertex/util/const/consultasRoles");

exports.obtenerRoles = async (limit, offset) => {
  const query = CONSULTAS_ROLES.OBTENER_LISTA;

  try {
    const roles = await correrQuery(query, [limit, offset]);

    if (!roles || roles.length === 0) {
      throw new Error("No hay roles registrados");
    }

    return roles;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return [];
  }
};