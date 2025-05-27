const correrQuery = require('@altertex/util/ser/correrQuery');
const CONSULTAS = require('@altertex/util/const/consultasCategorias');

/**
 * Consulta el detalle de una categoría y sus productos asociados.
 *
 * @param {number} idCategoria - ID de la categoría a consultar.
 * @returns {Promise<object|null>} Objeto con la información de la categoría y sus productos, o null si no existe.
 *
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 *
 * @see [RF48 - Documentación de requisitos](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF48)
 */
exports.leerDetalleCategoria = async (idCategoria) => {
  const query = CONSULTAS.LEER_DETALLE_CATEGORIA;
  const resultados = await correrQuery(query, [idCategoria]);

  if (!resultados || resultados.length === 0) return null;

  const { nombreCategoria, descripcion } = resultados[0];

  const productos = resultados
    .filter(resul => resul.idProducto !== null)
    .map(produc => ({
      idProducto: produc.idProducto,
      nombreComun: produc.nombreComun,
    }));

  return {
    idCategoria,
    nombreCategoria,
    descripcion,
    productos,
  };
};