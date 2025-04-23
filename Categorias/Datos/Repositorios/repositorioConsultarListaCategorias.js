const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_CATEGORIAS = require("@altertex/util/const/consultasCategorias");

exports.consultarListaCategorias = async () => {
  const query = CONSULTAS_CATEGORIAS.OBTENER_CATEGORIAS_CON_PRODUCTOS;

  try {
    const listaCategorias = await correrQuery(query); // sin parámetros
    return listaCategorias;
  } catch (error) {
    console.error("Error al obtener lista de categorías:", error);
    throw error;
  }
};