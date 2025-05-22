const CONSULTA = require('@altertex/util/const/consultasCategorias');
const db = require('@altertex/util/bd/db');
const MENSAJES = require('@altertex/util/const/mensajesCategorias');


/**
 * Crea una nueva categoría y la asocia con productos válidos en la base de datos.
 *
 * Este método valida que los parámetros sean correctos, verifica que el nombre
 * de la categoría no esté duplicado, comprueba que los productos existan en la base de datos,
 * y finalmente inserta la nueva categoría y sus asociaciones en la tabla correspondiente.
 *
 * @async
 * @function
 * @param {object} categoria - Objeto con los datos de la categoría a crear.
 * @param {string} categoria.nombreCategoria - Nombre de la categoría (obligatorio).
 * @param {string} [categoria.descripcion] - Descripción opcional de la categoría.
 * @param {Array<object>} categoria.productos - Lista de productos a asociar.
 * @param {number} categoria.productos[].idProducto - ID del producto a asociar (obligatorio).
 *
 * @returns {Promise<number>} El ID de la nueva categoría creada.
 *
 * @throws {Error} Si faltan parámetros, si el nombre es inválido o ya existe,
 * o si uno o más productos no existen en la base de datos.
 *
 * @example
 * const nuevaCategoriaId = await crearCategoria({
 *   nombreCategoria: 'Promociones',
 *   descripcion: 'Categoría para productos en descuento',
 *   productos: [{ idProducto: 1 }, { idProducto: 2 }]
 * });
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

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      throw new Error(MENSAJES.PARAMETROS_INVALIDOS.mensaje);
    }

    const [categoriasExistentes] = await conexion.execute(
      CONSULTA.CATEGORIA_EXISTENTE_POR_NOMBRE,
      [nombreCategoria],
    );

    if (categoriasExistentes.length > 0) {
      throw new Error(`Ya existe una categoría con ese nombre.`);
    }

    const idsProductos = productos.map(p => p.idProducto);
    const [productosValidos] = await conexion.query(
      CONSULTA.PRODUCTOS_EXISTENTES_POR_IDS,
      [idsProductos],
    );

    const idsValidos = productosValidos.map(p => p.idProducto);
    const idsInvalidos = idsProductos.filter(id => !idsValidos.includes(id));

    if (idsInvalidos.length > 0) {
      throw new Error(`Productos inválidos: ${idsInvalidos.join(', ')}`);
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

    return categoriaId;
  } catch (error) {
    if (conexion) await conexion.rollback();
    throw error;
  } finally {
    if (conexion) conexion.release();
  }
};
