//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasVariantes');

exports.crearVariante = async (idProducto, variante) => {
  const query = consultas.CREAR;
  const parametros = [idProducto, variante.nombreVariante, variante.descripcion];

  try {
    const resultados = await correrQuery(query, parametros);

    const idVariante = resultados.insertId;
    return idVariante;
  } catch (error) {
    console.error('Error al crear variante:', error);
    return [];
  }
};
