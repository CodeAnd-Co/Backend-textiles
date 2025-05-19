const CONSULTA = require('@altertex/util/const/consultasCategorias');
const db = require('@altertex/util/bd/db');
const MENSAJES = require('@altertex/util/const/mensajesCategorias');

// RF[46] Crear categoría - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF46

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
 */
exports.crearCategoria = async (categoria) => {
  const conexion = await db.getConnection();

  try {
    await conexion.beginTransaction();

    if (!categoria) {
      throw new Error(MENSAJES.PARAMETROS_INVALIDOS.mensaje);
    }

    const { nombreCategoria, descripcion, productos } = categoria;

    if (!nombreCategoria || typeof nombreCategoria !== 'string') {
      throw new Error(MENSAJES.NOMBRE_CATEGORIA_INVALIDO.mensaje);
    }

    if (!Array.isArray(productos) || productos.length === 0) {
      throw new Error(MENSAJES.PARAMETROS_INVALIDOS.mensaje);
    }

    const [resultado] = await conexion.query(CONSULTA.CREAR_CATEGORIAS, [
      nombreCategoria,
      descripcion,
    ]);

    const categoriaId = resultado.insertId;

    for (const item of productos) {
      await conexion.query(CONSULTA.CREAR_CATEGORIA_PRODUCTOS, [categoriaId, item.idProducto]);
    }

    await conexion.commit();

    return categoriaId;
  } catch {
    await conexion.rollback();
    throw new Error(MENSAJES.ERROR_CREACION.mensaje);
  } finally {
    conexion.release();
  }
};
