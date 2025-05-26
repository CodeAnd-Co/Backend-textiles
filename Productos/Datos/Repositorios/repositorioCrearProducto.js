//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const db = require('@altertex/util/bd/db');
const consultas = require('@altertex/util/const/consultasProductos');

/**
 * Crea un nuevo producto en la base de datos.
 *
 * Esta función ejecuta una consulta SQL para insertar un producto en la base de datos,
 * utilizando los parámetros proporcionados. Devuelve el ID del producto recién creado
 * en caso de éxito, o un array vacío si ocurre algún error durante la operación.
 *
 * @param {number} clienteSeleccionado - ID del cliente para el cual se está creando el producto.
 * @param {object} producto - Objeto que contiene la información del producto.
 * @param {number} producto.idProveedor - ID del proveedor asociado al producto.
 * @param {string} producto.nombreComun - Nombre común del producto.
 * @param {string} producto.nombreComercial - Nombre comercial del producto.
 * @param {string} producto.descripcion - Descripción del producto.
 * @param {string} producto.marca - Marca del producto.
 * @param {string} producto.modelo - Modelo del producto.
 * @param {string} producto.tipoProducto - Tipo del producto.
 * @param {number} producto.precioPuntos - Precio en puntos del producto.
 * @param {number} producto.precioCliente - Precio para el cliente del producto.
 * @param {number} producto.precioVenta - Precio de venta del producto.
 * @param {number} producto.costo - Costo de producción del producto.
 * @param {number} producto.impuesto - Impuesto aplicado al producto.
 * @param {number} producto.descuento - Descuento aplicado al producto.
 * @param {string} producto.estado - Estado del producto (activo/inactivo).
 * @param {boolean} producto.envio - Indica si el producto es apto para envío.
 *
 * @returns {number|Array} El ID del producto recién creado en caso de éxito, o un array vacío en caso de error.
 */
exports.crearProducto = async (clienteSeleccionado, producto) => {
  const conexion = await db.getConnection();

  try {
    const [resultados] = await conexion.query(consultas.CREAR, [
      clienteSeleccionado,
      producto.idProveedor,
      producto.nombreComun,
      producto.nombreComercial,
      producto.descripcion,
      producto.marca,
      producto.modelo,
      producto.tipoProducto,
      producto.precioPuntos,
      producto.precioCliente,
      producto.precioVenta,
      producto.costo,
      producto.impuesto,
      producto.descuento,
      producto.estado,
      producto.envio,
    ]);

    const idProducto = resultados.insertId;
    return idProducto;
  } catch (error) {
    console.error('Error al crear producto:', error);
    return [];
  } finally {
    if (conexion) conexion.release();
  }
};