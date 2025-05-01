module.exports = {
  OBTENER_LISTA: `
      SELECT idSetProducto, nombre, descripcion, activo 
      FROM set_producto
      WHERE idCliente = ?;
      `,
  ELIMINAR_SET_PRODUCTOS_GRUPO_EMPLEADOS: `
      DELETE FROM set_producto_grupo_empleado 
      WHERE idSetProducto = ?;
      `,
  ELIMINAR_PRODUCTOS_SET_PRODUCTOS: `
      DELETE FROM producto_set_producto 
      WHERE idSetProducto = ?;
      `,
  ELIMINAR_SET_PRODUCTOS: `
      DELETE FROM set_producto
      WHERE idSetProducto = ?;
      `,
};
