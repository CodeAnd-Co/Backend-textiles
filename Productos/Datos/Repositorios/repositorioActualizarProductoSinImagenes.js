const correrQuery = require('@altertex/util/ser/correrQuery');
const consultas = require('@altertex/util/const/consultasProductos');

/**
 * Actualiza un producto existente en la base de datos sin afectar las imágenes.
 *
 * Esta función es una versión modificada de actualizarProducto que no elimina las imágenes existentes,
 * permitiendo actualizar solo la información del producto y las variantes/opciones.
 *
 * @param {number} idProducto - ID del producto a actualizar.
 * @param {object} producto - Objeto con la nueva información del producto.
 * @returns {Promise<boolean>} Verdadero si se actualizó correctamente.
 */
exports.actualizarProductoSinImagenes = async (idProducto, producto) => {
  const params = [
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
    idProducto,
  ];

  const resultado = await correrQuery(consultas.ACTUALIZAR, params);
  // Eliminar opciones y variantes pero no las imágenes
  await correrQuery(consultas.ELIMINAR_OPCIONES, [idProducto]);
  await correrQuery(consultas.ELIMINAR_VARIANTES, [idProducto]);
  return resultado.affectedRows > 0;
};
