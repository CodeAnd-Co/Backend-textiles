//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const db = require('@altertex/util/bd/db');
const consultas = require('@altertex/util/const/consultasVariantes');

/**
 * Crea una nueva variante para un producto en la base de datos.
 *
 * Esta función ejecuta una consulta SQL para insertar una variante asociada a un producto,
 * utilizando los parámetros proporcionados. Devuelve el ID de la variante recién creada
 * en caso de éxito, o un array vacío si ocurre algún error durante la operación.
 *
 * @param {number} idProducto - ID del producto al que se le va a agregar la variante.
 * @param {object} variante - Objeto que contiene la información de la variante.
 * @param {string} variante.nombreVariante - Nombre de la variante (por ejemplo, color, tamaño).
 * @param {string} variante.descripcion - Descripción de la variante.
 *
 * @returns {number|Array} El ID de la variante recién creada en caso de éxito, o un array vacío en caso de error.
 */
exports.crearVariante = async (idProducto, variante) => {
  const conexion = await db.getConnection();

  try {
    const [resultados] = await conexion.query(consultas.CREAR, [
      idProducto,
      variante.nombreVariante,
      variante.descripcion
    ]);

    const idVariante = resultados.insertId;
    return idVariante;
  } catch (error) {
    console.error('Error al crear variante:', error);
    return [];
  } finally {
    if (conexion) conexion.release();
  }
};