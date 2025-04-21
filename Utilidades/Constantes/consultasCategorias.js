module.exports = {
    OBTENER_CATEGORIAS_CON_PRODUCTOS: `
      SELECT 
        c.idCategoria,
        c.nombreCategoria, 
        c.descripcion, 
        COUNT(cp.idProducto) AS cantidadProductos
      FROM 
        CATEGORIA c
      LEFT JOIN 
        CATEGORIA_PRODUCTO cp ON c.idCategoria = cp.idCategoria
      GROUP BY 
        c.idCategoria, c.nombreCategoria, c.descripcion
      LIMIT ? OFFSET ?;
    `
};