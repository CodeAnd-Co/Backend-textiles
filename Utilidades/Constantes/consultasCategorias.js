module.exports = {
  CREAR_CATEGORIAS: `
    INSERT INTO categoria (nombreCategoria, descripcion)
    VALUES (?, ?);
    `,
  CREAR_CATEGORIA_PRODUCTOS: `
    INSERT INTO categoria_producto (idCategoria, idProducto) 
    VALUES (?, ?);`,
};
