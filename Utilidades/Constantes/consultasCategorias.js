module.exports = {
  OBTENER_CATEGORIAS_CON_PRODUCTOS: `
      SELECT c.idCategoria,
             c.nombreCategoria,
             c.descripcion,
             COUNT(p.idProducto) AS cantidadProductos,
             p.idCliente
      FROM categoria c
               JOIN
           categoria_producto cp ON c.idCategoria = cp.idCategoria
               JOIN
           producto p ON cp.idProducto = p.idProducto
      WHERE p.idCliente = ?
      GROUP BY c.idCategoria, c.nombreCategoria, c.descripcion, p.idCliente;
  `,

  CREAR_CATEGORIAS: `
      INSERT INTO categoria (nombreCategoria, descripcion)
      VALUES (?, ?);
  `,

  CREAR_CATEGORIA_PRODUCTOS: `
      INSERT INTO categoria_producto (idCategoria, idProducto)
      VALUES (?, ?);
  `,

  ELIMINAR_CATEGORIA_PRODUCTO: `
      DELETE
      FROM categoria_producto
      WHERE idCategoria = ?;
  `,

  ELIMINAR_CATEGORIA: `
      DELETE
      FROM categoria
      WHERE idCategoria = ?;
  `,

  CATEGORIA_EXISTENTE_POR_NOMBRE: `
      SELECT idCategoria
      FROM categoria
      WHERE nombreCategoria = ?;
  `,

  PRODUCTOS_EXISTENTES_POR_IDS: `
      SELECT idProducto
      FROM producto
      WHERE idProducto IN (?);
  `,

    LEER_DETALLE_CATEGORIA: `
    SELECT 
      c.idCategoria,
      c.nombreCategoria,
      c.descripcion,
      p.idProducto,
      p.nombreComun
    FROM categoria c
    LEFT JOIN categoria_producto cp ON c.idCategoria = cp.idCategoria
    LEFT JOIN producto p ON cp.idProducto = p.idProducto
    WHERE c.idCategoria = ?;
  `,
};
