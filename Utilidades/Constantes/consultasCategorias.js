module.exports = {
  OBTENER_CATEGORIAS_CON_PRODUCTOS: `
    SELECT 
      c.idCategoria,
      c.nombreCategoria, 
      c.descripcion, 
      COUNT(p.idProducto) AS cantidadProductos,
      p.idCliente
    FROM 
      categoria c
    JOIN 
      categoria_producto cp ON c.idCategoria = cp.idCategoria
    JOIN 
      producto p ON cp.idProducto = p.idProducto
    WHERE 
      p.idCliente = ?
    GROUP BY 
      c.idCategoria, c.nombreCategoria, c.descripcion, p.idCliente;
  `,
  CREAR_CATEGORIAS: `
    INSERT INTO categoria (nombreCategoria, descripcion)
    VALUES (?, ?);
  `,
  CREAR_CATEGORIA_PRODUCTOS: `
    INSERT INTO categoria_producto (idCategoria, idProducto) 
    VALUES (?, ?);
  `,
};
