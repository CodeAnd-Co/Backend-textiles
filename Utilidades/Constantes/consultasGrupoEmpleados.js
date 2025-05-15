module.exports = {
  OBTENER_LISTA: `
      SELECT 
        ge.idGrupo, 
        ge.nombre AS geNombre, 
        ge.descripcion,
        COUNT(eg.idEmpleado) AS totalEmpleados
      FROM grupo_empleado ge
      LEFT JOIN empleado_grupo eg ON ge.idGrupo = eg.idGrupo
      WHERE ge.idCliente = ?
      GROUP BY ge.idGrupo;
    `,
  ELIMINAR_SET_PRODUCTO_GRUPO: `
    DELETE FROM set_producto_grupo_empleado WHERE idGrupo = ?;
  `,
  ELIMINAR_GRUPO: `
      DELETE FROM grupo_empleado WHERE idGrupo = ?;
    `,
  ELIMINAR_EMPLEADO_GRUPO: `
      DELETE FROM empleado_grupo WHERE idGrupo = ?;
    `,
  LEER_GRUPO: `
      SELECT
          ge.idGrupo,
          ge.nombre AS nombre,
          ge.descripcion AS descripcion,
          IFNULL(GROUP_CONCAT(DISTINCT sp.nombre SEPARATOR ', '), 'Sin sets de productos asociados') AS setsProductos,
          IFNULL(GROUP_CONCAT(DISTINCT CONCAT(
              u.nombreCompleto, ' | ',
              u.correoElectronico, ' | ',
              e.areaTrabajo
          ) SEPARATOR ' || '), 'Sin empleados asociados') AS infoEmpleados
      FROM grupo_empleado ge
      LEFT JOIN empleado_grupo eg ON ge.idGrupo = eg.idGrupo
      LEFT JOIN empleado e ON eg.idEmpleado = e.idEmpleado
      LEFT JOIN usuario u ON e.idUsuario = u.idUsuario
      LEFT JOIN set_producto_grupo_empleado spge ON ge.idGrupo = spge.idGrupo
      LEFT JOIN set_producto sp ON spge.idSetProducto = sp.idSetProducto
      WHERE ge.idGrupo = ?
      GROUP BY ge.idGrupo
      ORDER BY ge.idGrupo;
    `,
};
