module.exports = {
  OBTENER_LISTA: `
    SELECT p.idProducto, p.nombreComun, p.precioVenta, p.estado, i.urlImagen
    FROM Producto p
    JOIN imagen_producto ip ON p.idProducto = ip.idProducto
    JOIN imagen i ON ip.idImagen = i.idImagen
    WHERE i.tipoImagen = ?
    AND p.idCliente = ?
    `,
};
