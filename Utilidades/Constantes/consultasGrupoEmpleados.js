module.exports = {
  OBTENER_LISTA: `
      SELECT ge.idGrupo, ge.nombre AS geNombre, ge.descripcion,
      sp.idSetProducto, sp.nombre AS spNombre, 
      COUNT(e.idEmpleado) as totalEmpleados
      FROM empleado e
      JOIN empleado_grupo eg ON e.idEmpleado = eg.idEmpleado
      JOIN grupo_empleado ge ON eg.idGrupo = ge.idGrupo
      JOIN set_producto_grupo_empleado spge ON ge.idGrupo = spge.idGrupo
      JOIN set_producto sp ON spge.idSetProducto = sp.idSetProducto
      WHERE ge.idCliente = ?
      GROUP BY ge.idGrupo, sp.idSetProducto;
    `,
};
