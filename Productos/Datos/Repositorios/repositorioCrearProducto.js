//RF26 Crea Producto - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26
const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasProductos');

/**
 * Controlador para crear un nuevo producto en la base de datos.
 * Inserta un nuevo producto con la información proporcionada y asociada al cliente seleccionado.
 *
 * @async
 * @function crearProducto
 * @param {number} clienteSeleccionado - ID del cliente al que se asociará el producto.
 * @param {object} producto - Objeto que contiene la información del producto a crear.
 * @param {number} producto.idProveedor - ID del proveedor del producto.
 * @param {string} producto.nombreComun - Nombre común del producto.
 * @param {string} producto.nombreComercial - Nombre comercial del producto.
 * @param {string} producto.descripcion - Descripción del producto.
 * @param {string} producto.marca - Marca del producto.
 * @param {string} producto.modelo - Modelo del producto.
 * @param {string} producto.tipoProducto - Tipo de producto (e.g., "Seguridad", "Herramienta").
 * @param {number} producto.precioPuntos - Precio en puntos del producto.
 * @param {number} producto.precioCliente - Precio del producto para el cliente.
 * @param {number} producto.precioVenta - Precio de venta del producto.
 * @param {number} producto.costo - Costo de producción del producto.
 * @param {number} producto.impuesto - Impuesto asociado al producto.
 * @param {number} producto.descuento - Descuento aplicado al producto.
 * @param {number} producto.estado - Estado del producto (1: Activo, 0: Inactivo).
 * @param {number} producto.envio - Estado de envío (1: Envío disponible, 0: No disponible).
 *
 * @returns {Promise<any>} Promesa que se resuelve con los resultados de la consulta a la base de datos.
 *                         Si la consulta es exitosa, devuelve los resultados. Si ocurre un error, devuelve un arreglo vacío.
 *
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 *
 * @example
 * const clienteSeleccionado = 101;
 * const producto = {
 *   idProveedor: 1,
 *   nombreComun: 'Pantalon de Seguridad Mezclilla',
 *   nombreComercial: 'Toyota Safe Pants',
 *   descripcion: 'Pantalon de seguridad para la planta de ensamblado',
 *   marca: 'Toyota',
 *   modelo: 'TWP-2025',
 *   tipoProducto: 'Seguridad',
 *   precioPuntos: 8,
 *   precioCliente: 310.00,
 *   precioVenta: 350.00,
 *   costo: 295.00,
 *   impuesto: 16.00,
 *   descuento: 0.00,
 *   estado: 1,
 *   envio: 1
 * };
 *
 * crearProducto(clienteSeleccionado, producto)
 *   .then(resultados => console.log('Producto creado:', resultados))
 *   .catch(error => console.error('Error al crear producto:', error));
 */

exports.crearProducto = async (clienteSeleccionado, producto) => {
  const query = consultas.CREAR;
  const parametros = [
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
  ];

  try {
    const resultados = await correrQuery(query, parametros);

    const idProducto = resultados.insertId;
    return idProducto;
  } catch (error) {
    console.error('Error al crear producto:', error);
    return [];
  }
};
