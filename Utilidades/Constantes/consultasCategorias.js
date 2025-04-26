const { ELB } = require("aws-sdk");

module.exports = {
  OBTENER_CATEGORIAS_CON_PRODUCTOS: `
    SELECT 
      c.idCategoria,
      c.nombreCategoria, 
      c.descripcion, 
      COUNT(p.idProducto) AS cantidadProductos,
      p.idCliente
    FROM 
      CATEGORIA c
    JOIN 
      CATEGORIA_PRODUCTO cp ON c.idCategoria = cp.idCategoria
    JOIN 
      PRODUCTO p ON cp.idProducto = p.idProducto
    WHERE 
      p.idCliente = ?
    GROUP BY 
      c.idCategoria, c.nombreCategoria, c.descripcion, p.idCliente;
  `,
  ELIMINAR_CATEGORIA_PRODUCTO: `
    DELETE FROM CATEGORIA_PRODUCTO
    WHERE idCategoria = ?;
  `,
  ELIMINAR_CATEGORIA: `
  DELETE FROM CATEGORIA
  WHERE idCategoria = ?;
`,
};
