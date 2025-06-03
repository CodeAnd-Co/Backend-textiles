module.exports = {
  OBTENER_LISTA: `
      SELECT sp.idSetProducto,
             sp.nombre,
             sp.descripcion,
             sp.activo,
             GROUP_CONCAT(DISTINCT p.nombreComun SEPARATOR ', ') AS productos,
             GROUP_CONCAT(DISTINCT ge.nombre SEPARATOR ', ')     AS grupos
      FROM set_producto sp
               LEFT JOIN producto_set_producto psp ON psp.idSetProducto = sp.idSetProducto
               LEFT JOIN producto p ON p.idProducto = psp.idProducto
               LEFT JOIN set_producto_grupo_empleado spge ON spge.idSetProducto = sp.idSetProducto
               LEFT JOIN grupo_empleado ge ON ge.idGrupo = spge.idGrupo
      WHERE sp.idCliente = ?
      GROUP BY sp.idSetProducto, sp.nombre, sp.descripcion, sp.activo;
  `,
  ELIMINAR_SET_PRODUCTOS_GRUPO_EMPLEADOS: `
      DELETE
      FROM set_producto_grupo_empleado
      WHERE idSetProducto = ?;
  `,
  ELIMINAR_PRODUCTOS_SET_PRODUCTOS: `
      DELETE
      FROM producto_set_producto
      WHERE idSetProducto = ?;
  `,
  ELIMINAR_SET_PRODUCTOS: `
      DELETE
      FROM set_producto
      WHERE idSetProducto = ?;
  `,
  CREAR_SET_PRODUCTO: `
      INSERT INTO set_producto (idCliente, nombre, nombreVisible, descripcion, activo)
      VALUES (?, ?, ?, ?, ?);
  `,
  ASIGNAR_PRODUCTO_SET_PRODUCTO: `
      INSERT INTO producto_set_producto (idProducto, idSetProducto)
      VALUES (?, ?);
  `,
  CONSULTAR_DUPLICADOS: `
      SELECT idSetProducto
      FROM set_producto
      WHERE idCliente = ?
        AND (nombre = ? OR nombreVisible = ?);
  `,
  CONSULTAR_PRODUCTOS_EXISTENTES: `
      SELECT idProducto
      FROM producto
      WHERE idProducto IN (__IDS__);
  `,
  ACTUALIZAR: `
    UPDATE set_producto SET idCliente = ?, nombre = ?, nombreVisible = ?, descripcion = ?, activo = ? WHERE idSetProducto = ?;
    `,
};
