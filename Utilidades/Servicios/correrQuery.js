const conexion = require("@altertex/util/bd/db");

module.exports = async (query, parametros = []) => {
  return new Promise((resolver, rechazar) => {
    if (!query || typeof query !== "string") {
      rechazar(new Error("El query no es válido."));
      return;
    }

    conexion.query(query, parametros, (error, resultados) => {
      if (error) {
        console.error("Error en la consulta:", error);
        rechazar(
          new Error(`Error en la consulta: ${error.message || "Desconocido"}`)
        );
      } else {
        if (!resultados || resultados.length === 0) {
          rechazar(new Error("No se encontraron resultados."));
        } else {
          resolver(resultados);
        }
      }
    });
  });
};
