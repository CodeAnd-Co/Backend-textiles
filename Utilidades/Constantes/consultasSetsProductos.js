module.exports = {
  OBTENER_LISTA: `
      SELECT 
        sp.idSetProducto,
        sp.nombre,
        sp.descripcion,
        sp.activo,
        GROUP_CONCAT(DISTINCT p.nombreComun SEPARATOR ', ') AS productos,
        GROUP_CONCAT(DISTINCT ge.nombre SEPARATOR ', ') AS grupos
        FROM set_producto sp
        LEFT JOIN producto_set_producto psp ON psp.idSetProducto = sp.idSetProducto
        LEFT JOIN producto p ON p.idProducto = psp.idProducto
        LEFT JOIN set_producto_grupo_empleado spge ON spge.idSetProducto = sp.idSetProducto
        LEFT JOIN grupo_empleado ge ON ge.idGrupo = spge.idGrupo
        WHERE sp.idCliente = ?
        GROUP BY sp.idSetProducto, sp.nombre, sp.descripcion, sp.activo;
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
  ACTUALIZAR: `
    UPDATE set_producto SET idCliente = ?, nombre = ?, nombreVisible = ?, descripcion = ?, activo = ? WHERE idSetProducto = ?;
    `,
};
