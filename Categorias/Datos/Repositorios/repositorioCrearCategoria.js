const CONSULTA = require('@altertex/util/const/consultasCategorias');
const db = require('@altertex/util/bd/db');
const MENSAJES = require('@altertex/util/const/mensajesCategorias');

/**
 * Crea una nueva categoría en la base de datos con sus productos asociados.
 *
 * @async
 * @function
 * @param {object} categoria - Objeto que representa la categoría a crear.
 * @param {string} categoria.nombreCategoria - Nombre de la categoría (obligatorio).
 * @param {string} [categoria.descripcion] - Descripción de la categoría (opcional).
 * @param {Array<{idProducto: number|string}>} categoria.productos - Lista de productos asociados a la categoría.
 *
 * @returns {Promise<number>} ID de la categoría recién creada.
 *
 * @throws {Error} Si los datos son inválidos o ocurre un error durante la transacción.
 *
 * @description
 * Valida los datos de la categoría, ejecuta una transacción para insertar la nueva categoría
 * y luego inserta las relaciones con productos en la tabla correspondiente.
 * Si ocurre algún error, lanza una excepción con un mensaje definido en `MENSAJES`.
 */
exports.crearCategoria = async (categoria) => {
  const conexion = db.promise();

  try {
    await conexion.beginTransaction();

    if (!categoria) {
      throw new Error(MENSAJES.PARAMETROS_INVALIDOS.mensaje);
    }

    const { nombreCategoria, descripcion, productos } = categoria;

    if (!nombreCategoria || typeof nombreCategoria !== 'string') {
      throw new Error(MENSAJES.NOMBRE_CATEGORIA_INVALIDO.mensaje);
    }

    if (!productos || typeof productos !== 'object') {
      throw new Error(MENSAJES.PARAMETROS_INVALIDOS.mensaje);
    }

    if (productos.length === 0) {
      throw new Error(MENSAJES.PARAMETROS_INVALIDOS.mensaje);
    }

    const [resultado] = await conexion.execute(CONSULTA.CREAR_CATEGORIAS, [
      nombreCategoria,
      descripcion,
    ]);

    const categoriaId = resultado.insertId;

    for (const item of productos) {
      await conexion.execute(CONSULTA.CREAR_CATEGORIA_PRODUCTOS, [categoriaId, item.idProducto]);
    }

    await conexion.commit();
    console.log('transaccion exitosa');

    return categoriaId;
  } catch {
    throw new Error(MENSAJES.ERROR_CREACION.mensaje);
  }
};
