module.exports = {
  OBTENER_LISTA: `
    SELECT p.idProducto, p.nombreComun, p.precioVenta, p.estado, i.urlImagen
    FROM producto p
    JOIN imagen_producto ip ON p.idProducto = ip.idProducto
    JOIN imagen i ON ip.idImagen = i.idImagen
    WHERE i.tipoImagen = "Imagen Producto"
    AND p.idCliente = ?;
    `,
  CREAR: `
    INSERT INTO producto (
      idCliente, idProveedor, nombreComun, nombreComercial, descripcion,
      marca, modelo, tipoProducto, precioPuntos, precioCliente,
      precioVenta, costo, impuesto, descuento, estado, envio
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
  CREAR_IMAGEN_PRODUCTO: `
    INSERT INTO imagen_producto (idImagen, idProducto)
    VALUES (?, ?);
    `,
  CREAR_DATOS_ENVIO: `
    INSERT INTO datos_envio (idProducto, peso, longitud, ancho, altura, volumen, tipoPaquete)
    VALUES (?, ?, ?, ?, ?, ?,?);
    `,
};
