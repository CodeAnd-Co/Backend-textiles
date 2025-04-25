//RF[47] Consulta lista de categorías - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF47]

const correrQuery = require("@altertex/util/ser/correrQuery");
const CONSULTAS_CATEGORIAS = require("@altertex/util/const/consultasCategorias");

exports.consultarListaCategorias = async (idCliente) => {
  const query = CONSULTAS_CATEGORIAS.OBTENER_CATEGORIAS_CON_PRODUCTOS;

  try {
    const listaCategorias = await correrQuery(query, [idCliente]);
    return listaCategorias;
  } catch (error) {
    console.error("Error al obtener lista de categorías:", error);
    throw error;
  }
};