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
  `
};