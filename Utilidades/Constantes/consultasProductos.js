const { OBTENER_DATOS_EXPORTACION } = require('./consultasEmpleados');

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
      INSERT INTO producto (idCliente, idProveedor, nombreComun, nombreComercial, descripcion,
                            marca, modelo, tipoProducto, precioPuntos, precioCliente,
                            precioVenta, costo, impuesto, descuento, estado, envio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `,
  CREAR_IMAGEN_PRODUCTO: `
      INSERT INTO imagen_producto (idImagen, idProducto)
      VALUES (?, ?);
  `,
  CREAR_DATOS_ENVIO: `
      INSERT INTO datos_envio (idProducto, peso, longitud, ancho, altura, volumen, tipoPaquete)
      VALUES (?, ?, ?, ?, ?, ?, ?);
  `,

  ELIMINAR_PRODUCTOS: 'DELETE FROM producto WHERE idProducto IN (?)',

  LEER_PRODUCTO: `
      SELECT JSON_OBJECT(
                     'idProducto', p.idProducto,
                     'idProveedor', p.idProveedor,
                     'nombreComun', p.nombreComun,
                     'nombreComercial', p.nombreComercial,
                     'marca', p.marca,
                     'modelo', p.modelo,
                     'tipoProducto', p.tipoProducto,
                     'precioPuntos', p.precioPuntos,
                     'precioCliente', p.precioCliente,
                     'precioVenta', p.precioVenta,
                     'costo', p.costo,
                     'impuesto', p.impuesto,
                     'descuento', p.descuento,
                     'estado', p.estado,
                     'envio', p.envio,
                     'nombreProveedor', pr.nombreCompania,
                     'variantes', (SELECT JSON_ARRAYAGG(
                                                  JSON_OBJECT(
                                                          'idVariante', v.idVariante,
                                                          'nombreVariante', v.nombreVariante,
                                                          'descripcion', v.descripcion,
                                                          'opciones', (SELECT JSON_ARRAYAGG(
                                                                                      JSON_OBJECT(
                                                                                              'cantidad', o.cantidad,
                                                                                              'valorOpcion',
                                                                                              o.valorOpcion,
                                                                                              'SKUautomatico',
                                                                                              o.SKUautomatico,
                                                                                              'SKUcomercial',
                                                                                              o.SKUcomercial,
                                                                                              'costoAdicional',
                                                                                              o.costoAdicional,
                                                                                              'descuento', o.descuento,
                                                                                              'estado', o.estado
                                                                                      )
                                                                              )
                                                                       FROM opcion o
                                                                       WHERE o.idVariante = v.idVariante)
                                                  )
                                          )
                                   FROM variante v
                                   WHERE v.idProducto = p.idProducto)
             ) AS producto
      FROM producto p
               LEFT JOIN proveedor pr ON p.idProveedor = pr.idProveedor
      WHERE p.idProducto = ?
        AND p.idCliente = ?;
  `,
  OBTENER_DATOS_EXPORTACION: `
    SELECT 
        p.idProducto,
        p.idProveedor,
        p.nombreComun AS nombreProducto,
        p.nombreComercial,
        p.descripcion AS descripcionProducto,
        p.tipoProducto,
        p.marca,
        p.modelo,
        p.costo,
        p.precioVenta,
        p.precioCliente,
        p.precioPuntos,
        p.impuesto,
        p.descuento,
        p.estado,
        p.envio,
        GROUP_CONCAT(
            CONCAT(
                v.nombreVariante, '-',
                v.descripcion, ',',
                (SELECT GROUP_CONCAT(
                    CONCAT(o.valorOpcion, '-', o.SKUcomercial, '-', o.cantidad)
                    SEPARATOR ', '
                )
                FROM opcion o 
                WHERE o.idVariante = v.idVariante
                )
            )
            SEPARATOR ' | '
        ) AS variantes_opciones
    FROM producto p
    JOIN variante v ON v.idProducto = p.idProducto
    WHERE p.idCliente = ? AND p.idProducto IN (__IDS__)
    GROUP BY p.idProducto, p.idProveedor, p.nombreComun, p.nombreComercial, 
            p.descripcion, p.tipoProducto, p.marca, p.modelo, p.costo, 
            p.precioVenta, p.precioCliente, p.precioPuntos, p.impuesto, 
            p.descuento, p.estado, p.envio;
  `,
};
