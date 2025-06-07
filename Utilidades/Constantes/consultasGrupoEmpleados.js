module.exports = {
  OBTENER_LISTA: `
      SELECT ge.idGrupo,
             ge.nombre            AS geNombre,
             ge.descripcion,
             COUNT(eg.idEmpleado) AS totalEmpleados
      FROM grupo_empleado ge
               LEFT JOIN empleado_grupo eg ON ge.idGrupo = eg.idGrupo
      WHERE ge.idCliente = ?
      GROUP BY ge.idGrupo;
  `,
  ELIMINAR_SET_PRODUCTO_GRUPO: `
      DELETE
      FROM set_producto_grupo_empleado
      WHERE idGrupo = ?;
  `,
  ELIMINAR_GRUPO: `
      DELETE
      FROM grupo_empleado
      WHERE idGrupo = ?;
  `,
  ELIMINAR_EMPLEADO_GRUPO: `
      DELETE
      FROM empleado_grupo
      WHERE idGrupo = ?;
  `,
  LEER_GRUPO: `
      SELECT ge.idGrupo,
             ge.nombre                                                                                  AS nombre,
             ge.descripcion                                                                             AS descripcion,

             IFNULL(GROUP_CONCAT(DISTINCT sp.nombre SEPARATOR ', '), 'Sin sets de productos asociados') AS setsProductos,
             IFNULL(GROUP_CONCAT(DISTINCT sp.idSetProducto SEPARATOR ','), '')                          AS idsSetProductos,

             IFNULL(GROUP_CONCAT(DISTINCT CONCAT(
            u.nombreCompleto, ' | ',
            u.correoElectronico, ' | ',
            e.areaTrabajo
        ) SEPARATOR ' || '), 'Sin empleados asociados')                AS infoEmpleados,

             IFNULL(GROUP_CONCAT(DISTINCT e.idEmpleado SEPARATOR ','), '')                              AS idsEmpleados,
             IFNULL(
                     JSON_ARRAYAGG(
                             JSON_OBJECT(
                                     'id', e.idEmpleado,
                                     'correo', u.correoElectronico,
                                     'nombre', u.nombreCompleto,
                                     'area', e.areaTrabajo
                             )
                     ),
                     JSON_ARRAY()
             )                                                                                          AS empleadosActualizar,
             IFNULL(
                     JSON_ARRAYAGG(
                             JSON_OBJECT(
                                     'id', sp.idSetProducto,
                                     'nombreProducto', sp.nombre,
                                     'activo', sp.activo
                             )
                     ),
                     JSON_ARRAY()
             )                                                                                          AS setProductosActualizar
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
  ACTUALIZAR_GRUPO_EMPLEADOS_NOMBRE_DESCRIPCION: `
      UPDATE grupo_empleado
      SET nombre      = ?,
          descripcion = ?
      WHERE idGrupo = ?
        AND (nombre != ? OR descripcion != ?);
  `,
  ELIMINAR_EMPLEADOS_DE_GRUPO_BASE: `
      DELETE
      FROM empleado_grupo
      WHERE idGrupo = __ID__
        AND idEmpleado NOT IN (__EMPLEADOS__);
  `,
  AGREGAR_EMPLEADOS_NUEVOS_BASE: `
      INSERT
      IGNORE INTO empleado_grupo (idEmpleado, idGrupo)
    VALUES __VALORES__;
  `,
  VERIFICAR_EMPLEADOS_CLIENTE: `
      SELECT COUNT(*) AS validos
      FROM empleado e
               JOIN grupo_empleado g ON g.idGrupo = ?
      WHERE e.idEmpleado IN (__EMPLEADOS__)
        AND e.idCliente = g.idCliente
  `,
  VERIFICAR_SETS_CLIENTE: `
      SELECT COUNT(*) AS validos
      FROM set_producto s
               JOIN grupo_empleado g ON g.idGrupo = ?
      WHERE s.idSetProducto IN (__SETS__)
        AND s.idCliente = g.idCliente
  `,

  ELIMINAR_SETS_DE_GRUPO_BASE: `
      DELETE
      FROM set_producto_grupo_empleado
      WHERE idGrupo = __ID__
        AND idSetProducto NOT IN (__SETS__);
  `,

  AGREGAR_SETS_NUEVOS_BASE: `
      INSERT
      IGNORE INTO set_producto_grupo_empleado (idSetProducto, idGrupo)
  VALUES __VALORES__;
  `,

  VALIDAR_NOMBRE_REPETIDO: `
      SELECT 1
      FROM grupo_empleado
      WHERE idCliente = ?
        AND nombre = ? LIMIT 1
  `,
  CREAR_GRUPO: `
      INSERT INTO grupo_empleado (idCliente, nombre, descripcion)
      VALUES (?, ?, ?);
  `,
  ASIGNAR_EMPLEADO_A_GRUPO: `
      INSERT INTO empleado_grupo (idEmpleado, idGrupo)
      VALUES (?, ?);
  `,

  ELIMINAR_TODOS_EMPLEADOS_DE_GRUPO: `
      DELETE
      FROM empleado_grupo
      WHERE idGrupo = ?;
  `,

  ELIMINAR_TODOS_SETS_DE_GRUPO: `
      DELETE
      FROM set_producto_grupo_empleado
      WHERE idGrupo = ?;
  `,
};